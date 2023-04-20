import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"


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

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product, description}))
    navigate('/tickets')

  }

  if(isLoading) {
    return <Spinner />
  }




  return (
    <>
      <section className="mt-20">
        <h1 className="mb-8 text-5xl">Create New Ticket</h1>
        <p className="text-3xl mb-20">Please fill out form below</p>
      </section>

      <section className="mx-auto w-3/5 max-w-3xl">
        <div className="my-6">
          <label className="text-left block" htmlFor="name">Name</label>
          <input type="text" className="input input-bordered input-md w-full max-w-3xl" value={name} disabled/>
        </div>

        <div className="my-6">
          <label className="text-left block" htmlFor="email">Email</label>
          <input type="email" className="input input-bordered input-md w-full max-w-3xl" value={email} disabled/>
        </div>

        <form onSubmit={onSubmit}>
          <div className="my-6">
            <label className="text-left block" htmlFor="product">Issue type</label>
            <select 
              className="select select-bordered w-full max-w-3xl block mx-auto"
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

          <div className="my-6">
          <label className="text-left block" htmlFor="description">Issue description</label>
          <textarea 
            name="description" 
            id="description" 
            className="textarea textarea-bordered textarea-md w-full max-w-3xl block mx-auto"
            placeholder="Please describe the issue in as much detail as possible"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
          </div>

          <div className="my-6">
            <button className="btn btn-info btn-block max-w-3xl normal-case">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
export default NewTicket