"use strict";

const InternationalportMainUseCaseError = require("./internationalport-main-use-case-error.js");
const DOCKING_ERROR_PREFIX = `${InternationalportMainUseCaseError.ERROR_PREFIX}docking/`;

const Create = {
  UC_CODE: `${DOCKING_ERROR_PREFIX}create/`,
  InternationalPortInstanceDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}internationalPortInstanceDoesNotExist`;
      this.message = "internationalPortInstance does not exist.";
    }
  },
  InternationalPortInstanceIsNotInCorrectState: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}internationalPortInstanceIsNotInCorrectState`;
      this.message = "internationalPortInstance is not in correct state.";
    }
  },
  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PierDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}pierDoesNotExist`;
      this.message = "Selected pier uuObject does not exist";
    }
  },
  BoatDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}boatDoesNotExist`;
      this.message = "Selected boat uuObject does not exist";
    }
  },
  DockingDaoCreateFailed: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dockingDaoCreateFailed`;
      this.message = "Creating of docking uuObject using docking DAO create failed.";
    }
  },
};

module.exports = {
  Create,
};
