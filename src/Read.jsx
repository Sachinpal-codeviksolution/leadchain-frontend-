import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'; 

function Read() {
  const [data, setData] = useState([])
  const { id } = useParams();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token", token);

    if (!token) {
      console.error("No token found");
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/task/${id}`, {
          headers: {
            "x-auth-token": `${token}`,
          },
        });

        setData(response.data);
        console.log("Data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [])
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Task</h3>
        <div className='mb-2'>
          <strong>Name: {data.title}</strong>
        </div>
        <div className='mb-2'>
          <strong>price:{data.description}</strong>
        </div>
        <div className='mb-2'>
          <strong>Description: {data.status}</strong>
        </div>
        <Link to="/" className='btn btn-primary ms-3'> Back</Link>
        <Link to="/" className='btn btn-primary ms-3'> Edit</Link>


      </div>
    </div>
  )
}

export default Read
