import React from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import "./styles.css";

export default props => (
	<div className="forkContainer">
		<Navbar icon={backArrow} hamburgerMenu={false} url="/" />
		<div className="forkButtonContent">
			<Link to="/create_team" className="forkButtons">
				<span className="btnFork">Create Team</span>
			</Link>
			<Link to="/join_team" className="forkButtons">
				<span className="btnFork">Join Team</span>
			</Link>
		</div>
	</div>
);
