const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  businessemail: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    default: 'Admin'
  },
  PhoneNumber: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  companyDomain: {
    type: String,
    required: true,


  },
  TrialEnded: {
    type: String,
    default: Date.now()

  },
  upgraded: {
    type: Boolean,
    default: false
  },
  plan: {
    type: String,
    default: 'trial'
  },
  customerCardName: {
    type: String,
    default: ''
  },
  numberOfSubUsers: {
    type: Number,
    default: 0
  }
  ,
  payment: {
    type: Number,
    default: 0
  },
},
  {
    timestamps: true
  }
);


module.exports = mongoose.model('User2', userSchema)