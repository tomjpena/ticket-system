import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import BackButton from "../components/BackButton"


const NewTicket = () => {
  const {user} = useSelector((state) => state.auth)
  const {isError, isSuccess, isLoading, message} = useSelector((state) => state.tickets)

  const name = user.name
  const email = user.email
  const [product, setProduct] = useState('Application')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product, description}))

  }

  if(isLoading) {
    return <Spinner />
  }




  return (
    <>
      <BackButton url='/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" value={name} disabled/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" value={email} disabled/>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Issue type</label>
            <select 
              name="product" 
              id="product" 
              value={product} 
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Mobile Device">Mobile Device</option>
              <option value="Desktop Device">Desktop Device</option>
              <option value="Application">Application</option>
            </select>
          </div>

          <div className="form-group">
          <label htmlFor="description">Issue description</label>
          <textarea 
            name="description" 
            id="description" 
            className="form-control"
            placeholder="Please describe the issue in as much detail as possible"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket