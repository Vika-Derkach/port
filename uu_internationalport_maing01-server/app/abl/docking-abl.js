"use strict";

const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/docking-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    message: "DtoIn contains unsupported keys.",
  },
};

class DockingAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("docking");
    this.daoPier = DaoFactory.getDao("pier");
    this.daoBoat = DaoFactory.getDao("boat");
    this.uuInternationalPortDao = DaoFactory.getDao("internationalportMain");
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
    let validationResult = this.validator.validate("dockingCreateDtoInType", dtoIn);
    //HDS  2.2, 2.3
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    //HDS 3
    let docking = await this.daoPier.get(awid, dtoIn.pierId);

    //HDS 3.1
    if (dtoIn.pierId.toString() !== docking.id.toString()) {
      throw new Errors.Create.PierDoesNotExist(uuAppErrorMap, { dtoIn });
    }
    //HDS 4
    let boat = await this.daoBoat.get(awid, dtoIn.boatId);

    //HDS 4.1
    if (dtoIn.boatId.toString() !== boat.id.toString()) {
      throw new Errors.Create.BoatDoesNotExist(uuAppErrorMap, { dtoIn });
    }
    //HDS 5
    let dtoOut;
    try {
      dtoOut = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      //HDS 5.1
      throw new Errors.Create.DockingDaoCreateFailed(uuAppErrorMap, { dtoIn, cause: e });
    }
    //HDS 6
    return { ...dtoOut, uuAppErrorMap };
  }
}

module.exports = new DockingAbl();
