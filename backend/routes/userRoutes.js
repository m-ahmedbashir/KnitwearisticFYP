const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  deleteUser,
  getAllUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/users', protect, getMe)
router.post('/register', registerUser)
router.delete("/deleteuser", protect, deleteUser)
router.get("/getallusers", protect, getAllUser);

module.exports = router
