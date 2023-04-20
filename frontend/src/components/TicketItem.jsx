import { Link } from "react-router-dom"
import { changeTicketStatus } from "../features/tickets/ticketSlice";
import { useDispatch, useSelector } from "react-redux";

const TicketItem = ({ticket}) => {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  let ticketStatusColor

  if(ticket.status === 'new') {
    ticketStatusColor = 'success'
  } else if (ticket.status === 'open') {
    ticketStatusColor = 'info'
  } else if (ticket.status === 'closed') {
    ticketStatusColor = 'error'
  }

  const onAdminOpen = () => {
    if(user.isStaff && ticket.status !== 'closed') {
      dispatch(changeTicketStatus(ticket._id))
    }
  }

  return (
    <div className="grid grid-cols-4 mb-5 gap-5 justify-between items-center bg-neutral rounded mx-5 py-2 px-3">
      <div>{new Date(ticket.createdAt).toLocaleString('en-us')}</div>
      <div>{ticket.product}</div>
      <div className={`badge badge-outline badge-${ticketStatusColor} justify-self-center min-w-min w-1/3 text-bold`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm" onClick={onAdminOpen}>View</Link>
    </div>
  )
}
export default TicketItem