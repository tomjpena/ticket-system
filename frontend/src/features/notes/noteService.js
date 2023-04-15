import axios from "axios";

const API_URL = '/api/tickets/'

//get notes
const getNotes = async (ticketId, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.get(API_URL + ticketId + '/notes', config)

  return response.data
}

// add note
const addNotes = async (noteText, ticketId, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.post(API_URL + ticketId + '/notes',
  {
    text: noteText
  }, 
  config)

  return response.data
}

const noteService = {
  getNotes,
  addNotes
}

export default noteService