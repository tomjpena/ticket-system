import axios from 'axios'

const API_URL = '/api/users'

//Register user
const register = async (userData) => {
  //Make a post request using axios, passing the API url and userdata passed from authSlice
  const response =  await axios.post(API_URL, userData)

  // if the response has the data
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)

  try {
  if(response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    return response.data
  }
  } catch (error) {
    console.erorr(error)
    throw error
  }

  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login
}

export default authService