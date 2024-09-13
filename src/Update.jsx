import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();  
  const [values, setValues] = useState({
    title: "",
    description: "",
    status: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/task/' + id)
      .then(res => {
        console.log("Fetched data:", res.data);
        setValues(res.data); 
      })
      .catch(err => console.log("Error fetching data:", err));
  }, [id]);

  const handlerUpdate = (event) => {
    event.preventDefault();
    
    const updatedData = {
      title: values.title,
      description: values.description,
      status: values.status
    };

    console.log("Updating data:", updatedData);

    axios.put('http://localhost:8080/task/' + id, updatedData)
      .then(res => {
        console.log("Update successful:", res.data);
        navigate('/');
      })
      .catch(err => console.log("Error updating data:", err));
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update Task</h1>
        <form onSubmit={handlerUpdate}>
          <div className='mb-2'>
            <label htmlFor="title">Title: </label>
            <input 
              type="text" 
              name='title' 
              className='form-control' 
              placeholder='Enter title' 
              value={values.title} 
              onChange={e => setValues({ ...values, title: e.target.value })} 
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="status">Status: </label>
            <input 
              type="text" 
              name='status' 
              className='form-control' 
              placeholder='Complete/Incomplete' 
              value={values.status} 
              onChange={e => setValues({ ...values, status: e.target.value })} 
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="description">Description: </label>
            <input 
              type="text" 
              name='description' 
              className='form-control' 
              placeholder='Enter Description' 
              value={values.description} 
              onChange={e => setValues({ ...values, description: e.target.value })} 
            />
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/" className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
