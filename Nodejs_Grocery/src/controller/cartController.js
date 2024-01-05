import cartService from "../services/cartService";

let handleGetAllCarts = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      carts: [],
    });
  }

  let carts = await cartService.getAllCarts(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    carts,
  });
};

let handleCreateCart = async (req, res) => {
  let message = await cartService.createCart(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateCart = async (req, res) => {
  let data = req.body;
  let message = await cartService.updateCart(data);
  return res.status(200).json(message);
};

let handleDeleteCart = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await cartService.deleteCart(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllCarts: handleGetAllCarts,
  handleCreateCart: handleCreateCart,
  handleUpdateCart: handleUpdateCart,
  handleDeleteCart: handleDeleteCart,
};
