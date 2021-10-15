const settings = require("../config/app.config");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const QRCode = require("qrcode");
const dataURI = require("datauri");
const aws = require("aws-sdk");
const fs = require("fs");
const handlebars = require("handlebars");
const CryptoJS = require("crypto-js");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const path = require("path");
// import mailService from "../services/mailTrigger.service";
let secretKey = "Code9SecretKey";
// const NodeRSA = require("node-rsa");
// const key = new NodeRSA({ b: 512 });
//key.setOptions('pkcs1-private-pem',{encryptionScheme: 'pkcs1'});
class GeneralHelper {
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract encrypt text
   */
  encryptText(text) {
    let encrypted = CryptoJS.AES.encrypt(text, secretKey).toString()
    return encrypted;

  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract encrypt text
   */
  decryptText(encryptedText) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Compare password
   */
  comparePassword(userpass, password) {
    return bcrypt.compareSync(password, userpass);

  }
  /**
   * @author Renuga S <v2e16344>
   * @version 1.0
   * @abstract encrypt password
   */
  encryptPassword(password) {
    return bcrypt.hashSync(password);
  }
  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Generate token for user authentication
   */
  tokenGenerate(data, expire) {
    return jwt.sign(data, settings.config.JWT_SECRET, {
      expiresIn: expire
    });
  }

  /**
   * @author Renuga <v2316344>
   * @version 1.0
   * @abstract Decoded the Token
   */
  tokenDecoded(token) {
    let response;
    return jwt.verify(token, settings.config.JWT_SECRET, (err, decoded) => {
      if (err) {
        response = {
          status: 401
        };
        return response;
      } else {
        return decoded;
      }
    });
  }

 

}
  
    

export default new GeneralHelper();
