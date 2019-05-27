import React, { Component } from 'react';


//This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. 
class UpdateCourse extends Component {

    state = {

    }


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
                                        placeholder="Course title..."
                                        value="Build a Basic Bookcase" 
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
                                        placeholder="Course description...">
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
                                                placeholder="Hours" value="14 hours"
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
                                                placeholder="List materials...">
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



