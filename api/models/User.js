const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number,
	},
	sex: {
		type: String,
	},
	medications: [
        {
            drugName: String,
            dosage: String,
            frequency: String
        }
    ],
	immunizations: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Immunization'
	}],
	appointments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Appointment'
	}],
	lab_reports: {
		type: [String],
	},
	role: {
		type: String,
		required: true,
		unique: false
	}
});

userSchema.plugin(require('mongoose-findorcreate'));

userSchema.methods.generateJWT = function() {
	return jwt.sign(
		{
			expiresIn: '12h',
			id: this._id,
			email: this.email,
		},
		'secret',
	);
};

module.exports = mongoose.model('User', userSchema);