var express = require('express');
var router = express.Router();

const myAPIcontroller = require('controllers/myAPIcontroller');

router.get('/', myAPIcontroller.listMyAPI);
router.post('/', myAPIcontroller.listMyAPI);
router.put('/', myAPIcontroller.listMyAPI);
router.delete('/', myAPIcontroller.listMyAPI);

module.exports = router;
