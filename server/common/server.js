import Express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as os from "os";
import cookieParser from "cookie-parser";
import l from "./logger";
const cors = require('cors');
// import swaggerify from './swagger';
import gateway from "./gateway";
import schedule from 'node-schedule';
const helmet = require("helmet");
 

// let periodicalert = schedule.scheduleJob("0 14 * * *", async () => {
//   console.log("running a task every day at 2 P.M for readiness not submitted list");
//   // await ReadinessController.getReadinessSubmittedListPeriodicAlert();;
// });
// //periodicalert();



 

// let facility_mgr_dwa_alert = schedule.scheduleJob("*/30 * * * *", async () => {
//   console.log("running a task every 30 mts for facility manager not submitted dwa alert mail");
//   await empAssessmentController.getDWANotSubmittedListPeriodicAlert();  
// });

// let jobRules = new schedule.RecurrenceRule();
// jobRules.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
// jobRules.hour = 18;
// jobRules.minute = 30;
// let LiveCount_job = schedule.scheduleJob(jobRules, async () => {
//   console.log("running a task every day at 12.00AM for getting count of Corporate, Facility, DWA taken, Safety taken, Employee onboarding, and Child on boarding.");
//   await ReportController.getCountReport();
// });

const app = new Express();
export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set("appPath", `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb"
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    // app.use(Express.static(`${root}/public`));
    app.use("/public", Express.static('public'));
    app.use(cors());

    app.use(helmet.frameguard({ action: "DENY" }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "x-frame-options,Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language,Content-Language,Last-Event-ID,X-HTTP-Method-Override");
      res.header("x-frame-options", "SAMEORIGIN");
      res.header("x-xss-protection", "0");
      req.setTimeout(0) // no timeout for all requests, your server will be DoS'd
      next()
    })
    app.use(function (req, res, next) {
      // res.header("Access-Control-Allow-Origin", "https://code9uat.vee-services.com:8091");
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "x-frame-options,Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language,Content-Language,Last-Event-ID,X-HTTP-Method-Override");
      res.header("x-frame-options", "SAMEORIGIN");
      res.header("x-xss-protection", "0");
      if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
    });
  }

  router(routes) {
    gateway(app, routes);

    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV || "development"} @: ${os.hostname()} on port: ${p}`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
