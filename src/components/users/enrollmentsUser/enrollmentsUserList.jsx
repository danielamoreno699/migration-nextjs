import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getEnrollmentsByUserId } from '../../../store/enrollments';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import EnrollmentUpdateUser from './enrollmentUpdateUser';
import { updateEnrollment } from '../../../store/enrollments';
import { checkingEmptyFields } from '../../../helpers/EmpValues';
import { deleteEnrollment } from '../../../store/enrollments';
import Swal from 'sweetalert2';

 const EnrollmentsUserList = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
   
    
    const {enrollments} = useSelector((state) => state.enrollments);
    
    console.log('enrollments', enrollments);

    useEffect(() => {
        dispatch(getEnrollmentsByUserId(userId));
        }, [dispatch, userId]);

    

    const onHandleUpdateEnrollment = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setShowModal(true);
        
      }

      const onHandleDelete = (enrollmentId) => {
        console.log(enrollmentId);
        Swal.fire({
          title: 'Delete enrollment',
          text: 'Are you sure you want to delete this enrollment?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await dispatch(deleteEnrollment(enrollmentId));
              Swal.fire('Deleted!', 'The user has been deleted.', 'success');
              
              
              dispatch(getEnrollmentsByUserId(userId));
            } catch (error) {
              console.error('Error deleting user:', error);
              Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
            }
          }
        });
      };

    
      const submitUpdate = async (data) => {
   
        const nonEmptyData = checkingEmptyFields(data);
      
        try {
          if (nonEmptyData) {
            await dispatch(updateEnrollment(selectedEnrollment._id, nonEmptyData));
      
            Swal.fire({
              icon: 'success',
              title: 'User updated successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
      
            setShowModal(false);
            dispatch(getEnrollmentsByUserId(enrollments.userId));
            window.location.reload();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error updating user',
              text: 'An error occurred while updating the user. Please try again.',
            });
          }
        } catch (error) {
          throw new Error('Oops! Something went wrong.');
      
         
        }
      };

  return (
    <>
  <h2>Enrollments User List: ID {userId}</h2>
  {enrollments.map((enrollment) => (
    <Card key={enrollment._id}>
      <Card.Body>
        <Card.Title>{enrollment.userId.name}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {enrollment.userId.email}
          <br />
          <strong>Tournament Name:</strong> {enrollment.tournamentId.name}
          <br />
          <strong>League:</strong> {enrollment.league}
          <br />
            <strong>club:</strong> {enrollment.club}
            <br />
            <strong>category:</strong> {enrollment.category}
            <br />
            <strong>practice_location:</strong> {enrollment.practice_location}
        </Card.Text>
        <Button 
        variant="primary"
        onClick = {() => onHandleUpdateEnrollment(enrollment)} 
        >update</Button>
        <Button variant="danger"
        onClick={() => onHandleDelete(enrollment._id)}
        >delete
        </Button>
      </Card.Body>
    </Card>
  ))}

  <EnrollmentUpdateUser show={showModal} setShow={setShowModal} enrollment={selectedEnrollment} submitUpdate={submitUpdate} />
</>
    

  )
}

export default EnrollmentsUserList
