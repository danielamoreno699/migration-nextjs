import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch} from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { AiFillFacebook, AiFillGoogleCircle, AiFillPhone,  AiOutlineTwitter, AiTwotoneMail } from 'react-icons/ai';
import '../styles/Navbar.css'
import { logout } from '../../store/auth';
import { useNavigate } from 'react-router-dom';


 const NavbarUser = () => {
 
    const user = useSelector((state) => state.auth.user);
    const userDataString = JSON.parse(localStorage.getItem('user'));
    const userId = user ? userDataString._id : null;

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    <a className="nav-link" href="/">display tournaments</a>
                </li>
                <li>
                    <a className="nav-link" href="/enrollment-create-nav">create enrollment</a>
                </li>
                <li>
                <Link className="nav-link" to={`/enrollments-list/${userId}`}>
            Display Enrollments
              </Link>
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

export default NavbarUser