const router = require('express').Router();
const {createDino, getDino, getDinoNames, getDinoByLetter,getDinoRandom,getDinos } = require('../controllers/dinos');

router.use('/auth', require('../config/auth'))

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/users', (req, res) => {
    res.render('login')
});

router.get('/users/signup', (req, res) => {
    res.render('signup')
});

router.use('/dinos',require('./dinos'));
router.use('/habitats',require('./habitats'));
router.use('/historicalperiods',require('./historicalperiods'));


module.exports = router;