const axios = require("axios");
const { Type } = require("../db.js");
const { getTypes } = require("../Services/typesfromapi.service.js");

exports.getAllTypes = async (req, res) => {
  try {
    const typesDb = await Type.findAll();

    if (typesDb.length > 0) {
      const types = typesDb.map((type) => type.name);
      res.status(200).send(types);
    } else {
      const typesAPI = await getTypes();
      const types = await Promise.all(
        typesAPI.map(async (typeName) => {
          const type = await Type.create({ name: typeName });
          return type.name;
        })
      );
      res.status(200).send(types);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error del servidor");
  }
};
