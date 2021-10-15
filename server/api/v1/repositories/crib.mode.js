import connectService from "../services/enable.service";
const Sequelize = require("sequelize");
const Model = Sequelize.Model;
const sequelize = connectService.connect();

export default class Crib extends Model { }
Crib.init(
    {
        // id: {
        // type: Sequelize.INTEGER,
        // allowNull:false,
        // autoIncrement: true,
        // },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },         
    },
    {
        sequelize,
        timestamps:false,
        tableName: "tbl_crib"
      }
    
);
