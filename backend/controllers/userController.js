const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { use } = require('../routes/goalsRoutes');

//@desc  Register newUser
//@route  POST api/users
//acces  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('please add all fields');
	}
	// check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
	//Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	// create user with password hashpassword
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});
	// check if user created
	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(use._id),
		});
	} else {
		res.status(400);
		throw new Error(' Invalid Data');
	}
});
//@desc  Aunthentic User
//@route  POST api/users/login
//acces  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	//check for user email
	const user = await User.findOne({ email });

	// check the password             password ecrypté  et passwordpar user
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(use._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
});
//@desc  Get User data
//@route  GET api/users/me
//acces  Private
const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
	//const { _id, name, email} = await User.findById(req.user.id)    //allow user to recover his infoms
	const { _id, name, email } = await User.findOne(req.user.name);
	res.status(200).json({
		id: _id,
		name: name,
		email: email,
	});
});
// Generate jwt        // id
const generateToken = (name) => {
	//return jwt.sign({id}, `${process.env.JWT_SECRET_KEY}`,{
	// expiresIn:'30d',
	// })
	return jwt.sign({ name }, `${process.env.JWT_SECRET_KEY}`, {
		expiresIn: '30d',
	});
};
module.exports = {
	registerUser,
	loginUser,
	getMe,
};
