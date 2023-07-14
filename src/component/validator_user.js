let Joi = require("joi");

/**
 * @author Gagan KC
 */
class Validator_user {
  constructor() {}

  /**
   * @author Gagan KC
   * validate login data
   * @param {loginRequestData}
   */
  validateLogin(loginRequestData) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      });

      const { error, value } = schema.validate(loginRequestData);

      if (error) {
        return { error: error.details.map((x) => x.message).join(", ") };
      } else {
        return value;
      }
    } catch (exception) {}
  }

  /**
   * @author Gagan KC
   * validate add user request data
   * @param {requestData}
   */
  validateAddUser(requestData) {
    try {
      const schema = Joi.object().keys({
        usertype: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        contact: Joi.string().min(6).max(16).required(),
        location: Joi.object().required(),
        status: Joi.string().required(),
      });

      const { error, value } = schema.validate(requestData);

      if (error) {
        return { error: error.details.map((x) => x.message).join(", ") };
      } else {
        return value;
      }
    } catch (exception) {}
  }

  /**
   * @author Gagan KC
   * validate update user request data
   * @param {requestData}
   */
  validateUpdateUser(requestData) {
    try {
      const schema = Joi.object().keys({
        id: Joi.string().required(),
        usertype: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),

        contact: Joi.string().min(6).max(16).required(),
        location: Joi.object().required(),
        status: Joi.string().required(),
      });

      const { error, value } = schema.validate(requestData);

      if (error) {
        return { error: error.details.map((x) => x.message).join(", ") };
      } else {
        return value;
      }
    } catch (exception) {}
  }
}

module.exports = Validator_user;
