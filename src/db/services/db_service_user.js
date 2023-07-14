let Response = require("../../component/response");
let User = require("../models/user");

/**
 * @author Gagan KC
 */
class DBService_user {
  constructor() {
    this.response = new Response();
  }

  /**
   * @author Gagan KC
   * get login info to database
   * @param {*} requestData
   */
  async getLogin(requestData) {
    try {
      const login = await User.findOne({
        email: requestData.email,
        password: requestData.password,
        status: "active",
      });

      return login;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author Gagan KC
   * Add user in to database
   * @param {*} requestData
   */
  async addUser(requestData) {
    try {
      const userExists = await User.findOne({
        email: requestData.email,
      });
      if (userExists != null) {
        return true;
      } else {
        const userScheemaResponse = await User.insertMany({
          organisation: requestData.organisation,
          usertype: requestData.usertype,
          name: requestData.name,
          email: requestData.email,
          password: requestData.password,
          location: requestData.location,
          contact: requestData.contact,
          updatedBy: requestData.updatedBy,
          roles: requestData.roles,
          status: requestData.status,
        });

        return userScheemaResponse;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author Gagan KC
   * Update user info to database
   * @param {*} requestData
   */
  async updateUser(requestData) {
    try {
      const options = { upsert: true };

      const filter = { _id: requestData.id };

      let updateDoc = {
        $set: {
          usertype: requestData.usertype,
          name: requestData.name,
          email: requestData.email,
          password: requestData.password,
          contact: requestData.contact,
          location: requestData.location,
          status: requestData.status,
        },
      };

      const result = await User.updateOne(filter, updateDoc, options);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @author Gagan KC
   * Delete user info to database
   * @param {*} requestData
   */
  async deleteUser(requestData) {
    try {
      const options = { upsert: true };

      const filter = { _id: requestData.id };

      let updateDoc = {
        $set: {
          status: requestData.status,
        },
      };

      const result = await User.updateOne(filter, updateDoc, options);

      return result;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @author Gagan KC
   * get all user from database
   * @param {*} requestData
   */

  async getAllUser(requestData) {
    console.log(requestData);
    try {
      let result;
      let response;
      let TotalData;

      const filter = { status: "active" };
      if (requestData.page && requestData.size && requestData.search !== "") {
        response = await User.find({
          $or: [
            { email: { $regex: `${requestData.search}`, $options: "i" } },
            { name: { $regex: `${requestData.search}`, $options: "i" } },
            { location: { $regex: `${requestData.search}`, $options: "i" } },
          ],
        })
          .skip((requestData.page - 1) * requestData.size)
          .limit(requestData.size);
        TotalData = await User.find({
          $or: [
            { email: { $regex: `${requestData.search}`, $options: "i" } },
            { name: { $regex: `${requestData.search}`, $options: "i" } },
            { location: { $regex: `${requestData.search}`, $options: "i" } },
          ],
        }).count();
      } else if (requestData.page && requestData.size) {
        response = await User.find({
          email: { $regex: `${requestData.email}`, $options: "i" },
          name: { $regex: `${requestData.name}`, $options: "i" },
          location: { $regex: `${requestData.location}`, $options: "i" },
        })
          .skip((requestData.page - 1) * requestData.size)
          .limit(requestData.size);
        TotalData = await User.find({
          email: { $regex: `${requestData.email}`, $options: "i" },
          name: { $regex: `${requestData.name}`, $options: "i" },
          location: { $regex: `${requestData.location}`, $options: "i" },
        }).count();
      } else {
        response = await User.find();
        TotalData = await User.find().count();
      }
      if (response.length) {
        let data = {};
        data.totalData = TotalData;
        result = response;
        result.push(data);
      } else {
        result = "Unable to fetch users";
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DBService_user;
