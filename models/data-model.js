const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const newageSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true
	},
	mail: {
		type: String,
		required: [true, 'Mail is required'],
		trim: true,
		unique: true,
		lowercase: true,
		validate: {
			validator: emailValidator.validate,
			message: (props) => `${props.value} is not a valid email address`
		}
	},
	phoneNumber: {
		type: Number,
		required: true,
		trim: true,
		max: [123456789012-1, 'Max phone number'],
		//mix: [1-123456789012, 'Min phone number']
	}
});

const Modelage = mongoose.model('newage', newageSchema);

module.exports = Modelage;