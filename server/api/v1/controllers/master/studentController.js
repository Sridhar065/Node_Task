import MainService from "../../services/main.services";
import BaseController from "../base.controller";
import validator from "../../helpers/validation.helper";
import generalHelper from "../../helpers/general.helper";
const Settings = require("../../config/app.config");
export class personController extends BaseController {

  async createListcrib(req, res) {
    let result;
    try {
      let query = { name: req.body.name, location: req.body.location };// condition
      let data = await MainService.newCrib(query);
      if (data.length != 0) {
        result = super.response(
          200,
          data,
          "Successfully retrieved list"
        );
      } else {
        result = super.response(400, "", "No records found");
      }
      super.respond(req, res, result);

    } catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);

    }
  }



  async searchCrib(req, res) {
    let result;
    console.log(req.body)
    try {
      let query = { name: req.body.Search }
      let data = await MainService.searchlistCrib(query);
      console.log(data)
      if (data.length != 0) {
        result = super.response(
          200,
          data,
          "Successfully retrieved list"
        );
      } else {
        result = super.response(400, "", "No records found");
      }
      super.respond(req, res, result);

    } catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);

    }
  }


  async GetCribList(req, res) {
    let result;
    try {
      let data = await MainService.CribList();
      if (data.length != 0) {
        result = super.response(
          200,
          data,
          "Successfully retrieved list"
        );
      } else {
        result = super.response(400, "", "No records found");
      }
      super.respond(req, res, result);

    } catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);

    }
  }



  async deleteListCrib(req, res) {
    let result;
    try {

      let con = { firstname: req.body.firstname }
      let data = await MainService.getdeleteListCrib(con);
      if (data.length != 0) {
        result = super.response(
          200,
          data,
          "Successfully deleted list"
        );
      } else {
        result = super.response(400, "", "No records found");
      }
      super.respond(req, res, result);

    } catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);

    }
  }



  //update
  async updateListCrib(req, res) {
    let result;
    try {
      let query = { name: req.body.name, location: req.body.location }
      let con = { name: "sridhar" }
      let data = await MainService.getupdateListCrib(query, con);
      if (data.length != 0) {
        result = super.response(
          200,
          data,
          "Successfully retrieved list"
        );
      } else {
        result = super.response(400, "", "No records found");
      }
      super.respond(req, res, result);

    } catch (ex) {
      result = super.response(500, ex.message, "Internal Server Error");
      super.respond(req, res, result);

    }
  }
}
export default new personController();
