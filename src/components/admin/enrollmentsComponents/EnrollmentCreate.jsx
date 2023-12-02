import  { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { getTournaments } from "../../../store/tournaments";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { createEnrollment } from "../../../store/enrollments";
import InputForm from "../../../auth/components/inputForm";
import { getAllUsers } from "../../../store/user";

 const EnrollmentCreate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { tournaments } = useSelector((state) => state.tournaments);

    const { users } = useSelector((state) => state.users);
   

 
    const [selectedData, setSelectedData] = useState({
        tournamentId:'',
        userId: '',
        league: '',
        club: '',
        category: '',
        practice_location: '',

    });

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setSelectedData((prev) => ({
            ...prev,
            //userId: JSON.parse(localStorage.getItem('user'))._id,
            [name]: value,
        }));
    }

    useEffect(() => {
        dispatch(getTournaments());
        dispatch(getAllUsers());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(createEnrollment(selectedData));
            console.log('res', response);
            if (response) {

                Swal.fire({
                    title: 'Enrollment Created successfully',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })

                navigate(`/enrollments-users`);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Error creating Enrollment',
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
      <h2>Create Tournament</h2>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={handleSubmit} >
      
      <div className="mb-3">
          <label htmlFor="idTournament" className="form-label">select tournament</label>
          
          
                <Form.Select
                  aria-label="Select a Tour"
                  className="bg-color rounded-border"
                  onChange={onHandleChange}
                  value={selectedData.tournamentId}
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
                  value={selectedData.userId}
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
          <label htmlFor="league" className="form-label">league</label>
          <InputForm
          type="text" 
          className="form-control" 
          id="leagueEnrollment" 
          name="league"
          value={selectedData.league}
          onChange={onHandleChange}
          required
          errorMessage='enter a league'
         
          
          />
         
        </div>

        <div className="mb-3">
          <label htmlFor="club" className="form-label">club</label>
          <InputForm 
          
          type="text" 
          className="form-control" 
          id="clubEnrollment"
         name="club"
         value={selectedData.club}
         onChange={onHandleChange}
         required
         errorMessage='enter a club'
           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">category</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="categoryEnrollment"
          name="category"
          value={selectedData.category}
          onChange={onHandleChange}
          errorMessage='enter a category'
          required

           />
         
        </div>

        <div className="mb-3">
          <label htmlFor="practice_location" className="form-label">practice location</label>
          <InputForm 
          type="text" 
          className="form-control" 
          id="practiceLocationEnrollment"
          name="practice_location"
          value={selectedData.practice_location}
          onChange={onHandleChange}
          required
          errorMessage='enter a practice location'
          />
         
        </div>
        
    
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
        </div>
    </>
  )
}

export default EnrollmentCreate