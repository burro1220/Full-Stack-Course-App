import React, { Component } from 'react';
import axios from 'axios';
import UserContext from './UserContext';


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

                //Set state to current course
                this.setState({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded,
                    userId: course.userId,
                    createdBy: course.User.firstName + ' ' + course.User.lastName,
                    validationErrors:''
                })
            })
    };

    //Handle form submission to update course
    handleUpdateCourse = (e, user, password) => {

        //Prevent default
        e.preventDefault();

        //Destructure
        const { id, title, description, estimatedTime, materialsNeeded, userId } = this.state;
        
        if(description === ''){
            this.setState({
                validationErrors: "A description must be entered"
            })
        } 
        else if(title === ''){
            this.setState({
                validationErrors: "A title must be entered"
            })
        }
        else{
            //Send Data
            axios({
                method: 'put',
                url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
                auth: {
                    username: user.emailAddress,
                    password: password
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
            .then( res => {

                    this.setState({
                        id: "",
                        title:"",
                        description:"",
                        estimatedTime:"",
                        materialsNeeded:"",
                        userId: "",
                        createdBy:"",
                        validationErrors:""
                    });
                    
                    //Redirect user upon Course Edit
                    this.props.history.push("/courses");
                })
                .catch( err => {

                    const error = err.response.data.message;
                    
                    this.setState({
                        validationErrors: error
                    })
                })
            }
            
    };

    handleCancel = e => {
        e.preventDefault();
        this.props.history.push("/courses");
      };

    render(){

        const { title, description, estimatedTime, materialsNeeded, createdBy } = this.state;

        return(
            <UserContext.Consumer>
                { ({ user, password, validationErrors }) => (
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
                                <form onSubmit={e => this.handleUpdateCourse(e, user, password, title, description, materialsNeeded, estimatedTime)}>
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
                                            <p>By {createdBy}</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                                                <textarea 
                                                    id="description" 
                                                    name="description" 
                                                    className="" 
                                                    placeholder="Course description"
                                                    defaultValue={description}
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
                                                            defaultValue={materialsNeeded}
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
                )}
            </UserContext.Consumer>
            
        );
    }
}

export default UpdateCourse;



