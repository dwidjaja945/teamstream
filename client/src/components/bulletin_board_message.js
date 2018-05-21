import React from "react";
import teamLogo from "./images/team-logo.png";
import pinIcon from "./images/pin-icon.png";

export default props => {

	const bulletinMessages = props.data.map((item, index) => {

		const {first_name, last_name, post_text, timestamp, team_name, pinned} = item;

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
						props.pinCallBack(index);
					}}
				>
					<img className="pin" src={pinIcon} alt="" />
				</div>
				<p>{post_text}</p>
			</div>
		);
	});
	return bulletinMessages;
};
