"use strict";

const InternationalportMainUseCaseError = require("./internationalport-main-use-case-error.js");
const BOAT_ERROR_PREFIX = `${InternationalportMainUseCaseError.ERROR_PREFIX}boat/`;

const Create = {
  UC_CODE: `${BOAT_ERROR_PREFIX}create/`,
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
  PierIsAtMaxCapacity: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}pierIsAtMaxCapacity`;
      this.message = "Pier reached max capacity";
    }
  },
  BoatDaoCreateFailed: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}boatDaoCreateFaild`;
      this.message = "Creating of boat uuObject using boat DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${BOAT_ERROR_PREFIX}update/`,
  InternationalPortInstanceDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}internationalPortInstanceDoesNotExist`;
      this.message = "internationalPortInstance does not exist.";
    }
  },
  InternationalPortInstanceIsNotInCorrectState: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}internationalPortInstanceIsNotInCorrectState`;
      this.message = "internationalPortInstance is not in correct state.";
    }
  },
  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BoatDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}boatDoesNotExist`;
      this.message = "Boat does not exist";
    }
  },
  BoatDaoUpdatefailed: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}boatDaoUpdatefailed`;
      this.message = "Update of boat uuObject using boat DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${BOAT_ERROR_PREFIX}list/`,
  InternationalPortInstanceDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}internationalPortInstanceDoesNotExist`;
      this.message = "internationalPortInstance does not exist.";
    }
  },
  InternationalPortInstanceIsNotInCorrectState: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}internationalPortInstanceIsNotInCorrectState`;
      this.message = "internationalPortInstance is not in correct state.";
    }
  },
  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Update,
  Create,
};
