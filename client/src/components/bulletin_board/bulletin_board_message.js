import React from "react";
import teamLogo from "../images/team-logo.png";
import pinIcon from "../images/pin-icon.png";

export default props => {
	console.log("This is the props in bulletin: ",props.data)

	const bulletinMessages = props.data.map((item, index) => {

		const {first_name, last_name, post_text, timestamp, team_name, pinned, post_id, athlete_id} = item;

		const pinnedClass= pinned > 0 ? 'userMessages pinned' : 'userMessages';

		return (
			<div className={pinnedClass} key={index}>
				<img className="teamLogo" src={teamLogo} alt="" />
				{first_name} 
				{last_name} 
				{timestamp} 
				<div
					className="pin"
					onClick={() => {
						props.pinCallBack(post_id, pinned);
					}}
				>
					<img className="pin" src={pinIcon} alt="" />
				</div>
				<div className="deleteBulletinMessage" onClick= {()=>{
					props.deleteBulletinPost(post_id);
				}}
				>
					x
				</div>
				<p>{post_text}</p>
			</div>
		);
	});
	console.log("This is the props in bulletin: ",props.data)
	return bulletinMessages;
};
