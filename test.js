const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const jellybeanBag = {
  mystery: {
    number: 4,
  },
  lemon: {
    number: 5,
  },
  rootBeer: {
    number: 25,
  },
  cherry: {
    number: 3,
  },
  licorice: {
    number: 1,
  },
};

// Body-parsing Middleware
app.use(bodyParser.json());

// Logging Middleware
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  throw new Error('test');
});

app.use('/beans/:beanName', (req, res, next) => {
  const beanName = req.params.beanName;
  if (!jellybeanBag[beanName]) {
    const error = new Error('Bean with that name does not exist');
    error.status = 404;
    return next(error);
  }
  req.bean = jellybeanBag[beanName];
  req.beanName = beanName;
  next();
});

app.get('/beans/', (req, res, next) => {
  res.send(jellybeanBag);
});

app.post('/beans/', (req, res, next) => {
  const body = req.body;
  const beanName = body.name;
  if (jellybeanBag[beanName] || jellybeanBag[beanName] === 0) {
    const error = new Error('Bean with that name already exists!');
    error.status = 400;
    return next(error);
  }
  const numberOfBeans = Number(body.number) || 0;
  jellybeanBag[beanName] = {
    number: numberOfBeans,
  };
  res.send(jellybeanBag[beanName]);
});

app.get('/beans/:beanName', (req, res, next) => {
  res.send(req.bean);
});

app.post('/beans/:beanName/add', (req, res, next) => {
  const numberOfBeans = Number(req.body.number) || 0;
  req.bean.number += numberOfBeans;
  res.send(req.bean);
});

app.post('/beans/:beanName/remove', (req, res, next) => {
  try {
    const numberOfBeans = Number(req.body.number) || 0;
    if (req.bean.number < numberOfBeans) {
      const error = new Error('Not enough beans in the jar to remove!');
      error.status = 400;
      return next(error);
    }
    req.bean.number -= numberOfBeans;
    res.send(req.bean);
  } catch (e) {}
});

app.delete('/beans/:beanName', (req, res, next) => {
  const beanName = req.beanName;
  jellybeanBag[beanName] = null;
  res.status(204).send();
});

// Add your error handler here:
app.use((err, req, res, next) => {
  console.log(`I got error`);
  if (err.message === 'test') {
    return res.status(500).send('Server is currently down');
  }
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

