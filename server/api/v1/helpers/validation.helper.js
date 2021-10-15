const moment = require("moment");
/**
 * @author Renuga <v2316344>
 * @abstract Commomn Validatoion class
 * @version 1.0.0
 */
class ValidationHelper {
  constructor() {
    this.error_bag = {};
    this.messageDataSet = {
      required: "key required",
      minLen: "key should be greater than params characters",
      maxLen: "key should be less than params characters",
      email: "Not a valid email address",
      numeric: "key Not a numeric value",
      integer: "key Not a integer value",
      alphaNumeric: "key Not a alpha numeric string",
      alphabets: "key Not a alphabet only string",
      min: "key should be greater than params",
      max: "key should be less than params",
      date: "Not a valid date / valid date format is MM/DD/YYYY",
      url: "Not a valid URL",
      comparedate: "From date is greater than To date"
    };
  }

  /**
   * @author Renuga <v2316344>
   * @abstract Channels input based on the options provided to specific validation function
   * @version 1.0.0
   * @param options Array
   * @param request Object
   * @returns Object
   */
  async validate(options, request) {
    try {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const conditions = options[key].split("|");
          let container = [];
          if (request.hasOwnProperty(key)) {
            if (Array.isArray(request[key])) {
              container = request[key];
            } else {
              container.push(request[key]);
            }
            for (let value = 0; value < container.length; value++) {
              for (let index = 0; index < conditions.length; index++) {
                const condition = conditions[index].split(":");
                const condition_params = condition[1];
                let check = await this.validator(
                  condition[0],
                  key,
                  container[value],
                  condition_params
                );
                if (!check) {
                  break;
                }
              }
            }
          } else {
            if (conditions.includes("required")) {
              this.fillInErrorBag("required", key);
            }
          }
        }
      }
      if (
        Object.entries(this.error_bag).length === 0 &&
        this.error_bag.constructor === Object
      ) {
        return { status: 200, message: "Validation Successful" };
      } else {
        let error_collection = await this.collectErrorBag();
        return { status: 422, error: error_collection };
      }
    } catch (e) {
      return { status: 400, error: e };
    }
  }

  /**
   * @author Renuga <v2316344>
   * @abstract collects error messages and empties error bag for next interation
   * @version 1.0.0
   * @returns Object
   */
  collectErrorBag() {
    let error_bag = this.error_bag;
    this.error_bag = {};
    return error_bag;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract add error messages in to the error bag
   * @version 1.0.0
   * @param method string
   * @param key string
   * @param params string
   */
  fillInErrorBag(method, key, params) {
    let message = this.messageHandler(method, key, params);
    if (key in this.error_bag) {
      let existing_value = this.error_bag[key];
      if (Array.isArray(existing_value)) {
        this.error_bag[key].push(message);
      } else {
        let new_array = [existing_value, message];
        this.error_bag[key] = new_array;
      }
    } else {
      this.error_bag[key] = this.messageHandler(method, key, params);
    }
  }

  /**
   * @author Renuga <v2316344>
   * @abstract calls respective validation method based on the method parameter
   * @version 1.0.0
   * @param method string
   * @param key string
   * @param value string
   * @param params string
   * @returns boolean
   */
  async validator(method, key, value, params) {
    let result = true;
    if (value) {
      if (typeof value == "string") {
        value = value.trim();
      }
      result = await this[method](key, value, params);
    } else {
      result = false;
      this.fillInErrorBag(method, key, params);
    }
    return result;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract converts message dynamicaly based on the user input
   * @version 1.0.0
   * @param method string
   * @param key string
   * @param params string
   */
  messageHandler(method, key, params) {
    let message = this.messageDataSet[method];
    message = message.replace(/key/g, key);
    message = message.replace(/params/g, params);
    return message;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for null values and empty string
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  required(key, value) {
    if (value === "") {
      this.fillInErrorBag("required", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for length of given string less than given paramenter
   * @version 1.0.0
   * @param key string
   * @param value string
   * @param params string
   * @returns boolean
   */
  minLen(key, value, params) {
    if (typeof value != "string") {
      value = value.toString();
    }
    if (value.length < params) {
      this.fillInErrorBag("minLen", key, params);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for length of given string greater than given paramenter
   * @version 1.0.0
   * @param key string
   * @param value string
   * @param params string
   * @returns boolean
   */
  maxLen(key, value, params) {
    if (typeof value != "string") {
      value = value.toString();
    }
    if (value.length > params) {
      this.fillInErrorBag("maxLen", key, params);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string matches the given pattern
   * @version 1.0.0
   * @param pattern string
   * @param value string
   * @returns boolean
   */
  checkPattern(pattern, value) {
    return pattern.test(value);
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is email or not
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  email(key, value) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.checkPattern(pattern, value) == false) {
      this.fillInErrorBag("email", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given value is number or not
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  numeric(key, value) {
    if (isNaN(value)) {
      this.fillInErrorBag("numeric", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given value is integer or not
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  integer(key, value) {
    if (isNaN(value) && !Number.isSafeInteger(parseInt(value))) {
      this.fillInErrorBag("integer", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is alphanumeric or not
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  alphaNumeric(key, value) {
    let pattern = /^[A-Za-z0-9 ]+$/i;
    if (this.checkPattern(pattern, value) == false) {
      this.fillInErrorBag("alphaNumeric", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is alphabets only or not
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  alphabets(key, value) {
    let pattern = /^[A-Za-z ]+$/;
    if (this.checkPattern(pattern, value) == false) {
      this.fillInErrorBag("alphabets", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is less than the parameter
   * @version 1.0.0
   * @param key string
   * @param value string
   * @param params string
   * @returns boolean
   */
  min(key, value, params) {
    if (parseInt(value) < parseInt(params)) {
      this.fillInErrorBag("min", key, params);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is greater than the parameter
   * @version 1.0.0
   * @param key string
   * @param value string
   * @param params string
   * @returns boolean
   */
  max(key, value, params) {
    if (parseInt(value) > parseInt(params)) {
      this.fillInErrorBag("max", key, params);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is a valid date and valid format
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  date(key, value) {
    // if (!moment(value, "MM/DD/YYYY", true).isValid()) {
    if (!moment(value, "M/D/YYYY", true).isValid()) {
      this.fillInErrorBag("date", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract compare date greater than or equal to
   * @version 1.0.0
   * @param key date
   * @param value date
   * @returns boolean
   */
  comparedate(key, value1, value2) {

    let frmdte = moment(value1);
    let todte = moment(value2);
    if (frmdte > todte) {
      this.fillInErrorBag("comparedate", key);
      return false;
    }
    return true;
  }

  /**
   * @author Renuga <v2316344>
   * @abstract check for given string is a valid url
   * @version 1.0.0
   * @param key string
   * @param value string
   * @returns boolean
   */
  url(key, value) {
    let res = value.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    if (res == null) {
      this.fillInErrorBag("url", key);
      return false;
    }
    return true;
  }

}

export default new ValidationHelper();
