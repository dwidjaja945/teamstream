import React from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";

export default props => (
	<div className="joinTeamPage">
		<Navbar icon={backArrow} hamburgerMenu={false} />
		<div className="joinTeamContainer">
			<div className="jTteamCode">
				<span className="teamCodeTitle">Team Code</span>
			</div>
			<div className="jTcodeNum">
				<span className="codeNum">Code Number Here</span>
			</div>
			<Link to="/bulletin_board" className="jTcodeBtn">
				<span className="codeBtn">Join!</span>
			</Link>
		</div>
	</div>
);
