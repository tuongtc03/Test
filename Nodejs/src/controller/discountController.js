import discountService from "../services/discountService";

let handleGetAllDiscounts = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      discounts: [],
    });
  }

  let discounts = await discountService.getAllDiscounts(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    discounts,
  });
};

let handleCreateDiscount = async (req, res) => {
  let message = await discountService.createDiscount(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateDiscount = async (req, res) => {
  let data = req.body;
  let message = await discountService.updateDiscount(data);
  return res.status(200).json(message);
};

let handleDeleteDiscount = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await discountService.deleteDiscount(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllDiscounts: handleGetAllDiscounts,
  handleCreateDiscount: handleCreateDiscount,
  handleUpdateDiscount: handleUpdateDiscount,
  handleDeleteDiscount: handleDeleteDiscount,
};
