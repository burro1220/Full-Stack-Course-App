import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkDown from "react-markdown";


// This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 

class CourseDetail extends Component {

    state = {

        course: {},
        courseId: "",
        createdBy: "",
        publishedBy: "",
    }

    //Fetch Course info when CourseDetail Component mounts
    componentDidMount(){
        this.getCourse();
        
    };

    //Get Course Data
    getCourse = () => {

        //Request Data
        axios.get('http://localhost:5000/api' + this.props.match.url)
            
            //Once data is received
            .then( res => {
                
                //Grab desired data reference
                const course = res.data;

                //Set state to current course
                this.setState({
                    course,
                    courseId: course.id,
                    createdBy: course.User.id,
                    publishedBy: course.User.firstName + " " + course.User.lastName
                })
            })
    }


    render() {

        return(

          <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100"><span>

                    {/*  This component also renders an "Update Course" button for navigating to the "Update Course" screen. */}
                    <Link 
                      className="button" 
                      to={this.props.match.url + "/update"}>
                      Update Course
                    </Link>
                    
                    {/* The component renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. */}
                    <Link 
                      className="button" 
                      to="">Delete Course
                    </Link></span>
                   
                    <Link 
                      className="button button-secondary" 
                      to="/">
                      Return to List
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{this.state.course.title}</h3>
                    <p>By {this.state.publishedBy}</p>
                  </div>
                  <div className="course--description">
                    
                    {/* Use <ReactMarkdown> component to render the course description property as markdown formatted text. */}
                    <ReactMarkDown source={this.state.course.description}/>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{this.state.course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>

                          {/* Use <ReactMarkdown> component to render the materialsNeeded property as markdown formatted text. */}
                          <ReactMarkDown source={this.state.course.materialsNeeded}/>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
    
    )};
}

export default CourseDetail;