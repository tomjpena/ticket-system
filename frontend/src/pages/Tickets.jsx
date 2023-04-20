import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, getTicketsAdmin } from "../features/tickets/ticketSlice"
import { Link } from "react-router-dom"
import { reset } from "../features/tickets/ticketSlice"
import Spinner from "../components/Spinner"
import TicketItem from "../components/TicketItem"


const Tickets = () => {
  const {tickets, isLoading} = useSelector((state) => state.tickets)
  const {user} = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(reset())
  },[dispatch])
  
  useEffect(() => {
    if(user.isStaff) {
      dispatch (getTicketsAdmin())
    } else {
      dispatch (getTickets())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  if(isLoading) {
    return <Spinner />
  }

  if(user.isStaff) {
    return (
      <>
      <h1 className="text-5xl my-20">Admin Dashboard</h1>

        <div className="max-w-[70vw] items-center grow mx-auto overflow-y-auto h-96">
          <div className="grid grid-cols-4 mb-5 gap-5 justify-between items-center bg-neutral rounded mx-5 py-2">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
          {tickets.length > 1 ? tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket}/>
            )) : <Spinner />}
        </div>

      
    </>
    )
  } else {
    return (
      <>
        <h1 className="text-5xl my-20">Dashboard</h1>
  
        <div className="flex justify-center">
  
          <div className="grow-0 ml-auto">
            <div className="card w-80 bg-neutral shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Need help?</h2>
                <p>Create a ticket so that our team of experts can get to work on your issues right away!</p>
                  <h1 className="card-actions justify-end">
                    <Link to='/tickets/new-ticket' className="btn btn-info">Create Ticket</Link>
                  </h1>
              </div>
            </div>
          </div>
  
          <div className="max-w-[70vw] items-center grow mx-auto overflow-y-auto h-96">
            <div className="grid grid-cols-4 mb-5 gap-5 justify-between items-center bg-neutral rounded mx-5 py-2">
              <div>Date</div>
              <div>Product</div>
              <div>Status</div>
              <div></div>
            </div>
            {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket}/>
              ))}
          </div>
  
        </div>
      </>
    )
  }

}
export default Tickets