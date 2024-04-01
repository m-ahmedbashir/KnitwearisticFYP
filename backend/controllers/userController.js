const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const expressAsyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    companyDomain: req.body.companyDomain,
    plan: req.body.plan,
    customerCardName: req.body.customerCardName,
    payment: req.body.payment,
    userRole: req.body.userRole,
    companyName: req.body.companyName,
    capacity: req.body.capacity,
    TrialEnded: req.body.TrialEnded,
    upgraded: req.body.upgraded,
    url: req.body.url,
    numberOfSubUsers: req.body.numberOfSubUsers,
    businessemail: req.body.businessemail,

  })

  if (user) {
    console.log(user)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      businessemail: user.businessemail,
      userRole: user.userRole,
      companyDomain: user.companyDomain,
      plan: user.plan,
      customerCardName: user.customerCardName,
      payment: user.payment,
      companyName: user.companyName,
      capacity: user.capacity,
      TrialEnded: user.TrialEnded,
      numberOfSubUsers: user.numberOfSubUsers,
      upgraded: user.upgraded,
      url: user.url,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    })
  } else {
    console.log(res.status(400))
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      businessemail: user.businessemail,
      userRole: user.userRole,
      companyDomain: user.companyDomain,
      plan: user.plan,
      customerCardName: user.customerCardName,
      payment: user.payment,
      companyName: user.companyName,
      capacity: user.capacity,
      TrialEnded: user.TrialEnded,
      numberOfSubUsers: user.numberOfSubUsers,
      url: user.url,
      upgraded: user.upgraded,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.find({ businessemail: req.user.businessemail }).select("-password");

  if (user) {
    res.status(200).json(user);
  }

})



const getAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (user) {
      res.status(200).send({
        user
      });
    }

  } catch (error) {

  }
})
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.headers.id);
    if (response) {
      res.status(200).send({
        message: "User Deleted Successfully"
      })
    }
    else {
      res.status(400).send({
        response
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }

});

const addPayment = asyncHandler(async (req, res) => {

})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
  getAllUser
}
