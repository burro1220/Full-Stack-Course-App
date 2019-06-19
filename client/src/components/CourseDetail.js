import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import ReactMarkDown from "react-markdown";


// This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. 

class CourseDetail extends Component {

    state = {

        course: {},
        courseId: "",
        createdBy: "",
        publishedBy: "",
        validationErrors: ""
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
                    createdBy: course.User.id
                });                

            })
            //Handle Error
            .catch( err => {
              
              //If Course isn't found redirect to /notfound
              if(err.response.status === 404) {
                this.props.history.push("/notfound");
              
                //Handle request errors
              } else if(err.response.status === 400){

                const error = err.response.data.message;
                    
                    this.setState({
                        validationErrors: error
                    })

              } else {

                //Unhandled Error
                console.log(err);
                this.props.history.push("/error");
                
              }
              
            })
    };

    handleDeleteCourse = (e) => {

      e.preventDefault();

      //Request Deletion
      axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id,
      
        //Set authorization header
        {
          auth:{
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password")
          },
          data:{
            id: this.state.courseId
          }
        }
        
      )
      .then( res => {

        //Redirect user upon deletion
        this.props.history.push("/courses");
        console.log("Course successfully deleted");
      })
      .catch(err => {
        
        const error = err.response.data.message;
        console.log(error);

        this.setState({
          validationErrors: error
        });
      })
    };

    handleCancel = e => {
      e.preventDefault();
      this.props.history.push("/courses");
    };

    render() {

      //Destructure
      const { id, title, description, estimatedTime, materialsNeeded } = this.state.course;
      const { createdBy, validationErrors } = this.state;


        return(
                <div>
                  <div className="actions--bar">
                    <div className="bounds">
                      <div className="grid-100">
                        
                        {/*Conditionally render update and delete buttons only if user is logged In and user created course*/}
                        {(localStorage.getItem("id") !== "") && parseInt(localStorage.getItem("id")) === createdBy?(
                          <span>

                            {/*This component also renders an "Update Course" button for navigating to the "Update Course" screen.*/}
                            <Link 
                              className="button"
                              to={"/courses/" + id + "/update"}>
                              Update Course
                            </Link>
                          
                            {/*The component renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course.*/}
                            <Link
                              className="button"
                              to='#'
                              onClick={e => this.handleDeleteCourse(e, localStorage.getItem("username"), localStorage.getItem("password") )}
                              >
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
                        
                        {/* Conditionally render validation errors */}
                        {validationErrors?(
                                    <div>
                                        <h2 className="validation--errors--label">Validation errors</h2>
                                        <div className="validation-errors">
                                            <ul>
                                                <li>{validationErrors}</li>
                                            </ul>
                                        </div>
                                    </div>
                        ):""}
                        
                        <h3 className="course--title">{title}</h3>
                        <p>By {localStorage.getItem("name")}</p>
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
    
    )};
}

export default withRouter(CourseDetail);