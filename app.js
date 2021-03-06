const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const itemsRouter = require('./controllers/items');
const seedRouter = require('./controllers/seed');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((e) => {
    logger.error(`error encountered while connecting to MongoDB: ${e.message}`)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)
app.use('/api/seed', seedRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app