import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getTournamentById } from '../../../store/tournaments';

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

  const onHandleUpdateTournament = (id) => {
    navigate(`/editTournament/${id}`);
  };

  return (
    <div>
      <h1>Tournament Details</h1>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td>Image</td>
            <td>
              <img src={tournamentDetails.img} alt="Tournament" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{tournamentDetails.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{tournamentDetails.desc}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{tournamentDetails.location}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{tournamentDetails.city}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{tournamentDetails.country}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{tournamentDetails.date}</td>
          </tr>
          <tr>
            <td>Capacity Available</td>
            <td>{tournamentDetails.capacity_available}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleGoBack}>
          Go Back
        </Button>
 
        <Button variant="secondary"  className="ml-2"
         onClick={() => onHandleUpdateTournament(tournamentDetails._id)}>
            update Tournament
            </Button>
      </div>
    </div>
  );
};

export default TournamentId;
