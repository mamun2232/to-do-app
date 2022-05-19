
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

const TaskRow = ({ task, index }) => {
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const { _id, name, desCription } = task

      const deleteHundeler = (id) => {
            fetch(`https://git.heroku.com/damp-fortress-98900.git/task/${id}`, {
                  method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                  toast.success(data.success)
            })

      }
      const complectHendeler = () =>{
            toast.success("Wow! Complet This Task. Please Go Next Task")

      }
      return (
            <>
                  <tr className='text-center'>
                        <td>{index + 1}</td>
                        <td>{name}</td>
                        <td>{desCription}</td>
                        <td><button onClick={complectHendeler} className='primary-btn'>Complect</button></td>
                        <td><button onClick={handleShow} className='btn btn-danger'>Delete</button></td>
                  </tr>




                  <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                              <Modal.Title>Are You sure {name} delete?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>If Deleted, it will not be returned.</Modal.Body>
                        <Modal.Footer>

                              <button onClick={() => deleteHundeler(_id)} className='btn btn-danger'>Confrom Delete</button>
                        </Modal.Footer>
                  </Modal>
            </>

      );
};

export default TaskRow;