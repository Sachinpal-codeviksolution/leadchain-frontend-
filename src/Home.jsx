import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Added Cookies import

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token",token);
    if (!token) {
      console.error("No token found");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/task/all", {
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
  }, []);

console.log("data", data);
return (
  <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
    <h1>List of users</h1>
    <div className='w-75 rounded bg-white border shadow p-4'>
      <div className='d-flex justify-content-end'>
        <Link to="/create" className='btn btn-success'>Add+  </Link>
      </div>
      <table className='table table-stripend'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/read/${item._id}`} className='btn btn-info m-2'>View</Link>
                    <Link to={`/update/${item._id}`} className='btn btn-success m-2'>Edit</Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  </div>
)
}


export default Home
