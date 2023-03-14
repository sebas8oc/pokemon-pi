const axios = require("axios");

exports.returnUrl = async (url) => {
  const response = await axios(url)
  return response.data;
}
