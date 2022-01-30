var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* POST home page. */
router.post('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



/* API router */
router.get('/kontakter', function(req, res, next) {
    res.status(200).send('Operation gennemført');
});
router.post('/kontakter', function(req, res, next) {
    res.status(200).send('Operation gennemført');
});
router.put('/kontakter', function(req, res, next) {
    res.status(200).send('Operation gennemført');
});
router.delete('/kontakter', function(req, res, next) {
    res.status(200).send('Operation gennemført');
});


















const middleware = require('../middleware');

router.get('/cookie-set', function(req, res, next) {

    res.cookie('session_id', 'ac')
        .status(200)
        .render('index', { title: 'Cookie set', msg: 'Alt ok, sessionen er sat' })

});

router.get('/cookie-read', middleware.validateCookie, function(req, res, next) {

    const {cookies} = req;
    var myCookie = cookies.session_id;

    res.status(200)
        .render('index', { title: 'Cookie read', msg: myCookie })

});



/* Database connection start */
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://user-la:VjXgC0WpoZz8UsPW@cluster0.ogvej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI).then(r =>
  mongoose.connection.on('connected', () => {
    console.log('Connected to Atlas');
  })
);
/* Database connection end */

/* Database schema start */
var Schema = mongoose.Schema;

var userDataSchema = new Schema( {
    title: {type: String, required:true},
    content: {type: String, required:true},
    author: {type: String, required:true}
  }, {collation: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);
/* Database schema end */

/* Database route start */
router.get('/db', function(req, res, next) {
  res.render('index', { title: 'Database test' });
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
      .then((doc) =>{
        res.render('db', { title: 'Database get-data test', items: doc });
      });
});


router.post('/insert', function(req, res, next) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    var data = new UserData(item);
    data.save();
    res.redirect('/db');
});
router.post('/update', function(req, res, next) {
    var id = req.body.id;

    UserData.findById(id, function (err, doc){
        if (err){
            console.error('error, no entry found');
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
    })
    res.redirect('/db');
});
router.post('/delete', function(req, res, next) {
    var id = req.body.id;

    UserData.findByIdAndRemove(id).exec();
    res.redirect('/db');
});
/* Database route end */

module.exports = router;
