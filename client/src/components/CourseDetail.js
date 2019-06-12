import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactMarkDown from "react-markdown";
import UserContext from "./UserContext";


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
        this.handleGetCourse();
        
    };

    //Get Course Data
    handleGetCourse = () => {

        //Request Data
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            
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
            .catch( err => {
              console.log(err);
            })
    }

    handleDeleteCourse = (e, emailAddress, password) => {

      //e.preventDefault();

      //Request Deletion
      axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id,
      
        //Set authorization header
        {
          auth:{
            username: emailAddress,
            password: password
          }
        }
      )
      .then( res => {
        console.log(res);
      })
    }




    render() {

      //Destructure
      const { title, description, estimatedTime, materialsNeeded } = this.state.course;
      const { publishedBy, createdBy } = this.state;


        return(

          <UserContext.Consumer>
            {({ loggedIn, user, password }) => (
            <div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100">
                    
                    {/*Conditionally render update and delete buttons only if user is logged In and user created course*/}
                    {loggedIn && user.id === createdBy?(
                      <span>
                        {/*This component also renders an "Update Course" button for navigating to the "Update Course" screen.*/}
                        <Link 
                          className="button" 
                          to={this.props.match.url + "/update"}>
                          Update Course
                        </Link>
                      
                        {/*The component renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.*/}
                        <Link
                          className="button"
                          to='#'
                          onClick={this.handleDeleteCourse(user.emailAddress, password )}>
                          Delete Course
                        </Link> 
                      </span>
                    ):""}
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
                    <h3 className="course--title">{title}</h3>
                    <p>By {publishedBy}</p>
                  </div>
                  <div className="course--description">
                    
                    {/* Use <ReactMarkdown> component to render the course description property as markdown formatted text. */}
                    <ReactMarkDown source={description}/>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>

                          {/* Use <ReactMarkdown> component to render the materialsNeeded property as markdown formatted text. */}
                          <ReactMarkDown source={materialsNeeded}/>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
            )}
          </UserContext.Consumer>
          
    
    )};
}

export default CourseDetail;