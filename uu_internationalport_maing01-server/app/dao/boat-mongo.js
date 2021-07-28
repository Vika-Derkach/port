"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class BoatMongo extends UuObjectDao {
  createSortObject(sortBy, order) {
    return {
      [sortBy]: order === "asc" ? 1 : -1,
    };
  }
  async createSchema() {
    await super.createIndex({ id: 1, awid: 1 }, { unique: true });
  }
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }
  async getCapacityByPierID(findBoat) {
    return await super.find(findBoat);
  }
  async update({ awid, id, ...uuObject }) {
    return await super.findOneAndUpdate({ awid, _id: id }, uuObject, null, null);
  }
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  async list(awid, sortBy, order, pageInfo) {
    let sort = this.createSortObject(sortBy, order);
    return await super.find({ awid }, pageInfo, sort);
  }

  async listByPierIdAndBoatNameList(filter, pageInfo, sortBy, order) {
    let sort = this.createSortObject(sortBy, order);
    return await super.find(filter, pageInfo, sort);
  }
  async listByPierId(filter, pageInfo, sortBy, order) {
    let sort = this.createSortObject(sortBy, order);
    return await super.find(filter, pageInfo, sort);
  }
  async listByBoatName(filter, pageInfo, sortBy, order) {
    let sort = this.createSortObject(sortBy, order);
    return await super.find(filter, pageInfo, sort);
  }
}

module.exports = BoatMongo;
