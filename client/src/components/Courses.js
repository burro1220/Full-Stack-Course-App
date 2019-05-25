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

                    <div className="grid-33">
                        <a className="course--module course--link" href="course-detail.html">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </a>
                    </div>                

            ))}        
        
            {/* New Course link*/}
            <div className="grid-33">
                <a className="course--module course--add--module" href="create-course.html">
                    <h3 className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                            </svg>New Course</h3>
                </a>
            </div>

        </div>

    
        </div>
    )};
}

export default Courses;
