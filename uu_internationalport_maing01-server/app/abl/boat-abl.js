"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/boat-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
};
const defaultValues = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};
class BoatAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("boat");
    this.daoPier = DaoFactory.getDao("pier");
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
    // hds 2 2.1,
    let validationResult = this.validator.validate("boatListDtoInType", dtoIn);
    //HDS  2.2, 2.3

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //HDS 2.4.
    // HDS 2.4
    let { order, pageInfo } = dtoIn;

    if (!order) order = defaultValues.order;
    if (!pageInfo) pageInfo = {};
    if (!pageInfo.pageSize) pageInfo.pageSize = defaultValues.pageSize;
    if (!pageInfo.pageIndex) pageInfo.pageIndex = defaultValues.pageIndex;

    let dtoOut;

    /* eslint-disable */
    //HDS 3
    //HDS 3.A
    if (!dtoIn.pierId && !dtoIn.boatName) {
      try {
        dtoOut = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
      } catch (e) {
        throw new Error(e);
      }
    }
    //HDS 3.B
    if (dtoIn.pierId && !dtoIn.boatName) {
      try {
        dtoOut = await this.dao.listByPierId(
          {
            awid,
            pierId: dtoIn.pierId,
          },
          dtoIn.pageInfo,
          dtoIn.sortBy,
          dtoIn.order
        );
      } catch (e) {
        throw new Error(e);
      }
    }
    // HDS 3.C
    if (dtoIn.hasOwnProperty("boatName") && !dtoIn.hasOwnProperty("pierId")) {
      try {
        dtoOut = await this.dao.listByBoatName(
          {
            awid,
            boatName: dtoIn.boatName,
          },
          dtoIn.pageInfo,
          dtoIn.sortBy,
          dtoIn.order
        );
      } catch (e) {
        throw new Error(e);
      }
    } else if (dtoIn.pierId && dtoIn.boatName) {
      //HDS 3.D
      try {
        dtoOut = await this.dao.listByPierIdAndBoatNameList(
          {
            awid,
            pierId: dtoIn.pierId,
            boatName: dtoIn.boatName,
          },
          dtoIn.pageInfo,
          dtoIn.sortBy,
          dtoIn.order
        );
      } catch (e) {
        throw new Error(e);
      }
    }

    //HDS 4
    return { ...dtoOut, uuAppErrorMap };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    //hds 1.1.1.
    if (!uuInternationalPortInctance) {
      throw new Errors.Update.InternationalPortInstanceDoesNotExist(uuAppErrorMap, { dtoIn });
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.Update.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap, { dtoIn });
    }
    // hds 2 2.1,
    let validationResult = this.validator.validate("boatUpdateDtoInType", dtoIn);
    //HDS  2.2, 2.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );
    let boat = await this.dao.get(awid, dtoIn.id);
    if (!boat) throw new Errors.Update.BoatDoesNotExist(uuAppErrorMap, { dtoIn });

    let uuObject = { ...boat, ...dtoIn };

    let dtoOut;
    try {
      // HDS 4

      dtoOut = await this.dao.update(uuObject);
    } catch (e) {
      throw new Errors.Update.BoatDaoUpdatefailed(uuAppErrorMap, { dtoIn, cause: e });
    }
    // HDS 5
    return { ...dtoOut, uuAppErrorMap };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    // hds 1 1.1
    const uuInternationalPortInctance = await this.uuInternationalPortDao.getByAwid(awid);

    //hds 1.1.1.
    if (!uuInternationalPortInctance) {
      throw new Errors.Create.InternationalPortInstanceDoesNotExist(uuAppErrorMap, { dtoIn });
    } else if (uuInternationalPortInctance.state !== "active") {
      //hds 1.1.2.
      throw new Errors.Create.InternationalPortInstanceIsNotInCorrectState(uuAppErrorMap, { dtoIn });
    }

    // hds 2 2.1,
    let validationResult = this.validator.validate("boatCreateDtoInType", dtoIn);
    //HDS  2.2, 2.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 3
    let pier = await this.daoPier.get(awid, dtoIn.pierId);

    //HDS 3.1
    if (!pier) {
      throw new Errors.Create.PierDoesNotExist(uuAppErrorMap, { dtoIn });
    }

    //HDS4
    let findBoat = {};
    findBoat.pierId = dtoIn.pierId;
    findBoat.awid = awid;
    let boatsInPort = await this.dao.getCapacityByPierID(findBoat);
    if (boatsInPort && boatsInPort.pageInfo && boatsInPort.pageInfo.total > pier.maxCapacity) {
      throw new Errors.Create.PierIsAtMaxCapacity({ uuAppErrorMap });
    }

    //HDS 5
    let dtoOut;
    try {
      dtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      //HDS 5.1
      throw new Errors.Create.BoatDaoCreateFailed(uuAppErrorMap, { dtoIn, cause: e });
    }
    //HDS 6
    return { ...dtoOut, uuAppErrorMap };
  }
}

module.exports = new BoatAbl();
