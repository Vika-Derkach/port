"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PierMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ id: 1, awid: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }
  async getCapacityByPierID(awid, pierId) {
    return await super.get({ awid, pierId });
  }
  async list(awid, sortBy, order, pageInfo) {
    let sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    return await super.find({ awid }, pageInfo, sort);
  }
  async ListByBoatNameAndPierID(awid, sortedBy, boatName, pierId, pageInfo) {
    return await super.find({ awid }, sortedBy, boatName, pierId, pageInfo);
  }

  async ListByMaxCapacity(awid, maxCapacity, pageInfo, sort) {
    return await super.find({ awid, maxCapacity: { $gte: maxCapacity } }, pageInfo, sort);
  }
  async listNoCapacity(awid, pageInfo, sort) {
    return await super.find({ awid }, pageInfo, sort);
  }
}

module.exports = PierMongo;
