import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getTournaments, getTournamentById, deleteTournament} from '../../../store/tournaments';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const TournamentsListComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tournaments } = useSelector((state) => state.tournaments);

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

 

  const onHandleSeeDetails = (tournamentId) => {
    console.log(tournamentId);
    dispatch(getTournamentById(tournamentId));
    navigate(`/tournaments/${tournamentId}`);
    
  }

  const onHandleDelete = (tournamentId) => {
    console.log(tournamentId);
    Swal.fire({
      title: 'Delete Item',
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
      
        dispatch(deleteTournament(tournamentId))
          .then(() => {
            dispatch(getTournaments());
            Swal.fire('Deleted!', 'The item has been deleted.', 'success'); 
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
            Swal.fire('Error', 'An error occurred while deleting the item.', 'error'); 
          });
      }
    });
  }

  return (
    <>
      <section className="container-section">
        <h1>Tournaments List</h1>
        <div className="tournaments-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
               
                <th>Country</th>
                <th>Capacity Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>



              {tournaments.map((tournament) => (
                <tr key={tournament._id}>
                  <td>{tournament._id}</td>
                  <td>{tournament.name}</td>
                
                  <td>{tournament.country}</td>
                  <td>{tournament.capacity_available}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                     
                      <Button
                        variant="success"
                        className="mr-3"
                        size="sm"
                        onClick={() => onHandleSeeDetails(tournament._id)}
                      >
                        See more info
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="mr-3"
                        onClick={() => onHandleDelete(tournament._id)}
                      >
                        Delete tournament
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}

export default TournamentsListComponent;
