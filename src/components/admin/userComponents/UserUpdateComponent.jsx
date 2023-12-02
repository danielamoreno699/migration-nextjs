import  { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const UserUpdateComponent = ({ show, setShow, user, submitUpdate }) => {
  const handleClose = () => setShow(false);

  const [data, setData] = useState({
    name: '',
    last_name: '',
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitUpdate(data);
    handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User ID {user && user._id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="update name"
              value={data.name}
              onChange={onHandleChange}
              autoFocus
            
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>last name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="update last name"
              value={data.last_name}
              onChange={onHandleChange}
              
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
         
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UserUpdateComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
   
  }).isRequired,
  submitUpdate: PropTypes.func.isRequired,
};

export default UserUpdateComponent;
