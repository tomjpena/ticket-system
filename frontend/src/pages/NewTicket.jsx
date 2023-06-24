import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, CssBaseline, Typography, TextField, Button, Box, Select, MenuItem } from "@mui/material"
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

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTicket({product, description}))
    navigate('/tickets')

  }

  if(isLoading) {
    return <Spinner />
  }


  return (

    <Container component="main" maxWidth="xs" sx={{ mt:4 }}>
      <CssBaseline />
      <BackButton url='/tickets'/>
      <Box>
        <Typography component="h1" variant="h4">
          Create a new ticket
        </Typography>
        <Typography component="h2" variant="h6">
          Please fill out the form below
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            value={name}
            disabled
          />
          <Select
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <MenuItem value={'Mobile Device'}>Mobile Device</MenuItem>
            <MenuItem value={'Desktop Device'}>Desktop Device</MenuItem>
            <MenuItem value={'Application'}>Application</MenuItem>
           </Select> 
          <TextField
            fullWidth
            name="description" 
            id="description" 
            placeholder="Please describe the issue in as much detail as possible"
            multiline
            sx={{ mt:1 }}
            onChange={(e) => setDescription(e.target.value)}
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
    </Container>
  )
}
export default NewTicket