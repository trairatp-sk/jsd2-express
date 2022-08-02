const express = require('express');
var cors = require('cors');
// const { foodRouter } = require('./routers/food');
// const { drinkRouter } = require('./routers/drinks');
const bodyParser = require('body-parser');
// const express = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let i = 0;

app.post('/activities', (req, res) => {
  console.log(req.body);
  const newActivities = {
    ...req.body,
    id: i++,
  };
  res.json(newActivities);
});

// สั่งข้าว
// POST /foods/pre-orders
// app.use('/foods', foodRouter);

// สั่งน่ำ
// POST /drinks/pre-orders
// app.use('/drinks', drinkRouter);

app.listen(8080, () => {
  console.log('Server is listening on 8080');
});
