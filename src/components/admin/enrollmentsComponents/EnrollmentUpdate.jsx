import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { checkingEmptyFields } from '../../../helpers/EmpValues';
import Swal from 'sweetalert2';
import { updateEnrollment } from '../../../store/enrollments';
import { getAllUsers } from '../../../store/user';
import { getTournaments } from '../../../store/tournaments';
import Form from "react-bootstrap/Form";
import { useEffect } from 'react';


const EnrollmentUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { tournaments } = useSelector((state) => state.tournaments);

    const { users } = useSelector((state) => state.users);
   
    useEffect(() => {
      dispatch(getTournaments());
      dispatch(getAllUsers());
  }, [dispatch]);

  const [data, setData] = useState({
    tournamentId:'',
    userId: '',
    league: '',
    club: '',
    category: '',
    practice_location: '',
    
    });

    const onHandleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const onHandleSubmit = async(e) => {
      e.preventDefault();
      const nonEmptyData = checkingEmptyFields(data);
      try {
        const response = await dispatch(updateEnrollment(id, nonEmptyData));
        console.log('res', response);
        if (response) {

            Swal.fire({
                title: 'Enrollment Updated successfully',
                icon: 'success',
                confirmButtonText: 'ok'
            })

            navigate(`/enrollments-users`);
        }else{
            Swal.fire({
                title: 'Error',
                text: 'Error updating Enrollment',
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
      <h2>Enrollment Update</h2>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={onHandleSubmit}>
      
      <div className="mb-3">
          <label htmlFor="idTournament" className="form-label">select tournament</label>
          
          
                <Form.Select
                  aria-label="Select a Tour"
                  className="bg-color rounded-border"
                  onChange={onHandleChange}
                  value={data.tournamentId}
                  name="tournamentId"
                  required
                  errorMessage='select a tournament'
                >
                  <option>Pick a Tournament</option>

                  {tournaments.map((tournament) => (
                    <option key={tournament._id} value={tournament._id}>
                      {tournament.name}
                    </option>
                  ))}
                </Form.Select>

         
        </div>
        <div className="mb-3">
          <label htmlFor="idTournament" className="form-label">select User</label>
          
          
                <Form.Select
                  aria-label="Select a Tour"
                  className="bg-color rounded-border"
                  onChange={onHandleChange}
                  value={data.userId}
                  name="userId"
                  required
                  errorMessage='select a user id'
                >
                  <option>Pick a user</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>

         
        </div>

      
      
      <div className="mb-3">
          <label htmlFor="imgTournament" className="form-label">league for enrollment</label>
          <input 
          type="text" 
          className="form-control" 
          id="leagueEnrollment" 
          name="league"
          value={data.league}
          onChange={onHandleChange}
         
        
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="nameTournament" className="form-label">club for enrollment</label>
          <input 
          type="text" 
          className="form-control" 
          id="clubEnrollment"
          name="club"
          value={data.club}
          onChange={onHandleChange}
         
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="descTournament" className="form-label">category </label>
          <input 
          
          type="text" 
          className="form-control" 
          id="categoryEnrollment"
         name="category"
         value={data.category}
         onChange={onHandleChange}
           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="locationTournament" className="form-label">practice location</label>
          <input 
          type="text" 
          className="form-control" 
          id="practiceLocationEnrollment"
          name="practice_location"
          value={data.practice_location}
          onChange={onHandleChange}

           />
         
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
        </div>
    </>
  )
}

export default EnrollmentUpdate