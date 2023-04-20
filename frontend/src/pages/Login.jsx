import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"


const Login = () => {
  // State for all form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Destructuring form data for ease of use
  const {email, password} = formData

  // assign variable to useDispatch
  const dispatch = useDispatch()

  const navigate = useNavigate()

  //assign variable to the auth state with useSelector. Name is defined in store.js
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  // Use effect to login
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

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

  const onSubmit = (e) => {
    e.preventDefault()

    // Gets user data from form
    const userData = {
      email,
      password
    }

    // Dispatch the login function from authSlice
    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }


  return (
    <>
      <section className="mt-20">
        <h1 className="flex items-center justify-center mb-8 text-5xl">
          <FaSignInAlt className="mr-1"/>Login
        </h1>
        <p className="text-3xl mb-20">Please login to submit your ticket</p>
      </section>
      <section className="mx-auto w-3/5">
        <form onSubmit={onSubmit} className="">
          <div className="my-6">
            <input 
              type="email" 
              className="input input-bordered input-md w-full max-w-3xl" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Enter your email"
              required />
          </div>
          <div className="my-6">
            <input 
              type="password" 
              className="input input-bordered input-md w-full max-w-3xl" 
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Enter your password"
              required />
          </div>
          <div className="my-6">
            <button className="btn btn-block btn-info max-w-3xl normal-case">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login