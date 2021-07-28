"use strict";
const BoatAbl = require("../../abl/boat-abl.js");

class BoatController {

  list(ucEnv) {
    return BoatAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return BoatAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return BoatAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new BoatController();
