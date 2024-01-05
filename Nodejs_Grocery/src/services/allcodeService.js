import db from "../models/index";

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
          raw: true,
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCodeService: getAllCodeService,
};
