import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnrollmentById } from '../../../store/enrollments';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const EnrollmentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
const navigate = useNavigate();

  const { enrollmentInf } = useSelector((state) => state.enrollments);

  useEffect(() => {
    dispatch(getEnrollmentById(id));
  }, [dispatch, id]);

  


  const enrollment = enrollmentInf[0];


  if (!enrollment) {
    return <div>No enrollment data available</div>;
  }

    const handleGoBack = () => {
    navigate(-1);
    }

    const onHandleUpdateEnrollment = (id) => {
      navigate(`/edit-enrollments-users/${id}`);
    };

  return (
    <div>
        <h1>Enrollment Details</h1>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>User Name</td>
              <td>{enrollment.userId.name}</td>
            </tr>
            <tr>
              <td>User Last Name</td>
              <td>{enrollment.userId.last_name }</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{enrollment.userId.email}</td>
            </tr>
            <tr>
              <td>Name Tournament</td>
              <td>{enrollment.tournamentId.name }</td>
            </tr>
            <tr>
              <td>League</td>
              <td>{enrollment.league}</td>
            </tr>
            <tr>
              <td>Club</td>
              <td>{enrollment.club}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{enrollment.category}</td>
            </tr>
            <tr>
              <td>Practice Location</td>
              <td>{enrollment.practice_location}</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button variant="secondary" className="ml-2"
          onClick= {() => onHandleUpdateEnrollment(enrollment._id)}
          >
            Update Tournament
          </Button>
        </div>
      </div>
  )
};

export default EnrollmentDetails;
