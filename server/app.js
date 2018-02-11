const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const books = require('google-books-search');
const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));

  // Always return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

const searchOptions = {
  // key: "YOUR API KEY",
  field: 'title',
  offset: 0,
  limit: 10,
  type: 'books',
  order: 'relevance',
  lang: 'en'
};

router.route('/books')
  .get( (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    books.search(req.query.q, searchOptions, (error, results) => {
      if ( ! error ) {
        res.json(results);
      }else{
        res.status(500).json(error);
      }
    });
  }) ;

app.use('/', router);

module.exports = app;