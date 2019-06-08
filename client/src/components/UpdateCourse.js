import React, { Component } from 'react';
import axios from 'axios';


//This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. 
class UpdateCourse extends Component {

    //Initialize state
    state = {

        title:"",
        description:"",
        estimatedTime:"",
        materialsNeeded:""
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
        axios.get('http://localhost:5000/api' + this.props.match.url)
            
            //Once data is received
            .then( res => {
                
                //Grab desired data reference
                const course = res.data;

                //Set state to current course
                this.setState({
                    title: course.title,
                    description: course.description,
                    estimatedTime: course.estimatedTime,
                    materialsNeeded: course.materialsNeeded
                })
            })
    };

    render(){

        return(

            <div className="bounds course--detail">
            <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="title" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder={this.state.title}
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
                                to='/' >
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



