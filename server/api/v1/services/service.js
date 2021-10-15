const Sequelize = require("sequelize");
import SequelizeService from "./enable.service";

/**
 * @author Renuga <v2316344>
 * @abstract Base service to handel global methods for all the services
 * @version 1.0.0
 */
export default class Service {
  /**
   * @author Renuga <v2316344>
   * @abstract creates connection every time class is invoked
   * @version 1.0.0
   */
  constructor() {
    this.connection = SequelizeService.connect();
    this.Op = Sequelize.Op;
  }
 


  /**
   * @author Renuga <v2316344>
   * @abstract close connection and construct response structure
   * @version 1.0.0
   * @param statusCode number required
   * @param responseContent object optional
   * @param messageContent string optional
   * @returns Object
   */
  response(
    statusCode,
    responseContent = null,
    messageContent = null,
    custom_message = null
  ) {
    this.connection.close();
    return {
      status: statusCode,
      content: responseContent,
      message: messageContent,
      custom_message: custom_message
    };
  }

  handler(error) {
    this.connection.close();
    return {
      status: 500,
      content: error,
      message: "Something went wrong"
    };
  }
}

