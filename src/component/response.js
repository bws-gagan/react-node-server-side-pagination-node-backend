/**
 * @author Gagan KC
 */

class Response {
  buildSucessResponse(isSucess, data, error) {
    return {
      isSucess: isSucess,
      response: data,
      error: error,
    };
  }
  buildSucessResponseWithCount(isSucess, data, error, Data) {
    return {
      isSucess: isSucess,
      response: data,
      error: error,
      totalData: Data["totalData"],
    };
  }

  buildfailureResponse(isSucess, data, error) {
    return {
      isSucess: isSucess,
      response: data,
      error: error,
    };
  }
}

module.exports = Response;
