const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
// const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},

	email: {
		type: String,
		trim: true,
		email: true	
	},

	hash_password: {
		type: String,
		required: true
	},

	salt: String,

	created_date: {
		type: Date,
		default: Date.now
	},

	updated_date: Date
});

// Virtual Field for password
userSchema.virtual("password")
.set(function(password) {
	// Input password from the user 
	this._password = password;

	this.salt = uuidv1();

	this.hash_password = this.encryptedPassword(password);
})
.get(function() {
	return this._password;
});

// Using 

userSchema.methods = {

	authenticate: function(plainText) {
		return this.encryptedPassword(plainText) === this.hash_password;
	},

	// encryptedPassword: bcrypt.hash(this.password, this.salt, function(err, hash) {
	// 	// Store hash in your password DB.
	// 	if(!this.password) return "";
	// 	try {
	// 		return hash;
	// 	} catch(err) {
	// 		return "";
	// 	}
	// })
	encryptedPassword: function(password) {
		if(!password) return "";
		try {
			return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex');
		} catch(err) {
			return "";
		}
	}
};


module.exports = mongoose.model("User", userSchema); 