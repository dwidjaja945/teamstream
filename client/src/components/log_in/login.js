import React from "react";
import "../styles.css";
import teamLogo from "../images/dylansRowing.jpg";
import teamStreamLogo from "../images/team-stream-logo.png";
import teamStreamName from "../images/team-stream-type-name.png";
import { Link } from "react-router-dom";
import axios from "axios/index";

export default props => {

    const path='/api/';
    axios.get(path).then( (response) => {
        console.log('This is the response from checking if the user is logged in: ', response);
        if(response.data.success){
            props.history.push(response.data.redirect);
        }else{
            //user not logged in
        }

    });

    return (
        <div className="loginContainer">
            <div className="loginLogoContent">
                <img className="loginTeamLogo" src={teamStreamLogo}/>
                <img className="loginTeamLogo" src={teamStreamName}/>
            </div>
            <div className="loginButtonContent">
                <Link to={`/login_page`} className="loginButtons">
                    <span className="btnLog">Login</span>
                </Link>

                <Link to={`/user_id_pw`} className="loginButtons">
                    <span className="btnLog">Sign Up</span>
                </Link>
            </div>
        </div>
    );
}