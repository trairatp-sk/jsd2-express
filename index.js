const express = require('express');
const { foodRouter } = require('./routers/food');
const { drinkRouter } = require('./routers/drinks');
// const express = require('express');

const app = express();

// สั่งข้าว
// POST /foods/pre-orders
app.use('/foods', foodRouter);

// สั่งน่ำ
// POST /drinks/pre-orders
app.use('/drinks', drinkRouter);

app.listen(8080, () => {
  console.log('Server is listening on 8080');
});
