"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/pier-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
};

class PierAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("pier");
    this.boatDao = DaoFactory.getDao("boat");
    this.dockingDao = DaoFactory.getDao("docking");
    this.uuInternationalPortDao = DaoFactory.getDao("internationalportMain");
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    //hds 1.1.1.
    if (!uuInternationalPortInctance) {
      throw new Errors.List.InternationalPortInstanceDoesNotExist(uuAppErrorMap, { dtoIn });
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.List.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap, { dtoIn });
    }
    // HDS 2, 2.1
    let validationResult = this.validator.validate("pierListDtoInType", dtoIn);
    // HDS 2.2, 2.3,
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    dtoIn = {
      pageInfo: {
        pageSize: 100,
        pageIndex: 0,
      },
      order: "asc",
      ...dtoIn,
    };
    //HDS 3
    let dtoOut;
    let sort = {};
    sort[dtoIn.sortBy] = dtoIn.order === "asc" ? 1 : -1;
    //HDS 3
    if (dtoIn.maxCapacity) {
      //HDS 3 3B
      dtoOut = await this.dao.ListByMaxCapacity(awid, dtoIn.maxCapacity, dtoIn.pageInfo, sort);
    } else {
      //HDS 3 3A
      dtoOut = await this.dao.listNoCapacity(awid, dtoIn.pageInfo, sort);
    }
    return { ...dtoOut, uuAppErrorMap };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    //hds 1.1.1.
    if (!uuInternationalPortInctance) {
      throw new Errors.Delete.InternationalPortInstanceDoesNotExist(uuAppErrorMap);
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.Delete.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap);
    }
    // HDS 2, 2.1
    let validationResult = this.validator.validate("pierDeleteDtoInType", dtoIn);
    // HDS 2.2, 2.3,
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // HDS 3
    let uuObject = await this.dao.get(awid, dtoIn.id);
    if (!uuObject) {
      //HDS 3.1.
      throw new Errors.Delete.PierDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    //HD4
    const boatList = await this.boatDao.listByPierId({ awid, pierId: dtoIn.id });

    if (boatList.itemList.length > 0) {
      throw new Errors.Delete.RelatedBoatsExist({ uuAppErrorMap });
    }

    //HDS 5
    const dockingList = await this.dockingDao.listByPier({ awid, pierId: dtoIn.id });
    //HDS 5.1 A
    if (dtoIn.forceDelete || dockingList.length < 1) {
      if (dockingList.length > 0) {
        try {
          await this.dockingDao.deleteMany(awid, dtoIn.id);
        } catch (e) {
          //5.1.A.1.1
          throw new Errors.Delete.DockingDaoDeleteFailed({ uuAppErrorMap }, e);
        }
      }

      try {
        // HDS 6
        await this.dao.delete(awid, dtoIn.id);
      } catch (e) {
        // HDS 6.1
        throw new Errors.Delete.PierDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      // HDS 7
      return { uuAppErrorMap };
    } else if (!dtoIn.forceDelete) {
      throw new Errors.Delete.RelatedDockingExist({ uuAppErrorMap });
    }
    return { uuAppErrorMap };
  }

  async get(awid, dtoIn, uuAppErrorMap) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    //hds 1.1.1.
    if (!uuInternationalPortInctance) {
      throw new Errors.Get.InternationalPortInstanceDoesNotExist(uuAppErrorMap, { dtoIn });
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.Get.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap, { dtoIn });
    }
    //HDS 1, 1.1
    let validationResult = this.validator.validate("pierGetDtoInType", dtoIn);
    //HDS  1.2, 1.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    //HDS 3
    let uuObject;
    //HDS 3.1

    uuObject = await this.dao.get(awid, dtoIn.id);
    if (!uuObject) {
      throw new Errors.Get.PierDoesNotExist(uuAppErrorMap, { id: dtoIn.id });
    }

    // HDS 4
    return { ...uuObject, uuAppErrorMap };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    if (!uuInternationalPortInctance) {
      throw new Errors.Create.InternationalPortInstanceDoesNotExist(uuAppErrorMap, { dtoIn });
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.Create.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap, { dtoIn });
    }
    // hds 2 2.1,
    let validationResult = this.validator.validate("pierCreateDtoInType", dtoIn);
    //HDS  2.2, 2.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    //HDS 2
    const uuObject = {
      ...dtoIn,
      awid,
    };

    let dtoOut;
    //HDS 3
    try {
      dtoOut = await this.dao.create(uuObject);
    } catch (e) {
      //HDS 3.1
      throw new Errors.Create.PierDaoCreateFaild(uuAppErrorMap, { dtoIn, cause: e });
    }
    //HDS 4
    return { ...dtoOut, uuAppErrorMap };
  }
}

module.exports = new PierAbl();
