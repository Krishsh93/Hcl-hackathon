const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { NODE_ENV, CORS_ORIGIN } = require('../config/env');
const routes = require('../routes');
const { notFound, errorHandler } = require('../middlewares/error');

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', true);

  app.use(helmet());
  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  if (NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  app.use('/api', routes);

  app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
  });

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
