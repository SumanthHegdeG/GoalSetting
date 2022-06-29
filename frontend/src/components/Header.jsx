import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Button, Container, Navbar } from 'react-bootstrap'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container className='d-flex align-items-center py-2'>
          <div className='me-auto text-white'>
            <Link to='/'>GoalSetter</Link>
          </div>
          <div className='m-0'>
            {user ? (
              <>
                <Button onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            ) : (
              <div className='d-flex gap-5'>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>

                <Link to='/register'>
                  <FaUser /> Register
                </Link>
              </div>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
