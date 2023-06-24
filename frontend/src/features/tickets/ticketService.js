import axios from 'axios'

const API_URL ='https://ithelpdesk.onrender.com/api/tickets/'

//Create new ticket
const createTicket = async (ticketData, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

//get tickets
const getTickets = async (token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.get(API_URL, config)

  return response.data
}

//get tickets for admin
const getTicketsAdmin = async (token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.get(`https://ithelpdesk.onrender.com/api/admin`, config)

  return response.data
}

//get single ticket
const getSingleTicket = async (ticketId, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}

// close tickets
const closeTicket = async (ticketId, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.put(API_URL + ticketId, {status: 'closed'}, config)

  return response.data
}

// close tickets
const changeTicketStatus = async (ticketId, token) => {
  //config variable to add token to the request
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios.put(API_URL + ticketId, {status: 'open'}, config)

  return response.data
}


const ticketService = {
  createTicket,
  getTickets, 
  getSingleTicket,
  closeTicket,
  getTicketsAdmin,
  changeTicketStatus
}

export default ticketService