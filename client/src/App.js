import React from 'react';
import axios from 'axios';


//import components
import Header from './components/Header';
import Courses from './components/Courses';


const data = () => {
  axios.get('http://localhost:5000/api/courses/')
  .then( response => {
    console.log(response);
    return response;
    
  })
};

const info = data();



function App() {
  return (
    <Courses />
  );
}

export default App;
