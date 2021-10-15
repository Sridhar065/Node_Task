import employeeRouter from "./api/v1/controllers/master/studentRouter";


export default function routes(app) {
  // version 1.0.0 Routes
  app.use("/api/v1/employee", employeeRouter);
}
