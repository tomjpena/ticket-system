import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSingleTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, addNotes } from "../features/notes/noteSlice"
import { useParams, useNavigate } from "react-router-dom"
import { Paper, Typography, TextField, Divider, Box, Modal, Button } from "@mui/material"
import { FaPlus } from 'react-icons/fa'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')  
  const {ticket, isLoading, isError, message} = useSelector((state) => state.tickets)
  const {user} = useSelector((state) => state.auth)
  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    dispatch(getSingleTicket(ticketId))
    dispatch(getNotes(ticketId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  const onTicketClose = () => {
    if(window.confirm('Are you sure you would like to close this ticket?')) {
      dispatch(closeTicket(ticketId))
      toast.success('Ticket has been closed')
      navigate('/tickets')
    }
  }

  //Open and close modal
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  //Submit notes
  const onNoteSubmit = (e) => {
    e.preventDefault()
    let isStaff = false
    if (user.isStaff) {
      isStaff = true
      dispatch(addNotes({noteText, isStaff, ticketId}))
    } else {
      dispatch(addNotes({noteText, isStaff, ticketId}))
    }
      
    closeModal()  
  }


  if(isLoading || notesIsLoading) {
    return <Spinner />
  }
  
  return (

    <div>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <BackButton url='/tickets'/>
        <Typography variant="h5" color="primary" gutterBottom>
          Ticket ID: {ticket._id}
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ mt: 1 }}>
          <strong>Status:</strong> {ticket.status}
        </Typography>
        <Typography variant="body1">
          <strong>Date Submitted:</strong> {new Date(ticket.createdAt).toLocaleString('en-us')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Type of issue:</strong> {ticket.product}
        </Typography>
        <Divider />
        <Typography component="h2" variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
          Description of issue
        </Typography>
        <Typography variant="body2">
          {ticket.description}
        </Typography>
        <Box>
          <Typography component="h2" variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
            Notes
          </Typography>
          <Button onClick={openModal}><FaPlus />Add Notes</Button>
          {notes.map((note) => (
           <Paper sx={{
            backgroundColor: note.isStaff ? '#000000' : '#FFFFFF',
            color: note.isStaff ? '#FFFFFF' : '#000000',
            p: 1,
            mb: 1
            }} key={note._id}>
            <Typography component="h4" >Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</Typography>
            <Typography component="p" variant="body1">{note.text}</Typography>
            <Typography component="p" variant="body1">
              {new Date(note.createdAt).toLocaleString('en-us')}
            </Typography>
          </Paper>
           ))}
        </Box>
        {ticket.status !== 'closed' && (
           <Button onClick={onTicketClose}>Close Ticket</Button>
           )}

        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a Note
            </Typography>
            <Box component="form" noValidate onSubmit={onNoteSubmit}>
              <TextField
              fullWidth
              name="noteText" 
              id="noteText" 
              placeholder="Enter your note here"
              onChange={(e) => setNoteText(e.target.value)}
              multiline
              sx={{ mt:1 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt:2 }}
              >
                Submit
              </Button>
          
            </Box>
          </Box>
        </Modal>
      </Paper>
  
    </div>
  )
}
export default Ticket