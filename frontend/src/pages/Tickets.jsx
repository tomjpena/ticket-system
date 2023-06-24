import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getTickets, getTicketsAdmin, changeTicketStatus } from "../features/tickets/ticketSlice"
import { reset } from "../features/tickets/ticketSlice"
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Paper, Link } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import Spinner from "../components/Spinner"


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

  const onAdminOpen = (ticket) => {
    if(user.isStaff && ticket.status !== 'closed') {
      dispatch(changeTicketStatus(ticket._id))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (

    user.isStaff ? 
      ( <>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
              Admin Dashboard
            </Typography>
            
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody> 
                {tickets
                ? (
                  <>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket._id}>
                          <TableCell>{new Date(ticket.createdAt).toLocaleString('en-us')}</TableCell>
                          <TableCell>{ticket.product}</TableCell>
                          <TableCell>{ticket.status}</TableCell>
                          <TableCell> 
                            <Link component={RouterLink} to={`/ticket/${ticket._id}`} onClick={() => onAdminOpen(ticket)}>View</Link>
                          </TableCell>
                        </TableRow>
                    ))}
                  </>
                ) 
                : (
                  <Typography component="h2" variant="h6">
                    No tickets
                  </Typography>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>)  :
        (<>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
              Tickets
            </Typography>
            <Typography component="h2" variant="h6">
              Need help? Create a ticket so our team of experts can help!
            </Typography>
    
            <Link href='/tickets/new-ticket' sx={{ textDecoration:"none" }} >Create Ticket</Link>
    
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody> 
                {tickets
                ? (
                  <>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket._id}>
                          <TableCell>{new Date(ticket.createdAt).toLocaleString('en-us')}</TableCell>
                          <TableCell>{ticket.product}</TableCell>
                          <TableCell>{ticket.status}</TableCell>
                          <TableCell> 
                            <Link component={RouterLink} to={`/ticket/${ticket._id}`} onClick={() => onAdminOpen(ticket)}>View</Link>
                          </TableCell>
                        </TableRow>
                    ))}
                  </>
                ) 
                : (
                  <Typography component="h2" variant="h6">
                    No tickets
                  </Typography>
                )}
              </TableBody>
            </Table>
          </Paper>
      
        </>)
    

    
    )
  }

export default Tickets