/**
 * @author Renuga <v2316344>
 * @abstract base controller whihch handels global methods for all controllers
 * @version 1.0.0
 */
export default class BaseController {
  response(
    statusCode,
    responseContent = null,
    messageContent = null,
    custom_message = null
  ) {
    return {
      status: statusCode,
      content: responseContent,
      message: messageContent,
      custom_message: custom_message
    };
  }

  responseone(
    statusCode,
    responseContent = null,
    messageContent = null,
    custom_message = null
  ) {
    return {
      status: statusCode,
      content: responseContent,
      configuration_details: messageContent,
      message: custom_message
    };
  }

  async respond(req, res, result) {
    res.status(result.status).json(result);
  }

  handler(error) {
    return {
      status: 500,
      content: { err: error.message },
      message: "Something went wrong"
    };
  }
}

