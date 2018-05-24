import React from "react";
import "../styles.css";
import teamLogo from "../images/dylansRowing.jpg";
import teamStreamLogo from "../images/team-stream-logo.png";
import teamStreamName from "../images/team-stream-type-name.png";
import { Link } from "react-router-dom";

export default props => (
	<div className="loginContainer">
		<div className="loginLogoContent">
			<img className="loginTeamLogo" src={teamStreamLogo} />
			<img className="loginTeamLogo" src={teamStreamName} />
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
