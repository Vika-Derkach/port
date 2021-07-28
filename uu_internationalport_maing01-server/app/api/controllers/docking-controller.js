"use strict";
const DockingAbl = require("../../abl/docking-abl.js");

class DockingController {

  create(ucEnv) {
    return DockingAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new DockingController();
