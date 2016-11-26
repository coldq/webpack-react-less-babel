/**
 * Created by cold on 2016/11/20.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/write', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;