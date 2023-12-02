import '../../styles/tournamentForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTournament } from '../../../store/tournaments';
import Swal from 'sweetalert2';
import { checkingEmptyFields } from '../../../helpers/EmpValues';

const TournamentUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


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



          const  onHandleSubmit = async(e) => {
            e.preventDefault();
            const nonEmptyData = checkingEmptyFields(data);
            console.log('nonEmp', nonEmptyData);
            try {
                const response = await dispatch(updateTournament(id, nonEmptyData));
                console.log('res', response);
                if (response) {

                    Swal.fire({
                        title: 'Tournament Updated successfully',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })

                    navigate(`/tournaments`);
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'Error updating Tournament',
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
      <h2>Tournament Update</h2>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={onHandleSubmit}>
      <div className="mb-3">
          <label htmlFor="imgTournament" className="form-label">img url for Tournament</label>
          <input 
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
          <input 
          type="text" 
          className="form-control" 
          id="name" 
          name="name"
          value={data.name}
          onChange={onHandleChange}
         
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="descTournament" className="form-label">description for Tournament</label>
          <input 
          
          type="text" 
          className="form-control" 
          id="descTournament"
         name="desc"
         value={data.desc}
         onChange={onHandleChange}
           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="locationTournament" className="form-label">location for Tournament</label>
          <input 
          type="text" 
          className="form-control" 
          id="locationTournament"
          name="location"
          value={data.location}
          onChange={onHandleChange}

           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="cityTournament" className="form-label">city</label>
          <input 
          type="text" 
          className="form-control" 
          id="cityTournament" 
          name="city"
          value={data.city}
          onChange={onHandleChange}
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="countryTournament" className="form-label">country</label>
          <input 
          type="text" 
          className="form-control" 
          id="countryTournament" 
          name="country"
          value={data.country}
          onChange={onHandleChange}
          />
         
        </div>
        <div className="mb-3">
          <label htmlFor="dateTournament" className="form-label">date</label>
          <input 
         type="date" 
         className="form-control" 
         id="dateTournament" 
         name="date"
         value={data.date}
         onChange={onHandleChange}
         
         />
         
        </div>

        <div className="mb-3">
          <label htmlFor="capacityTournament" className="form-label">capacity available</label>
          <input 
          type="number" 
          className="form-control" 
          id="capacityTournament" 
          name="capacity_available"
          value={data.capacity_available}
          onChange={onHandleChange}
          
          />
         
        </div>
        
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
        </div>
    </>
  );
};

export default TournamentUpdate;
