const http = require('http');
const { PORT, NODE_ENV } = require('./config/env');
const createApp = require('./load/express');
const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = createApp();
const server = http.createServer(app);

const shutdown = () => {
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('HTTP server closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (${NODE_ENV})`);
});
