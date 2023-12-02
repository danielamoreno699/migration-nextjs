import '../styles/register.css'
import {  useState} from 'react'

import { useDispatch } from 'react-redux'
import { CreateNewUser } from '../../store/auth/thunks'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import  InputForm  from './inputForm'

export const RegisterNewUser = () => {
  const navigate = useNavigate();



    const [formData, setFormData] = useState({
        img: '',
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

   const dispatch = useDispatch()
    
   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onSubmit = async(event) =>{
    event.preventDefault()
   
    
    try {
    
      const response = await dispatch(CreateNewUser(formData))
      console.log(response)
      if (response) {
        Swal.fire({
    
          icon: 'success',
          title: 'User has been registered successfully',
          text: 'Please login to continue',
          
        })
      
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Error creating user', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while creating the user.',
      });

    }

  }




  return (
    <>
    <div className="center-container">
    <section className='registration-section'> 
        

        <h1>Register</h1>
        <form onSubmit={onSubmit}>

        <InputForm
             type="text"
             id="img"
             name="img"
             label="img"
            
            placeholder="img url"
            
            value={formData.img}
            onChange={handleInputChange}
            errorMessage='should be a valid url'
            />
          
            <InputForm
            type="text"
            id="name"
            name="name"
            label="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="name"
            pattern="[a-zA-Z]{3,16}$"
            errorMessage='name should be longer than 3-16 characters and should not contain special characters'
            />

       


            <InputForm
            type="text"
            id="last_name"
            name="last_name"
            label="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
            placeholder="Last name"
            pattern="[a-zA-Z]{3,16}$"
            errorMessage='last name should be longer than 3-16 characters and should not contain special characters'
            />

            <InputForm
            type="email"
            id="email"
            name="email"
            label="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$"
            errorMessage='should be a valid email'
            />

            <InputForm
            type="password"
            id="password"
            name="password"
            label="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,20}$"
            errorMessage='password should be 8-20 characters long and include at least one number, one lowercase letter, one uppercase letter.'
            />

            <InputForm
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="confirmPassword"
            value={formData.confirmPassword}
            onChange= {(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            placeholder="Confirm Password"
            pattern= {formData.password}
            errorMessage='passwords do not match'
            />
          <button 
            type="submit"
          
          >
                Sign up
          </button>

                <p>
                    Already registered? <br/>
                    <span className="line">
                        <a href="/login">Login</a>
                    </span>

                </p>

        </form>

    </section>
    </div>
    
    </>
  )
}
