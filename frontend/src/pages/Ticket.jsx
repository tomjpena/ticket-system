import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getSingleTicket, closeTicket } from "../features/tickets/ticketSlice"
import { getNotes, addNotes } from "../features/notes/noteSlice"
import { useParams, useNavigate } from "react-router-dom"
import { FaPlus } from "react-icons/fa"
import Modal from 'react-modal'
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    background: '#FFFFFF'
  },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const {ticket, isLoading, isError, message} = useSelector((state) => state.tickets)
  const {user} = useSelector((state) => state.auth)
  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  let ticketStatusColor

  if(ticket.status === 'new') {
    ticketStatusColor = 'success'
  } else if (ticket.status === 'open') {
    ticketStatusColor = 'info'
  } else if (ticket.status === 'closed') {
    ticketStatusColor = 'error'
  }

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
    setNoteText('')
      
    closeModal()  
  }


  if(isLoading || notesIsLoading) {
    return <Spinner />
  }
  
  return (
    <div className="text-left max-w-7xl mx-auto">
      <div className="mx-6">

        <header>
          <BackButton url='/tickets'/>
          <h2 className="text-2xl font-semibold flex justify-between mb-3 mt-6">
            Ticket ID: {ticket._id}
            <span className={`badge badge-outline badge-${ticketStatusColor} justify-self-center w-auto px-6`}>
              {ticket.status}
            </span>
          </h2>
          <h3 className="my-3">
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-us')}
          </h3>
          <h3 className="my-3">Type of issue: {ticket.product}</h3>
          <div className="divider divide-neutral-content"></div> 
          <div className="bg-neutral my-5 rounded-md border border-neutral-content text-md py-3 px-4">
            <h3 className="text-2xl font-semibold mb-4">Description of issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2 className="text-2xl mb-2">Notes</h2>
        </header>

        {ticket.status !== 'closed' && 
        <button className="btn mb-6" onClick={openModal}><FaPlus className="mr-1" />Add Note</button>
        }

        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note">
            <h2 className="text-2xl text-left my-3">Add Note</h2>
            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>X</button>
            <form onSubmit={onNoteSubmit}>
              <div>
                <textarea 
                  name="noteText" 
                  id="noteText" 
                  className="textarea textarea-bordered textarea-md w-full max-w-3xl block mb-5"
                  placeholder="Note text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  >
                </textarea>
              </div>
              <div>
                <button className="btn block" type="submit">Submit</button>
              </div>
            </form>
        </Modal>
        <div className="overflow-y-auto h-96">
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
          ))}

        {ticket.status !== 'closed' && (
          <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
          )}
        </div>
      </div>
    </div>
  )
}
export default Ticket