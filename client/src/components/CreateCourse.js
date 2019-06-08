import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';

//This component provides the "Create Course" screen by rendering a form that allows a user to create a new course.
class CreateCourse extends Component {

    state = {

        //Initalize empty state
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        validationErrors: []
    }

    //Handle changes to user input
    handleInputChange = e => {
        
        //Grab reference to current input field
        const inputField = e.target;

        //Set state using input's name reference and field value
        this.setState({
            [inputField.name]: inputField.value
        });
    };

    //Handle Creating Course
    handleCreateCourse(e){

        //Prevent default submission
        e.preventDefault();

        //Destructure
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        // const { _id, emailAddress, password } = user;

        // //Make request
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/api/courses',
        //     auth: {
        //         username: emailAddress,
        //         password
        //     },
        //     data: {
        //         user: _id,
        //         title,
        //         description,
        //         estimatedTime,
        //         materialsNeeded
        //     }
        // })
        // //Upon Response
        // .then( res => {

        //         console.log(res)
        //     })
        //     .catch( err => {

        //         console.log(err);
        //     })
        
    };

    handleCancel = e => {
        e.preventDefault();
        this.props.history.push("/courses");
      };

    render(){
        
        //Destructure
        const { title, description, estimatedTime, materialsNeeded } = this.state;

        return (
            <UserContext.Consumer>
                {( {user} ) => (
                    <div className="bounds course--detail">
                        <h1>Create Course</h1>
                            <div>
                                <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                    <div className="validation-errors">
                                        <ul>
                                            <li>Please provide a value for "Title"</li>
                                            <li>Please provide a value for "Description"</li>
                                        </ul>
                                    </div>
                                </div>
                                <form onSubmit={e => this.handleCreateCourse(e, title, description, estimatedTime, materialsNeeded)}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div>
                                                <input 
                                                    id="title" 
                                                    name="title" 
                                                    type="text" 
                                                    className="input-title course--title--input" 
                                                    placeholder="Course title..."
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <p>By {user.firstName} {user.lastName}</p>
                                        </div>
                                            <div className="course--description">
                                                <div>
                                                    <textarea 
                                                        id="description" 
                                                        name="description" 
                                                        className="" 
                                                        placeholder="Course description..."
                                                        onChange={this.handleInputChange}>
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
                                                                type="text" className="course--time--input"
                                                                placeholder="Hours" 
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
                                                                placeholder="List materials..."
                                                                onChange={this.handleInputChange}>
                                                            </textarea>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="grid-100 pad-bottom">

                                            {/* The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route.  */}
                                            <button 
                                                className="button" 
                                                type="submit">
                                                Create Course
                                            </button>

                                            {/* This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses). */}
                                            <button 
                                                className="button button-secondary" 
                                                onClick={this.handleCancel}>
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
};

export default withRouter(CreateCourse);