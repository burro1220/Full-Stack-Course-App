import React, { Component } from 'react';
import axios from 'axios';


//This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. 
class UpdateCourse extends Component {

    //Initialize state
    state = {

        courseId: "",
        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:"",
        userId: "",
        createdBy:"",
        validationErrors:""
    }

    //Fetch Course info when CourseUpdate Component mounts
    componentDidMount(){
        this.handleGetCourse();
        
    };

    //Handle changes to user input
    handleInputChange = e => {
        
        //Grab reference to current input field
        const inputField = e.target;

        //Set state using input's name reference and field value
        this.setState({
            [inputField.name]: inputField.value
        });

    }

    //Get Course Data
    handleGetCourse = () => {

        //Request Data
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
            
            //Once data is received
            .then( res => {
                
                //Grab desired data reference
                const course = res.data;

                //If User doesn't own course send to /forbidden
                if(course.userId !== parseInt(localStorage.getItem("id"))){

                    this.props.history.push("/forbidden");

                } else {
                    
                    //Set state to current course
                    this.setState({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        userId: course.userId,
                        validationErrors:''
                    })
                }
                
            })
            //Handle Error
            .catch( err => {
              
                //If Course isn't found redirect to /notfound
                if(err.response.status === 404) {
                  this.props.history.push("/notfound");
                
                } else {
  
                  //Unhandled Error
                  console.log(err);
                  this.props.history.push("/error");
                  
                }
                
              });
    };

    //Handle form submission to update course
    handleUpdateCourse = (e, user, password) => {

        //Prevent default
        e.preventDefault();

        //Destructure
        const { id, title, description, estimatedTime, materialsNeeded, userId } = this.state;
        
     
            //Send Data
            axios({
                method: 'put',
                url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
                auth: {
                    username: localStorage.getItem("username"),
                    password: localStorage.getItem("password")
                },
                data: {
                    id,
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    userId
                }
            })
            //Upon Response
            .then( (response) => {

                
                    console.log(response.status);

                    //Log success & redirect user upon Course Edit
                    // console.log(`${this.state.title} has been updated.`);

                    // //Reset local state
                    // this.setState({
                    //     id: "",
                    //     title:"",
                    //     description:"",
                    //     estimatedTime:"",
                    //     materialsNeeded:"",
                    //     userId: "",
                    //     validationErrors:""
                    // });
                    
                    
                    // this.props.history.push("/courses");
                })

                //Handle errors
                .catch( err => {

                    //Bad request errors
                    if(err.response.status === 400){

                        const error = err.response.data.message;
                        
                        //Store validation error in state for display
                        this.setState({
                            validationErrors: error
                        })

                    } else if(err.response.status === 500){

                        //Send unhandled server to /error
                        this.props.history.push("/error");
                    }

                    
                })
            
            
    };

    handleCancel = e => {
        e.preventDefault();
        this.props.history.push("/courses/"  + this.props.match.params.id);
      };

    render(){

        const { title, description, estimatedTime, materialsNeeded, validationErrors } = this.state;

        return(
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                        <div>
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
                            <form onSubmit={e => this.handleUpdateCourse(e, localStorage.getItem("username"), localStorage.getItem("password"), title, description, materialsNeeded, estimatedTime)}>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                className="input-title course--title--input" 
                                                placeholder="Course title"
                                                defaultValue={title}
                                                onChange={this.handleInputChange} 
                                            />
                                        </div>
                                        <p>By {localStorage.getItem("name")}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                className="" 
                                                placeholder="Course description"
                                                value={description}
                                                onChange={this.handleInputChange} >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input 
                                                        id="estimatedTime" 
                                                        name="estimatedTime" 
                                                        type="text" 
                                                        className="course--time--input"
                                                        placeholder="Hours"
                                                        defaultValue={estimatedTime} 
                                                        onChange={this.handleInputChange} 
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea 
                                                        id="materialsNeeded" 
                                                        name="materialsNeeded" 
                                                        className="" 
                                                        placeholder="Materials needed"
                                                        value={materialsNeeded}
                                                        onChange={this.handleInputChange} >
                                                    </textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">

                                    {/* The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.  */}
                                    <button 
                                        className="button" 
                                        type="submit">
                                        Update Course
                                    </button>

                                    {/* This component also renders a "Cancel" button that returns the user to the "Course Detail" screen. */}
                                    <button 
                                        className="button button-secondary"
                                        to='#' 
                                        onClick={this.handleCancel.bind(this)}>
                                        Cancel
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                </div>            
        );
    }
}

export default UpdateCourse;



