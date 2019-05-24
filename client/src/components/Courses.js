import React, { Component } from "react";
import axios from "axios";

import Header from './Header';


/* This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. 
Each course needs to link to its respective "Course Detail" screen. 
This component also renders a link to the "Create Course" screen.*/

class Courses extends Component {

    //Set state of courses to empty array
    state = {
        courses: []
    };

    //Run when mounted
    componentDidMount() {
        this.getCourses();
    };

    //Get list of courses
    getCourses = () => {

        //Request data
        axios.get('http://localhost:5000/api/courses')

        //Once data is received
        .then( res => {
            const courses = res.data;
            this.setState({ courses })
        });
    }


render() {
    return(
        <div>
            <div className="bounds">
            
            {/* Map over the courses and display data */}
            {this.state.courses.map(course => (

            <h1>{course.title}</h1>


            ))}
            </div>
        </div>
    )};
}

export default Courses;
