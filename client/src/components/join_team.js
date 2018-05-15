import React from "react";
import blueLeftArrow from "./images/blue-chevron-left.png";

export default props => (
	<div className="joinTeamPage">
		<div className="navBackArrow backNav">
			<div className="backArrow">
				<img className="backArrowImg" src={blueLeftArrow} />
			</div>
			<div className="backTsLogo">
				<span className="backNavTitle">Team Stream</span>
			</div>
		</div>
		<div className="joinTeamContainer">
			<div className="jTteamCode">
				<span className="teamCodeTitle">Team Code</span>
			</div>
			<div className="jTcodeNum">
				<span className="codeNum">Code Number Here</span>
			</div>
			<div className="jTcodeBtn">
				<span className="codeBtn">Join!</span>
			</div>
		</div>
	</div>
);
