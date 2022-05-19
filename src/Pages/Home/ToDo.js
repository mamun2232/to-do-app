
import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import './Home.css'
import TaskRow from './TaskRow';
const ToDo = () => {
      const [user] = useAuthState(auth)
      const nameRef = useRef('')
      const desCriptionRef = useRef('')
      const [myTask, setMytask] = useState([])
      useEffect(() => {
            fetch(`https://git.heroku.com/damp-fortress-98900.git/myTask?email=${user?.email}`)
                  .then(res => res.json())
                  .then(data => setMytask(data))
      }, [myTask])


      // added task 

      const addTask = (event) => {
            event.preventDefault()
            const name = nameRef.current.value
            const desCription = desCriptionRef.current.value
            const task = {
                  name: name,
                  desCription: desCription,
                  email: user.email
            }
            fetch('https://git.heroku.com/damp-fortress-98900.git/task', {
                  method: "POST",
                  headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                  },
                  body: JSON.stringify(task)
            })
                  .then(res => res.json())
                  .then(data => {
                        console.log(data);
                        toast.success(data.success)
                        event.target.rest()
                  })

      }


      return (
            <div>



                  <div className="to-do-container">
                        <div className="container">
                              <h3 className='text-center my-3'>Hello {user.displayName} , Wellcome Our To Do App </h3>

                              <div className="row">
                                    <div className="col-lg-8">
                                          <div className="your-task mt-5">
                                                <h3 className='mb-4'>Your added task</h3>
                                                <Table striped bordered hover responsive>
                                                      <thead>
                                                            <tr className='text-center'>
                                                                  <th>No</th>
                                                                  <th>Task Name</th>
                                                                  <th>Description</th>
                                                                  <th>Complect</th>
                                                                  <th>Action</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {
                                                                  myTask.map((task, index) => <TaskRow
                                                                        key={task.id}
                                                                        index={index}
                                                                        task={task}></TaskRow>)
                                                            }

                                                      </tbody>
                                                </Table>
                                          </div>

                                    </div>
                                    <div className="col-lg-4">
                                          <div className="add-task mt-5">
                                                <form onSubmit={addTask}>
                                                      <div className="input-grups">
                                                            <h3>Add a task</h3>

                                                            <input
                                                                  ref={nameRef}

                                                                  className='input-shadow from-control' placeholder='Enter Task' type="text" name="text" id="" required />

                                                            <input
                                                                  ref={desCriptionRef}
                                                                  className='input-shadow mt-3' placeholder='Enter Task Description' type="text" name="" id="" required />



                                                            <input className='primary-btn' type="submit" value="Add" />



                                                      </div>
                                                </form>
                                          </div>

                                    </div>
                              </div>

                        </div>
                  </div>
            </div>
      );
};
export default ToDo;