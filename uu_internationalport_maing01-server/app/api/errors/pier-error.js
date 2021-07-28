"use strict";

const InternationalportMainUseCaseError = require("./internationalport-main-use-case-error.js");
const PIER_ERROR_PREFIX = `${InternationalportMainUseCaseError.ERROR_PREFIX}pier/`;

const Create = {
  UC_CODE: `${PIER_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PierDaoCreateFaild: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}pierDaoCreateFaild`;
      this.message = "Creating of pier uuObject using pier DAO create failed.";
    }
  },

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
};

const Get = {
  UC_CODE: `${PIER_ERROR_PREFIX}get/`,
  InternationalPortInstanceDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}internationalPortInstanceDoesNotExist`;
      this.message = "internationalPortInstance does not exist.";
    }
  },
  InternationalPortInstanceIsNotInCorrectState: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}internationalPortInstanceIsNotInCorrectState`;
      this.message = "internationalPortInstance is not in correct state.";
    }
  },
  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PierDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}pierDoesNotExist`;
      this.message = "Selected pier uuObject does not exist.";
    }
  },
};

const Delete = {
  UC_CODE: `${PIER_ERROR_PREFIX}delete/`,
  InternationalPortInstanceDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}internationalPortInstanceDoesNotExist`;
      this.message = "internationalPortInstance does not exist.";
    }
  },
  InternationalPortInstanceIsNotInCorrectState: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}internationalPortInstanceIsNotInCorrectState`;
      this.message = "internationalPortInstance is not in correct state.";
    }
  },
  InvalidDtoIn: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PierDoesNotExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}pierDoesNotExist`;
      this.message = "Selected pier uuObject does not exist";
    }
  },
  RelatedBoatsExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedBoatsExist`;
      this.message = "Selected pier has related boats.";
    }
  },
  DockingDaoDeleteFailed: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}dockingDaoDeleteFailed`;
      this.message = "Docking delete failed.";
    }
  },
  RelatedDockingExist: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}relatedDockingExist`;
      this.message = "There are docking connected to this pier.";
    }
  },
  PierDaoDeleteFailed: class extends InternationalportMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}pierDaoDeleteFailed`;
      this.message = "Deleting of pier uuObject using pier DAO delete failed.";
    }
  },
};

const List = {
  UC_CODE: `${PIER_ERROR_PREFIX}list/`,
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
  Delete,
  Get,
  Create,
};
