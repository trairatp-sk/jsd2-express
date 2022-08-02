const express = require('express');
const { preOrderRouter } = require('./preOrder');

const foodRouter = express.Router();

const logger = (req, res, next) => {
  console.log('Request parameters');
  console.log(req.params);
  const now = new Date();
  console.log(now.toISOString());
  next();
};

foodRouter.use(logger);

foodRouter.get('/:menu', (req, res) => {
  // Cooking
  const { menu } = req.params;
  const chickenRice = {
    rice: 'oiled rice',
  };
  if (menu === 'fried-chicken-rice') {
    chickenRice.meat = 'fried-chicken';
    chickenRice.sauces = ['mae pra nom'];
    // Serve
    res.status(200).send(chickenRice);
    res.status(200).json(chickenRice);
  } else if (menu === 'chicken-rice') {
    chickenRice.meat = 'boiled-chicken';
    chickenRice.sauces = ['white', 'red'];
    // Serve
    res.status(200).send(chickenRice);
  } else {
    // 400 - Bad request
    // Serve
    res.status(400).send(`We are not serving ${menu}`);
  }
});

foodRouter.get('/:special-menu', (req, res) => {
  // Cooking
  const { menu } = req.params;
  const roastedPorkRice = {
    rice: 'rice',
  };
  roastedPorkRice.meat = 'roasted-pork';
  roastedPorkRice.sauces = ['moo-dang-sauce'];
  // Serve
  res.status(200).json(chickenRice);
});

foodRouter.use('/pre-orders', preOrderRouter);

module.exports = { foodRouter };
