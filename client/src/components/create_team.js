import React from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import ForkNav from "./fork_nav";

export default props => (
	<div className="createTeamContainer">
		<Navbar icon={backArrow} hamburgerMenu={false} url="/fork_nav" />
		<div className="cTCodeGenerator">
			<div className="createTeamName">
				<span className="teamName">Team Name</span>
			</div>
			<div className="cGNumberContainer">
				<span className="cGNumber">Code for Team</span>
			</div>
			<Link to="/bulletin_board" className="cGbtnContent">
				<span className="cGDoneBtn">Done</span>
			</Link>
		</div>
	</div>
);
