const express = require('express');

const preOrderRouter = express.Router();

const preOrders = [];

preOrderRouter.get('/:orderId', (req, res) => {
  // const { menu, size } = req.query;
  // console.log('Request query:');
  // console.log(req.query);
  // const preOrder = {
  //   id: preOrders.length,
  //   menu: menu,
  // };
  // preOrders.push(preOrder);
  // res.status(200).send(`Order placed. Your order id ${preOrder.id}`);
});

preOrderRouter.post('/', (req, res) => {
  const { menu, size } = req.query;
  console.log('Request query:');
  console.log(req.query);
  const preOrder = {
    id: preOrders.length,
    menu: menu,
  };
  preOrders.push(preOrder);
  res.status(200).send(`Order placed. Your order id ${preOrder.id}`);
});

preOrderRouter.put('/:orderId', (req, res) => {
  // const { menu, size } = req.query;
  // console.log('Request query:');
  // console.log(req.query);
  // const preOrder = {
  //   id: preOrders.length,
  //   menu: menu,
  // };
  // preOrders.push(preOrder);
  // res.status(200).send(`Order placed. Your order id ${preOrder.id}`);
});

preOrderRouter.delete('/:orderId', (req, res) => {
  const { orderId } = req.params;
  const preOrderIndex = preOrders.findIndex((order) => order.id == orderId);
  if (preOrderIndex === -1) {
    return res.status(404).send('Order not exists');
  }
  preOrders[preOrderIndex] = null;
  res.status(200).send('Canceled your order');
});

module.exports = { preOrderRouter };
