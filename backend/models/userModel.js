const mongoose = require('mongoose')
var day = new Date();
console.log(day); // Apr 30 2000
var nextDay = new Date(day);
nextDay.setDate(day.getDate() + 30);
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: 'https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/dumy.jpg?alt=media&token=60cf288b-3e1d-46ad-b774-80eac1bc75f1'
    },
    businessemail: {
      type: String,
      required: true
    },
    userRole: {
      type: String,
      default: 'Admin'
    },
    companyName: {
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


    },
    TrialEnded: {
      type: String,
      default: nextDay

    },
    numberOfSubUsers: {
      type: Number,
      default: 0
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
    payment: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('User', userSchema)
module.exports = User;
