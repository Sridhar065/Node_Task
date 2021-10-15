const DataTypes = require('sequelize/lib/data-types');
const Sequelize = require("sequelize");
const Settings = require("../config/app.config");
const moment = require('moment');

class connectService{
     connect() {
        const newConnection = new Sequelize(
          Settings.config.DB_NAME,
          Settings.config.DB_USER,
          Settings.config.DB_PASSWORD,
          {
            host: Settings.config.DB_HOST,
            dialect: Settings.config.DIALECT,
          }
         
        );
        return newConnection;
      }

}
export default new connectService();
