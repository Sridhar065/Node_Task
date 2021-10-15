import errorHandler from "../api/v1/middlewares/error.handler";
import pageNotFoundHandler from "../api/v1/middlewares/error404.handler";

export default function(app, routes) {
  routes(app);

  // eslint-disable-next-line no-unused-vars, no-shadow
  app.use(errorHandler);
  app.use(pageNotFoundHandler); // Keep this as the last middleware !important
}
