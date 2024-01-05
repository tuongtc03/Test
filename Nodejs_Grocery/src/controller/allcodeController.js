import allcodeService from "../services/allcodeService";

let getAllCode = async (req, res) => {
  try {
    let data = await allcodeService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

module.exports = {
  getAllCode: getAllCode,
};
