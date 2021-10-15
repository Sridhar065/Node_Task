/**
 * @author Renuga <v2316344>
 * @abstract Error handler to send response if any url not found
 * @version 1.0.0
 * @param err
 * @param req
 * @param res
 * @param next
 */
export default function pageNotFound(req, res, next) {
  res.status(404).send({ status: 404, message: "Sorry can't find that!" });
}
