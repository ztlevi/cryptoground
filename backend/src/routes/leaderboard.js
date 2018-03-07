var express = require('express');
var router = express.Router();
import { fetchLeaderBoard } from 'redis';

/* GET home page. */
router.get('/', function(req, res, next) {
  fetchLeaderBoard()
    .then(response => {
      if (!response) {
        res.jsonp({ status: 'failed', message: 'failed to fetchLeaderBoard!' });
        return;
      }
      res.jsonp(response);
    })
    .catch(e => console.log(e));
});

module.exports = router;
