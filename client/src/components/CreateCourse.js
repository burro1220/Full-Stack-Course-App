import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//This component provides the "Create Course" screen by rendering a form that allows a user to create a new course.
class CreateCourse extends Component {

    State = {

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

        //Make request
        axios.post('http://localhost:5000/api/courses', { title, description, estimatedTime, materialsNeeded })

            //Upon response
            .then( res => {

                console.log(res)
            })
            .catch( err => {

                console.log(err);
            })
        
    };

    render(){

        //Destructure
        const { title, description, estimatedTime, materialsNeeded } = this.state;

        return (

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
                        <form onSubmit={e => this.CreateCourse(e, title, description, estimatedTime, materialsNeeded)}>
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
                                    <p>By Joe Smith</p>
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
                                        to='/'>
                                        Cancel
                                    </button>
                                </div>
                        </form>
                    </div>
            </div>
        );
    }
};

export default CreateCourse;