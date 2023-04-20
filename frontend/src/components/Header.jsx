import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)


  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  

  return (
    <div className="flex flex-col my-1 w-full max-w-7xl mx-auto">
      <header className="navbar bg-base-100">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost normal-case text-lg">IT Help Desk</Link>  
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {user 
            ? (
                <li>
                  <button className="text-lg" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              ) 
            : (
              <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt className='text-2xl'/> Login    
                </Link>
              </li>
              <li>
                  <Link to='/register'>
                    <FaUser className='text-2xl'/> Register   
                  </Link>
              </li>
              </>
              )
           }
          </ul>
        </div>

      </header>
    </div>

  )
}
export default Header