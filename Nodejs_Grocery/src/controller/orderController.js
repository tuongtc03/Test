import orderService from "../services/orderService";

let handleGetAllOrders = async (req, res) => {
  let id = req.query.id; //ALL, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      orders: [],
    });
  }

  let orders = await orderService.getAllOrders(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    orders,
  });
};

let handleCreateOrder = async (req, res) => {
  let message = await orderService.createOrder(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleUpdateOrder = async (req, res) => {
  let data = req.body;
  let message = await orderService.updateOrder(data);
  return res.status(200).json(message);
};

let handleDeleteOrder = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await orderService.deleteOrder(req.body.id);
  return res.status(200).json(message);
};



module.exports = {
  handleGetAllOrders: handleGetAllOrders,
  handleCreateOrder: handleCreateOrder,
  handleUpdateOrder: handleUpdateOrder,
  handleDeleteOrder: handleDeleteOrder,
};
