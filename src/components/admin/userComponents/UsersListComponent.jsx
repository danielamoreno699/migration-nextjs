import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { getAllUsers } from '../../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import UserUpdateComponent from './UserUpdateComponent';
import { updateUser, deleteUser } from '../../../store/user';
import { checkingEmptyFields } from '../../../helpers/EmpValues';

import Swal from 'sweetalert2';



const UsersListComponent = () => {
  
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onHandleUpdateUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    
  };

  const submitUpdate = async (data) => {
   
    const nonEmptyData = checkingEmptyFields(data);
  
    try {
      if (nonEmptyData) {
        await dispatch(updateUser(selectedUser._id, nonEmptyData));
  
        Swal.fire({
          icon: 'success',
          title: 'User updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
  
        setShowModal(false);
        dispatch(getAllUsers());
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

  const onHandleDelete = (userId) => {
    console.log(userId);
    Swal.fire({
      title: 'Delete user',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteUser(userId));
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          
          // Fetch users after a successful delete
          dispatch(getAllUsers());
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire('Error', 'An error occurred while deleting the user.', 'error');
        }
      }
    });
  };
  
  
  

  return (
    <>
      <section className="container-section">
        <h1>Users List</h1>
        <div className="users-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Button
                        variant="primary"
                        className="mr-3"
                        onClick={() => onHandleUpdateUser(user)}
                      >
                        Update User
                      </Button>

                      <Button
                        variant="danger"
                        className="mr-3"
                        onClick={() => onHandleDelete(user._id)}
                      >
                        Delete User
                      </Button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>

      <UserUpdateComponent show={showModal} setShow={setShowModal} user={selectedUser} submitUpdate={submitUpdate}  />
    </>
  );
};

export default UsersListComponent;
