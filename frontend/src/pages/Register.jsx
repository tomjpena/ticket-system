import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser } from "react-icons/fa"
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
      navigate('/')
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
  const onSubmit = (e) => {
    e.preventDefault()

    // If passwords dont match, create toast. 
    // Else, assign form data to userData and dispatch the register from authSlice
    if(password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit} >
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={name} 
              onChange={onChange}
              placeholder="Enter your name"
              required />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Enter your email"
              required />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Enter your password"
              required />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password2" 
              value={password2} 
              onChange={onChange}
              placeholder="Re-Enter your password"
              required />
          </div>
          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Register