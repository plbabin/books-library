// server/index.js

const app = require('./app');

let PORT = parseInt(process.env.PORT, 10) || 9000;

if (process.env.NODE_ENV !== 'production') {
  PORT = PORT + 1;
}

app.set('port', PORT);

//
// Launch the server
// -----------------------------------------------------------------------------

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${app.get('port')}`);
  if (process.send) {
    process.send('online');
  }
});