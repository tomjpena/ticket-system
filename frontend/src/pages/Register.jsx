import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, CssBaseline, Typography, TextField, Button, Paper, Box } from "@mui/material"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

const Register = () => {
  // State for all form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  // Destructuring form data for ease of use
  const {name, email, password, password2} = formData

  // assign variable to useDispatch
  const dispatch = useDispatch()

  // assign variable to useNavigate
  const navigate = useNavigate()

  //assign variable to the auth state with useSelector. Name of auth state is defined in store.js
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  // handle errors and login success
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    //Redirect when logged in
    if(isSuccess && user) {
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])


  // onChange function used for all form inputs
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  // onSubmit function for form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // If passwords dont match, create toast. 
    // Else, assign form data to userData and dispatch the register from authSlice
    if(password !== password2) {
      toast.error('Password do not match')
    } else {
      const data = new FormData(e.currentTarget);
      const userData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      }
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }


  return (

    <Container component="main" maxWidth="xs" sx={{ mt:10 }}>
      <CssBaseline />
      <Box>
        <Typography component="h1" variant="h5">
          Sign up!
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Re-Enter Password"
            type="password"
            id="password2"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt:2 }}
          >
            Sign Up
          </Button>
          
        </Box>
      </Box>
    </Container>
  )
}
export default Register