import * as express from "express";
import masterController from "./studentController";
import middleware from "../../middlewares/auth";
export default express
  .Router()
  .post("/get-createlistCrib", masterController.createListcrib)
  .post("/get-search", masterController.searchCrib)
  .get("/get-list", masterController.GetCribList)
  .delete("/get-delete", masterController.deleteListCrib)
  .post("/get-updatelist", masterController.updateListCrib)




