var express = require('express');
var app = express.Router();

const { getAllData, getDataById, creataData, updateData, deleteData } = require('../services/data-mongoose');

app.get('/', async (req, res, next) => {
	try{

		res.send(await getAllData(req.body));
	}catch(err){
		if(err) throw err;
	};
	
});

app.get('/:id', async (req, res, next) => {
	try{

		res.send(await getDataById(req.params.id))
		
	}catch(err){
		if(err) throw err;
	};
});

app.post('/', async (req, res, next) => {
	try{

		const data = await creataData(req.body);

		if(data.id){
			res.send({status: 'ok', msg: 'data added'});
		}else{
			res.send({status: 'fail', msg: 'add failed'});
		};
	}catch(err){
		if(err) throw err;
	};
});

app.put('/:id', async (req, res, next) => {
	try{
		const update = await updateData(req.params.id, req.body)
		res.send({status: 'ok', msg: 'data updated'});
		return update;
	}catch(err){
		if(err) throw err;
	};
});

app.delete('/:id', async (req, res, next) => {
	
	try{
		let remove = await deleteData(req.body);
		res.send({status: 'ok', msg: 'data deleted'});
		return remove;
	}catch(err){
		if(err) throw err;
	};
});

module.exports = app;