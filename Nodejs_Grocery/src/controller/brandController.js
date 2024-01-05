import brandService from "../services/brandService";

let handleGetAllBrands = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      brands: [],
    });
  }

  let brands = await brandService.getAllBrands(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    brands,
  });
};

let handleCreateBrand = async (req, res) => {
  let message = await brandService.createBrand(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateBrand = async (req, res) => {
  let data = req.body;
  let message = await brandService.updateBrand(data);
  return res.status(200).json(message);
};

let handleDeleteBrand = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await brandService.deleteBrand(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllBrands: handleGetAllBrands,
  handleCreateBrand: handleCreateBrand,
  handleUpdateBrand: handleUpdateBrand,
  handleDeleteBrand: handleDeleteBrand,
};
