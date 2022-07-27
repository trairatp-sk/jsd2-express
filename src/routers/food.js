const express = require('express');
const { preOrderRouter } = require('./preOrder');

const foodRouter = express.Router();

foodRouter.get('/:menu', (req, res) => {
  console.log('Request parameters');
  console.log(req.params);
  const { menu } = req.params;
  const chickenRice = {
    rice: 'oiled rice',
  };
  if (menu === 'fried-chicken-rice') {
    chickenRice.meat = 'fried-chicken';
    chickenRice.sauces = ['mae pra nom'];
    res.status(200).send(chickenRice);
  } else if (menu === 'chicken-rice') {
    chickenRice.meat = 'boiled-chicken';
    chickenRice.sauces = ['white', 'red'];
    res.status(200).send(chickenRice);
  } else {
    // 400 - Bad request
    res.status(400).send(`We are not serving ${menu}`);
  }
});

foodRouter.use('/pre-orders', preOrderRouter);

module.exports = { foodRouter };
