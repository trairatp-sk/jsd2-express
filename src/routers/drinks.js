const express = require('express');

const drinkRouter = express.Router();

drinkRouter.get('/:menu', (req, res) => {
  const { menu } = req.params;

  if (['water', 'soda', 'orange juice'].includes(menu)) {
    res.send(menu);
  } else {
    // 400 - Bad request
    res.status(400).send(`We are not serving ${menu}`);
  }
});

module.exports = { drinkRouter };
