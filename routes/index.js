var express = require('express');
var router = express.Router();

const { getAllData, getDataById } = require('../services/data-mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  //error handling by try catch
  try{
    res.render('index', { title: 'Express' });
  }catch(err){
    if(err) throw err;
  };
});

router.get('/table', async (req, res, next) => {
  try{
    const data = await getAllData(req.body);
    res.render('table', {title: 'Table', data});
  }catch(err){
    if(err) throw err;
  };
});

router.get('/table/edit/:id', async (req, res, next) => {
  try{
    const data = await getDataById(req.body)
    res.render('edit', {data});
  }catch(err){
    if(err) throw err;
  };
});

module.exports = router;
