var express = require('express');
var router = express.Router();
var cors = require('cors');

import { cachedCryptoPrice } from '../dao/api';

var corsOptions = {
  origin: 'https://cryptoground.herokuapp.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* GET caching price. */
router.get('/', cors(corsOptions), function(req, res, next) {
  res.jsonp(cachedCryptoPrice);
});

module.exports = router;
