import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTournaments, getTournamentById } from '../../../store/tournaments';



 const TournamentsListUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tournaments } = useSelector((state) => state.tournaments);
    console.log('tournaments', tournaments);
    
  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

 const onHandleSeeDetails = (tournamentId) => {
    console.log(tournamentId);
    dispatch(getTournamentById(tournamentId));
    navigate(`/tournament-details/${tournamentId}`);
    
  }

  return (
    <>
    <h1>Tournaments List</h1>
    {tournaments.map((tournament) => (
      <Card key={tournament._id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" alt='img'/>
        <Card.Body>
          <Card.Title>{tournament.name}</Card.Title>
          <Card.Text>
            Country: {tournament.country} <br />
            Capacity Available: {tournament.capacity_available}
          </Card.Text>
          <Button variant="primary" onClick={() => onHandleSeeDetails(tournament._id)}>
            Check Details
          </Button>
        </Card.Body>
      </Card>
    ))}
  </>
    )
}

export default TournamentsListUser
