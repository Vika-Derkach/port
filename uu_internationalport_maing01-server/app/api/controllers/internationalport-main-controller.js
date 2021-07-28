"use strict";
const InternationalportMainAbl = require("../../abl/internationalport-main-abl.js");

class InternationalportMainController {
  init(ucEnv) {
    return InternationalportMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new InternationalportMainController();
