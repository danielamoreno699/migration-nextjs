import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import InputForm from '../../../auth/components/inputForm';
import '../../styles/tournamentForm.css'
import { createUserAdmin } from '../../../store/user';

import Swal from 'sweetalert2';

 const UserCreate = () => {
  
    const roles = ['admin', 'user']
   
    const [formData, setFormData] = useState({
        img: '',
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
      });
  

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        };


    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(createUserAdmin(formData));
            console.log('res', response);
            if (response) {

                Swal.fire({
                    title: 'User Created successfully',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })

                navigate(`/`);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error creating User',
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            }
        } catch (error) {
            throw new error('Oops some error ocurred');
        }
    }
  
  
    return (
    <>
    <div >
      <h2>Create user</h2>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={onHandleSubmit}>
      

        <div className="mb-3">
          <label htmlFor="nameTournament" className="form-label">image of user (optional)</label>
          <InputForm
          type="text"
          id="img"
          name="img"
          className="form-control" 
          placeholder="img url"
          value={formData.img}
          onChange={handleInputChange}
          errorMessage='should be a valid url'
            />
         
        </div>

        <div className="mb-3">
          <label htmlFor="descTournament" className="form-label">name</label>
          <InputForm
            type="text"
            className="form-control" 
            id="name"
            name="name"  
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="name"
            pattern="[a-zA-Z]{3,16}$"
            errorMessage='name should be longer than 3-16 characters and should not contain special characters'
            />
         
        </div>

        <div className="mb-3">
          <label htmlFor="locationTournament" className="form-label">last name</label>
          <InputForm
            type="text"
            className="form-control" 
            id="last_name"
            name="last_name"  
            value={formData.last_name}
            onChange={handleInputChange}
            required
            placeholder="Last name"
            pattern="[a-zA-Z]{3,16}$"
            errorMessage='last name should be longer than 3-16 characters and should not contain special characters'
            />
         
        </div>

        <div className="mb-3">
          <label htmlFor="cityTournament" className="form-label">email</label>
          <InputForm
            type="email"
            className="form-control" 
            id="email"
            name="email"   
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$"
            errorMessage='should be a valid email'
            />

         
        </div>

        <div className="mb-3">
          <label htmlFor="nameTournament" className="form-label">role</label>
          <Form.Select
                  aria-label="Select a Tour"
                  className="bg-color rounded-border"
                  onChange={handleInputChange}
                  value={formData.role}
                  name="role"
                  required
                  errorMessage='select a role'
                >
                  <option>Pick a role</option>

                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>

         
        </div>

        <div className="mb-3">
          <label htmlFor="countryTournament" className="form-label">password</label>
          <InputForm
            type="password"
            id="password"
            name="password"
            className="form-control" 
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Password"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,20}$"
            errorMessage='password should be 8-20 characters long and include at least one number, one lowercase letter, one uppercase letter.'
            />
         
        </div>
        <div className="mb-3">
          <label htmlFor="dateTournament" className="form-label">confirm password</label>
          <InputForm
            type="password"
            className="form-control" 
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange= {(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            placeholder="Confirm Password"
            pattern= {formData.password}
            errorMessage='passwords do not match'
            />

        </div>

       
        
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
        </div>
    </>
  )
}

export default UserCreate
