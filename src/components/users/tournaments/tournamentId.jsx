import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getTournamentById } from '../../../store/tournaments';
import '../../styles/tournamentsDetails.css';

 const TournamentId = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
  
    const { tournamentDetails } = useSelector((state) => state.tournaments);
  
    useEffect(() => {
        dispatch(getTournamentById(id));
      }, [dispatch, id]);
    
      const handleGoBack = () => {
        navigate(-1);
      };

      const onHandleCreateEnrollment = () => {
        navigate(`/enrollment-create/${id}`);
      }
  
    return (
        <div className="container">
      <div className="card-container">
        <h1>Tournament Details</h1>
        <Card style={{ width: '40rem', height:'40rem' }}>
          <Card.Img variant="top" src={tournamentDetails.img} alt="Tournament" />
          <Card.Body>
            <Card.Title>{tournamentDetails.name}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {tournamentDetails.desc}
              <br />
              <strong>Location:</strong> {tournamentDetails.location}
              <br />
              <strong>City:</strong> {tournamentDetails.city}
              <br />
              <strong>Country:</strong> {tournamentDetails.country}
              <br />
              <strong>Date:</strong> {tournamentDetails.date}
              <br />
              <strong>Capacity Available:</strong> {tournamentDetails.capacity_available}
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-end mt-3">
          <Button variant="primary" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button variant="success" onClick={onHandleCreateEnrollment}>
            Enroll
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TournamentId
