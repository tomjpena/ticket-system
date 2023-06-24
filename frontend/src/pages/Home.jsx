import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { login, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material'
import heroBg from "../img/herobg.jpg"

const Home = () => {
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess) {
      navigate('/tickets')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  useEffect(() => {
    if (user) {
      navigate('/tickets')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(login(userData))
  }

  const demoLogin = () => {
    const userData = {
      email: 'tompena',
      password: '123456',
    }
    dispatch(login(userData))
  }

  const demoAdminLogin = () => {
    const userData = {
      email: 'staff',
      password: 'staff',
    }
    dispatch(login(userData))
  }

  if(isLoading) {
    return <Typography>Loading...</Typography>
  }


  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${heroBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: '100'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Typography component="h1" variant="h5">
          Welcome to the Help Desk!
        </Typography>
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Button
            onClick={demoLogin}
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
          >
            Demo Login
          </Button>
          <Button
            onClick={demoAdminLogin}
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Demo Admin Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default Home