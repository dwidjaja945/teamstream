import React from "react";
import axios from "axios/index";

export default props => {
	const { teamData } = props;

	function getCoach() {
		// console.log("This is dummy data", teamData);
		for (var rosterIndex = 0; rosterIndex < teamData.length; rosterIndex++) {
			if (teamData[rosterIndex].user_level >= 1) {
				var updatedRoster = teamData.splice(rosterIndex, 1);
				teamData.unshift(updatedRoster[0]);
			}
		}
	}
	getCoach();
	const listCoachOnRoster = teamData.map((item, index) => {
		if (item.user_level >= 1) {
			return (
				<div
					key={index}
					className="coach"
					onClick={e => {
						props.getTeammateProfile(item.athlete_id, item.team_id);
					}}
				>
					Coach: {item.first_name} {item.last_name}
				</div>
			);
		} else {
			return;
		}
	});
	const listAthletesOnRoster = teamData.map((item, index, arr) => {
		if (item.user_level === 0) {
			return (
				<div
					key={index}
					className="name"
					onClick={e => {
						props.getTeammateProfile(item.athlete_id, item.team_id);
					}}
				>
					<img src="" alt="" />
					{item.first_name} {item.last_name}
				</div>
			);
		} else {
			return;
		}
	});

	return (
		<div className="theTeamRoster">
			<div className="coachContainer">
				<div className="coachName">{listCoachOnRoster}</div>
			</div>
			<div className="namesContainer">
				<ul className="list-group">{listAthletesOnRoster}</ul>
			</div>
		</div>
	);
};
