import React from 'react';
import axios from 'axios';
import './App.css';


const data = () => {
  axios.get('http://localhost:5000/api/courses')
  .then( response => {
    console.log(response);
    return response;
    
  })
};

const info = data();



function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
