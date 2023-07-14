let Validator_user = require("./validator_user");
// let Parser = require("./parser");
/**
 * @author Gagan KC
 */
class UserProxy {
  constructor() {
    this.validator = new Validator_user();
  }

  /**
   * @author Gagan KC
   * get login request data
   * @param {loginRequestData}
   */
  async getLogin(loginRequestData) {
    try {
      let getLoginValidateResponse = await this.validator.validateLogin(
        loginRequestData
      );
      return getLoginValidateResponse;
    } catch (exception) {
      console.log(exception);
    }
  }

  /**
   * @author Gagan KC
   * Add user data request
   * @param {requestData}
   */
  async addUser(requestData) {
    try {
      let addUserValidateResponse = await this.validator.validateAddUser(
        requestData
      );
      return addUserValidateResponse;
    } catch (exception) {
      console.log(exception);
    }
  }

  /**
   * @author Gagan KC
   * Update user data request
   * @param {requestData}
   */
  async updateUser(requestData) {
    try {
      let updateUserValidateResponse = await this.validator.validateUpdateUser(
        requestData
      );
      return updateUserValidateResponse;
    } catch (exception) {
      console.log(exception);
    }
  }
}
module.exports = UserProxy;
