import React from "react";
import "./styles.css";
import teamLogo from "./images/dylansRowing.jpg";
import {Link} from 'react-router-dom';

export default props => (
	<div className="loginContainer">
		<div className="loginLogoContent">
			<img className="loginTeamLogo" src={teamLogo} />
		</div>
		<div className="loginButtonContent">
			<Link to={`/bulletin_board`} className="loginButtons">
				<span className="btnLog">Login</span>
			</Link>
			<Link to={`/athlete_profile`} className="loginButtons">
				<span className="btnLog">Sign Up</span>
			</Link>
		</div>
	</div>
);
