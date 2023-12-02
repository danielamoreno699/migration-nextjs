import '../styles/login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth/thunks';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import  InputForm  from './inputForm'

export const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onHandleGoogleLogin =  () => {
   window.open('http://localhost:3002/api/auth/google/callback', '_self');
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(loginUser(formData));

      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: 'User logged in successfully',
          showConfirmButton: false,
          timer: 1500, 
        });

        navigate('/');
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect email or password.',
        });
      }
    } catch (error) {
      console.error('Error while logging in', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while logging in.',
      });
    }
  };

  return (
    <>
      <div className="center-container">
        <section className="login-section">
          <h1>Login</h1>
          <form onSubmit={onSubmit}>
            <InputForm
              placeholder='Email'
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              onChange={handleInputChange}
              errorMessage='enter your email'
            />
            <InputForm
              placeholder='Password'
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              errorMessage='enter your password'
            />
            <button type='submit'>
              Sign in
            </button>
          </form>
          <div className="p-container">
            <p>
              Dont have an account? <br />
              <span className="line">
                <a href="/auth/register">Register</a>
              </span>

            </p>
            
            <button 
              className='google-btn' 
              type='submit'
              onClick={onHandleGoogleLogin}
              >
                google 
              </button>
          </div>
        </section>
      </div>
    </>
  );
};