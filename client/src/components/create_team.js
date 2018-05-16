import React from "react";
import {Link} from 'react-router-dom';
import blueLeftArrow from "./images/blue-chevron-left.png";

export default props => (
	<div className="createTeamContainer">
		<div className="backNav">
			<div className="backArrow">
				<img className="backArrowImg" src={blueLeftArrow} />
			</div>
			<div className="backTsLogo">
				<span className="backNavTitle">Team Stream</span>
			</div>
		</div>
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
