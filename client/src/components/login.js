import React from "react";
import "./styles.css";
// import teamLogo from "./images/dyansRowing.jpg";
import { Link } from "react-router-dom";

export default props => (
	<div className="loginContainer">
		<div className="loginLogoContent">
			{/* <img className="loginTeamLogo" src={} /> */}
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
