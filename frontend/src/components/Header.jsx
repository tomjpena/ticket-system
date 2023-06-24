import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { CssBaseline, Toolbar, Button, AppBar } from '@mui/material'
import { grey } from '@mui/material/colors';


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const color = grey[50]

  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }  

  return (
    <>
      <CssBaseline />
        <AppBar position="relative">
          <Toolbar style={{ display: "flex", justifyContent: "space-between", pr: '24px' }}>
            <Button
              component={Link} 
              to='/' 
              variant="outlined" 
              style={{ color: color, borderColor: color, borderWidth: '1px' }}
            >
              IT Help Desk
            </Button>
            {user 
              ? (
                  <Button variant="outlined" style={{ color: color, borderColor: color, borderWidth: '1px' }} onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                  </Button>
                  
                ) 
                : (
                  <Button
                    component={Link} 
                    to='/register' 
                    variant="outlined" 
                    style={{ color: color, borderColor: color, borderWidth: '1px' }}
                  >
                    <FaUser /> Register
                  </Button>
                )
            }
          </Toolbar>
        </AppBar>
      </>
  )
}
export default Header