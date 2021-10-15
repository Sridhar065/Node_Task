const multer = require("multer");
const fileFilterConfig = require("../config/fileFilter.config");
const filterSet = fileFilterConfig.fileFilter.filter;
const filterExt = fileFilterConfig.fileFilter.filterExt;

const aws = require("aws-sdk");
const multers3 = require("multer-s3");
const settings = require("../config/app.config");

const s3 = new aws.S3({
  secretAccessKey: settings.config.Aws_Secret_Access_key,
  accessKeyId: settings.config.Aws_Accesskey_id,
  region: settings.config.Aws_Region,
  s3BucketEndpoint: true,
  endpoint: "http://" + settings.config.Aws_Bucket + ".s3.amazonaws.com"
})

const multerS3Config = multers3({
  s3: s3,
  bucket: settings.config.Aws_Bucket,
  //acl: settings.config.Aws_Access,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });

  },
  key: function (req, file, cb) {
    cb(null, "code9menufiles/" + Date.now() + "_" + file.originalname);
  },
  contentType	:multers3.AUTO_CONTENT_TYPE
});

let fileSize = 5; // default size kb. ex: 150 = 150 kb
let fileDest = 'public/'; // default path
/**
* @author SathishKumar S <v2e12612>
* @abstract file upload using multer
* @version 1.0.0
* @param1 parameter arg name and no of files | array type
*/
const fileFilters = (req, file, cb) => {
  let file_path = req.originalUrl;
  let extensions_validate;
  for (let index = 0; index < filterSet.length; index++) {
    if (filterSet[index][0] == file_path) {
      fileSize = parseInt(filterSet[index][2]);
      fileDest = filterSet[index][3];
      let filters = filterSet[index][1].split("|");
      for (let key = 0; key < filters.length; key++) {
        let filter = filters[key];
        if (extensions_validate == null) {
          extensions_validate = filterExt[filter];
        } else {
          extensions_validate = extensions_validate.concat(
            "," + filterExt[filter]
          );
        }
      }
    }
  }
  let arr_extensions = extensions_validate.split(",");
  if (arr_extensions == null) {
    return cb(new Error("File not found"));
  }

  if (arr_extensions.indexOf(file.originalname.split(".")[file.originalname.split(".").length - 1]) === -1) {
    return cb(new Error("Wrong extension. Not accepted"));
  }
  cb(null, true);
};
let multersave = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

//to upload files to server or local folder
exports.fileUpload = multer({
  storage: multersave,
  fileFilter: fileFilters,
  limits: {
    fileSize: 1024 * 1024* fileSize
  },
  onError: (err, next) => {
    console.log("Error from multer : " + err);
    next(err);
  }
});

exports.fileUploadToS3 = multer({
  storage: multerS3Config,
  fileFilter: fileFilters,
  limits: {
    fileSize: 1024 * 1024*  fileSize
  },
  onError: (err, next) => {
    console.log("Error from multer : " + err);
    next(err);
  }
});


