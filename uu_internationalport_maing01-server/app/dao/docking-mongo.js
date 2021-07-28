"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DockingMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ id: 1, awid: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async listByPier(filter, pageInfo) {
    return await super.find(filter, pageInfo);
  }
  async deleteMany(awid, listId) {
    return await super.deleteMany({ awid, listId });
  }
}

module.exports = DockingMongo;
