import React from "react";
import "./styles.css";
import teamLogo from "./images/dylansRowing.jpg";

export default props => (
	<div className="loginContainer">
		<div className="loginLogoContent">
			<img className="loginTeamLogo" src={teamLogo} />
		</div>
		<div className="loginButtonContent">
			<div className="loginButtons">
				<span className="btnLog">login</span>
			</div>
			<div className="loginButtons">
				<span className="btnLog">Sign Up</span>
			</div>
		</div>
	</div>
);
