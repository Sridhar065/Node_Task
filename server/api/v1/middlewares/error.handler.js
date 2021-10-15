/**
 * @author Renuga <v2316344>
 * @abstract Error handler to send response if any obstacle found
 * @version 1.0.0
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default function errorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .send({ status: err.status || 500, message: err.message });
}
