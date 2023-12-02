
import '../../styles/tournamentForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { createTournament } from '../../../store/tournaments';
import InputForm from '../../../auth/components/inputForm';
import Swal from 'sweetalert2';

const TournamentCreate = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
   


    const [data, setData] = useState({
        img: '',
        name: '',
        desc: '',
        location: '',
        city: '',
        country: '',
        date: '',
        capacity_available: '',
        });

        const onHandleChange = (e) => {
            const { name, value } = e.target;
            setData((prev) => ({
              ...prev,
              [name]: value,
            }));
          };

          const onHandleSubmit = async(e) => {

            e.preventDefault()

            try {
                
                await dispatch(createTournament(data))
                Swal.fire({
                  icon: 'success',
                  title: 'Tournament Created Successfully!',
                  showConfirmButton: false,
                  timer: 1500, 
                });
                navigate('/tournaments')
            } catch (error) {
                console.log(error)
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                });
            }

          }

  return (
    <>
    <div >
      <h2>Create Tournament</h2>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={onHandleSubmit}>
      <div className="mb-3">
          <label htmlFor="imgTournament" className="form-label">img url for Tournament</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="imgTournament" 
          name="img"
          value={data.img}
          onChange={onHandleChange}
         
         
        
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="nameTournament" className="form-label">name for Tournament</label>
          <InputForm
          type="text" 
          className="form-control" 
          id="name" 
          name="name"
          value={data.name}
          onChange={onHandleChange}
          required
          errorMessage='enter a name'
         
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="descTournament" className="form-label">description for Tournament</label>
          <InputForm 
          
          type="text" 
          className="form-control" 
          id="descTournament"
         name="desc"
         value={data.desc}
         onChange={onHandleChange}
         required
         errorMessage='enter a description'
           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="locationTournament" className="form-label">location for Tournament</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="locationTournament"
          name="location"
          value={data.location}
          onChange={onHandleChange}
          errorMessage='enter a location'
          required

           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="cityTournament" className="form-label">city</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="cityTournament" 
          name="city"
          value={data.city}
          onChange={onHandleChange}
          required
          errorMessage='enter a city'
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="countryTournament" className="form-label">country</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="countryTournament" 
          name="country"
          value={data.country}
          onChange={onHandleChange}
         required
         errorMessage='enter a country'
         />
         
        </div>
        <div className="mb-3">
          <label htmlFor="dateTournament" className="form-label">date</label>
          <InputForm
         type="date" 
         className="form-control" 
         id="dateTournament" 
         name="date"
         value={data.date}
         onChange={onHandleChange}
         required
         errorMessage='enter a date'
         />
         
        </div>

        <div className="mb-3">
          <label htmlFor="capacityTournament" className="form-label">capacity available</label>
          <InputForm 
          type="number" 
          className="form-control" 
          id="capacityTournament" 
          name="capacity_available"
          value={data.capacity_available}
          onChange={onHandleChange}
          required
          errorMessage='enter a number'
          />
         
        </div>
        
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
        </div>
    </>
  )
}

export default TournamentCreate
