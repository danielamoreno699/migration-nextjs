import  { useState } from "react";

import { useDispatch} from "react-redux";
import Swal from 'sweetalert2';
import { createEnrollment } from "../../../store/enrollments";
import InputForm from "../../../auth/components/inputForm";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const EnrollmentCreateUser = () => {
  const { id } = useParams();
  console.log("Tournament ID:", id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIdParsed = JSON.parse(localStorage.getItem('user'))._id;

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
      tournamentId: id,
      userId: userIdParsed,
      [name]: value,
  }));
}

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

          navigate(`/enrollments-list/${userIdParsed}`);
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
    <div>
      <h1>Create Enrollment</h1>
      <div className="d-flex justify-content-center">
      <form className="w60" onSubmit={handleSubmit} >

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
  )
}

export default EnrollmentCreateUser
