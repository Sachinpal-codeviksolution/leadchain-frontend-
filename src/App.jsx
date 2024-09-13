import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
