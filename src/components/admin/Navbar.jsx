import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch} from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { AiFillFacebook, AiFillGoogleCircle, AiFillPhone,  AiOutlineTwitter, AiTwotoneMail } from 'react-icons/ai';
import '../styles/Navbar.css'
import { logout } from '../../store/auth';


const NavbarAdmin = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();


    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
        
    }

  return (
    <header className="nav-container">

        <Navbar className=" d-flex p-0">
            <nav className="sidebar">

                <div className='sidebar-header'>
                <h3 className="text-center mt-3">Aceclash</h3>
                <p className='flex-column m-3 d-flex'>{`Hello, ${user.email} (${user.role === 'admin' ? 'Admin' : 'User'})`}</p>
                </div>

                <ul className="nav flex-column m-3 d-flex">

                    <li>
                        <a className="nav-link" href="#" onClick={onLogout}>Logout</a>
                    </li>
                    <li>
                        <a className="nav-link" href="/">display users</a>
                    </li>
                    <li>
                        <a className="nav-link" href="/create-user">create user</a>
                    </li>
              
                    <li className="nav-item">
                        <a className="nav-link" href="/createTournament">create Tournament</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/tournaments">display Tournaments</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/enrollments-users">display enrollements of Users</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create-enrollments-users">create enrollment</a>
                    </li>
                </ul>
            <footer className='ml-auto p-2 align-content-lg-end'>
          {/* Contacts */}
                <div className="contacts flex-fill fit-content p-1 ml-auto p-2">
                        <Nav className="m-1 fit-content flex-column m-3 d-flex">
                            <li className="fit-content">
                                 <a href="#" disabled className="fit-content">
                                    {<AiFillPhone className='icon-react'/>}
                                     0.703.1352.411
                                </a>
                            </li>
                            <li  className="fit-content">
                                <a className="fit-content asdw" href="#" disabled>
  

                                 {<AiTwotoneMail className='navbar-icon' />}
                                     aceclash@email.com
                                </a>
                            </li>
                        </Nav>
                </div>

          {/* Socials */}
          <div className="socials fit-content p-1">
              <Nav as="ul" className="m-3 d-flex">
                <Nav.Item as="li">
                  <Nav.Link href="#">
                    {<AiFillFacebook className="react-icon"/> }
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="#">
                    {<AiFillGoogleCircle className="react-icon"/>}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link href="#">
                    {<AiOutlineTwitter className='react-icon'/>}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
        </footer>
     
        </nav>
    </Navbar>
</header>
    
  )
}

export default NavbarAdmin