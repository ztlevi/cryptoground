var express = require('express');
var router = express.Router();

import { cachedCryptoPrice } from '../dao/api';

/* GET caching price. */
router.get('/', function(req, res, next) {
  res.jsonp(cachedCryptoPrice);
});

module.exports = router;
