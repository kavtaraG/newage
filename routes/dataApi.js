var express = require('express');
var app = express.Router();

var stream = require('stream');

const { getAllData, getDataById, creataData, updateData, deleteData } = require('../services/data-mongoose');

app.get('/', async (req, res, next) => {
	try{
		//created writable streams for API
		//for perform use Postman or API route: /api/v1/data
		let writable = new stream.Writable({
			highWaterMark: 1
		});

		writable._write = (chunk, encoding, callback) => {
			process.stdout.pipe(process.stdin);
			return callback();
		};

		function writeData (iterabels, writer, data, encoding, cb) {
			(function write(){
				if(!iterabels--){
					return cb();
				};

				if(!writable.write(data)){
					console.log(`${data}\n Get all data `);
					writable.once('drain', write);
				}
			})();
		};

		writeData(1, writable, 'route: services/data-mongoose.js', 'utf8', () => {
			console.log('done');
		})

		res.send(await getAllData(req.body));
	}catch(err){
		if(err) throw err;
	};
	
});

app.get('/:id', async (req, res, next) => {
	try{

		let writable = new stream.Writable({
			highWaterMark: 1
		});

		writable._write = (chunk, encoding, callback) => {
			process.stdout.pipe(process.stdin);
			return callback();
		};

		function writeData (iterables, writer, data, encoding, cb) {
			(function write (){
				if(!iterables--){
					return cb();
				};

				if(!writable.write(data)){
					console.log(`${data}\n get by id `);
					writable.once('drain', write);
				};
			})();
		};

		writeData(1, writable, 'Route: services/data-mongoose.js', 'utf8', () => {
			
		});

		res.send(await getDataById(req.params.id))
		
	}catch(err){
		if(err) throw err;
	};
});

app.post('/', async (req, res, next) => {
	try{

		let writable = new stream.Writable({
			highWaterMark: 1
		});

		writable._write = (chunk, encoding, callback) => {
			process.stdout.pipe(process.stdin);
			return callback();
		};

		function writeData (iterables, writer, data, encoding, cb){
			(function write(){
				if(!iterables--){
					return cb();
				};

				if(!writable.write(data)){
					console.log(`${data}, create data`);
					writable.once('drain', write);
				};
			})();
		};

		writeData(1, writable, 'Route: services/data-mongoose.js', 'utf8', () => {

		});

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
		let writable = new stream.Writable({
			highWaterMark: 1
		});

		writable._write = (chunk, encoding, callback) => {
			process.stdout.pipe(process.stdin);
			return callback();
		};

		function writeData (iterabels, writer, data, encoding, cb) {
			(function write(){
				if(!iterabels--){
					return cb();
				};

				if(!writable.write(data)){
					console.log(`${data} update data`)
				}
			})();
		};

		writeData(1, writable, 'Route: services/data-mongoose.js', 'utf8', () => {

		});
		const update = await updateData(req.params.id, req.body)
		res.send({status: 'ok', msg: 'data updated'});
		return update;
	}catch(err){
		if(err) throw err;
	};
});

app.delete('/:id', async (req, res, next) => {
	
	try{
		let writable = new stream.Writable({
			highWaterMark: 1
		});

		writable._write = (chunk, encoding, callback) => {
			process.stdout.pipe(process.stdin);
			return callback();
		};

		function writeData (iterabels, writer, data, encoding, cb){
			(function write (){
				if(!iterabels--){
					return cb();
				};

				if(!writable.write(data)){
					console.log(`${data} delete data`);
					writable.once('drain', write);
				};
			})();
		};

		writeData(1, writable, 'Route: services/data-mongoose.js', 'utf8', () => {

		});

		let remove = await deleteData(req.body);
		res.send({status: 'ok', msg: 'data deleted'});
		return remove;
	}catch(err){
		if(err) throw err;
	};
});

module.exports = app;