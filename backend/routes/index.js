var express = require('express');
var router = express.Router();
const api = require('./api')
const web = require('./web')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', api);
router.use('/', web);

module.exports = router;
