import axios from 'axios'
import { connectStorageEmulator } from 'firebase/storage';
import { toast } from 'react-toastify';

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const GetUsers = async (userData) => {

  const response = await axios.get(API_URL + "users", {
    headers: {
      "authorization": userData
    },
  });
  return response.data;

}

const SubUserRegister = async (userData) => {
  const response = await axios.post("/api/users/register", userData)
  if (response.status === 200) {
    toast.success("User Registered Successfully")
  }
  return response.data
}
const authService = {
  register,
  logout,
  login,
  SubUserRegister,
  GetUsers
}

export default authService
