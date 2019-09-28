const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
require("dotenv").config();
const Users = require("../model/users");

exports.signup = async (req, res) => {
	const userExists = await Users.findOne({email: req.body.email});
	if(userExists) return res.status(403).json({
		error: "Eamil already exists!"
	});

	const user = await new Users(req.body); 
	await user.save();
	res.status(200).json({ message: "Successful Signup! Login to continue." });
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	Users.findOne({ email }, (err, user) => {

		if(err || !user) {
			return res.status(401).json({
				error: "User doesn't exists with that email!"
			});
		}

		if(!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email & Password doesn't match!"
			});
		}

		const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);

		res.cookie("tk", token, {expire: new Date() + 9999});

		const {_id, name, email} = user
		return res.json({token, user: {_id, name, email}});

	});
};

exports.signout = (req, res) => {
	res.clearCookie("tk");
	return res.json({message: "Successfully Signout!"});
};

exports.requireSignin = expressjwt({
	secret: process.env.JWT_TOKEN,
	userProperty: "auth"
});