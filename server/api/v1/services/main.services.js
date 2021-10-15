import Service from "./service";
import connectionService from "./connection.services";
import { Sequelize } from "sequelize";
import { query } from "express";
const sequelize = require("sequelize");
const Op = sequelize.Op;
import SequelizeService from "../services/enable.service";
const SEQUELIZE = SequelizeService.connect();


class MainService extends Service {


  // create
  async newCrib(query) {

    let mang = connectionService.Crb_in();
    let datacreate = await mang.create(query);
    tableHint: sequelize.TableHints.NOLOCK
    if (datacreate) {
      return this.response(
        200, "",

        "Added successfully"
      );

    } else {
      return this.response(400, "", "Not inserted");
    }
  }

  async searchlistCrib(query) {

    let State = connectionService.Crb_in();
    return await State.findAll({
      where: query,
      tableHint: sequelize.TableHints.NOLOCK,
    });
  }


  async CribList() {

    let Employee = connectionService.Crb_in();
    return await Employee.findAll({
      tableHint: sequelize.TableHints.NOLOCK
    });
  }

  async getdeleteListCrib(con) {

    let mang = connectionService.Crb_in();
    let datacreate = await mang.destroy({ where: con });
    tableHint: sequelize.TableHints.NOLOCK
    if (datacreate) {
      return this.response(
        200, "",

        "update successfully"
      );

    } else {
      return this.response(400, "", "Not inserted");
    }
  }


  //update
  async getupdateListCrib(query, con) {

    let mang = connectionService.Crb_in();
    let datacreate = await mang.update(query, { where: con });
    tableHint: sequelize.TableHints.NOLOCK
    if (datacreate) {
      return this.response(
        200, "",

        "update successfully"
      );

    } else {
      return this.response(400, "", "Not inserted");
    }
  }


}

export default new MainService();
