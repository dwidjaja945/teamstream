import React from "react";
import {Link} from 'react-router-dom';
import blueLeftArrow from "./images/blue-chevron-left.png";
import "./styles.css";

export default props => (
	<div className="forkContainer">
		<div className="backNav">
			<div className="backArrow">
				<img className="backArrowImg" src={blueLeftArrow} />
			</div>
			<div className="backTsLogo">
				<span className="backNavTitle">Team Stream</span>
			</div>
		</div>
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
