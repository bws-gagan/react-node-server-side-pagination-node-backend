let UserProxy = require("../component/user_proxy");
let Response = require("../component/response");
let DBService_user = require("../db/services/db_service_user");
let secret_key = "BWSAams2022";
let secret_iv = "BWSAams2022";
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto
  .createHash("sha512")
  .update(secret_key, "utf-8")
  .digest("hex")
  .substr(0, 32);
// const iv = crypto.randomBytes(16);
const iv = crypto
  .createHash("sha512")
  .update(secret_iv, "utf-8")
  .digest("hex")
  .substr(0, 16);

const GENERIC_ERROR = "data not found";
function encrypt(text) {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key),
    Buffer.from(iv)
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: Buffer.from(iv).toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key),
    Buffer.from(iv)
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

/**
 * @author Gagan KC
 */
class UserService {
  constructor() {
    this.userProxy = new UserProxy();
    this.response = new Response();
    this.dbService = new DBService_user();
  }

  /**
   * @author Gagan KC
   *get login request
   * @param {getLogin}
   */
  async getLogin(data) {
    try {
      let getUserProxyResponse = await this.userProxy.getLogin(data);

      if (getUserProxyResponse.error) {
        return this.response.buildfailureResponse(
          false,
          null,
          getUserProxyResponse.error
        );
      } else {
        let getLoginDBResponse = await this.dbService.getLogin(data);

        if (getLoginDBResponse && getLoginDBResponse) {
          return this.response.buildSucessResponse(
            true,
            getLoginDBResponse,
            null
          );
        } else {
          return this.response.buildfailureResponse(
            false,
            null,
            "data not found"
          );
        }
      }
    } catch (error) {
      return this.response.buildfailureResponse(false, error, null);
    }
  }

  /**
   * @author Gagan K C
   * encrypt password into database
   * reject existing users
   * @param {addUser}
   */
  async addUser(requestData) {
    try {
      // var chars =
      //   "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      // var passwordLength = 10;
      // var password = "";

      // for (var i = 0; i <= passwordLength; i++) {
      //   var randomNumber = Math.floor(Math.random() * chars.length);
      //   password += chars.substring(randomNumber, randomNumber + 1);
      // }

      // // encrypt and decrypt
      // password = encrypt(password);
      // console.log("Your password is: " + decrypt(password));

      // requestData.password = password;

      let addUserDBResponse = await this.dbService.addUser(requestData);

      if (addUserDBResponse && addUserDBResponse) {
        return this.response.buildSucessResponse(true, addUserDBResponse, null);
      } else {
        return this.response.buildfailureResponse(
          false,
          null,
          "data not found"
        );
      }
    } catch (error) {
      return this.response.buildfailureResponse(false, error, null);
    }
  }

  /**
   * @author Gagan KC
   * Update user data request
   * @param {updateUser}
   */
  async updateUser(requestData) {
    try {
      let updateUserProxyResponse = await this.userProxy.updateUser(
        requestData
      );

      if (updateUserProxyResponse.error) {
        return this.response.buildfailureResponse(
          false,
          null,
          updateUserProxyResponse.error
        );
      } else {
        let updateUserDBResponse = await this.dbService.updateUser(requestData);

        if (updateUserDBResponse && updateUserDBResponse) {
          return this.response.buildSucessResponse(
            true,
            updateUserDBResponse,
            null
          );
        } else {
          return this.response.buildfailureResponse(
            false,
            null,
            "data not found"
          );
        }
      }
    } catch (error) {
      return this.response.buildfailureResponse(false, error, null);
    }
  }

  /**
   * @author Gagan KC
   *Delete user data request
   * @param {deleteUser}
   */
  async deleteUser(requestData) {
    try {
      let deleteUserDBResponse = await this.dbService.deleteUser(requestData);

      if (deleteUserDBResponse && deleteUserDBResponse) {
        return this.response.buildSucessResponse(
          true,
          deleteUserDBResponse,
          null
        );
      } else {
        return this.response.buildfailureResponse(
          false,
          null,
          "data not found"
        );
      }
    } catch (error) {
      return this.response.buildfailureResponse(false, error, null);
    }
  }

  /**
   * @author Gagan KC
   * get all user
   * @param {requestData}
   */
  async getAllUser(requestData) {
    try {
      let getAllUserDBResponse = await this.dbService.getAllUser(requestData);

      if (getAllUserDBResponse == "Device not Present") {
        return this.response.buildfailureResponse(
          false,
          [],
          getAllUserDBResponse
        );
      } else if (getAllUserDBResponse && getAllUserDBResponse) {
        return this.response.buildSucessResponseWithCount(
          true,
          getAllUserDBResponse.slice(0, -1),
          null,
          getAllUserDBResponse[getAllUserDBResponse.length - 1]
        );
      } else {
        return this.response.buildfailureResponse(
          false,
          null,
          "data not found"
        );
      }
    } catch (error) {
      return this.response.buildfailureResponse(false, error, null);
    }
  }
}
module.exports = UserService;
