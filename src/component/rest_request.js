var request = require("request");

/**
 * @author : Gagan KC
 */
class RestRequest {
  constructor() {}

  /**
   * Fire rest request
   * @param {*} req
   */
  async get(options) {
    return new Promise((resolve, reject) =>
      request(options, (err, status, body) => {
        if (err) {
          reject(err);
        }
        resolve(body);
      })
    );
  }
}
module.exports = RestRequest;
