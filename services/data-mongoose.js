const Modelage = require('../models/data-model');

const getAllData = async () => {
	try{
		let data = await Modelage.find({});
		return data;
	}catch(err){
		if(err) throw err;
	};
};

const getDataById = async (id) => {
	try{
		let dataId = await Modelage.findById({_id: id});
		return dataId;
	}catch(err){
		if(err) throw err;
	};
};

const creataData = async (record) => {
	const data = new Modelage({
		name: record.name,
		mail: record.mail,
		phoneNumber: record.phoneNumber,
		
	});

	try{
		let newage = await data.save({});
		return newage;
	}catch(err){
		if(err) throw err;
	};
};

const updateData = async (id, record) => {
	try{
		let updateData = await Modelage.findById({_id: id});
			updateData.name = record.name;
			updateData.mail = record.mail;
			updateData.phoneNumber = record.phoneNumber;
			await updateData.save({});
			return updateData;
	}catch(err){
		if(err) throw err;
	};
};

const deleteData = async ({id}) => {
	
	try{
		let remove = await Modelage.deleteOne({_id: id});
		return remove;
	}catch(err){
		if(err) throw err;
	};
};

module.exports = {
	getAllData,
	getDataById,
	creataData,
	updateData,
	deleteData
};