import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { FaTicketAlt } from "react-icons/fa"
import heroBg from "../img/herobg.jpeg"

const Home = () => {
  const {user} = useSelector((state) => state.auth)

  return (
    <div>
      <div className="hero min-h-[92vh]" style={{ backgroundImage: `url(${heroBg})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="hero-overlay bg-opacity-25"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-7 text-5xl font-bold">Welcome to the Help Desk!</h1>
            {user
            ? (
              <div className="flex items-center justify-center mb-8 text-2xl">
                <Link to='../tickets' className="btn">
                  <FaTicketAlt className='inline-block mr-2'/> Dashboard   
                </Link>
              </div>
            )
            : (
            <>
              <p className="mb-5">Login to get help with your issue</p>
              <p> Don't have an account?</p>
              <Link to='/register' className="link link-secondary">Register Now</Link>
            </>
            )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home