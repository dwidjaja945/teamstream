import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./styles.css";


class CreateProfile extends Component{
    render(){
        return(
            <div>
                <h1>This is where user creates their profile</h1>
                <Link to={`/athlete_profile`} className="loginButtons">
                    <span className="btnLog">Create Profile</span>
                </Link>
            </div>
        )
    }
}
export default CreateProfile;