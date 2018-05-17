import React from "react";
import teamLogo from "./images/team-logo.png";
import pinIcon from "./images/pin-icon.png";

export default props => {
	const timeStamp = new Date().toLocaleTimeString();

	const bulletinMessages = props.data.map((item, index) => {
		return (
			<div className="userMessages" key={index}>
				<img className="teamLogo" src={teamLogo} alt="" />
				{item.firstName}
				{item.lastName}
				{timeStamp}
				<div
					className="pin"
					onClick={() => {
						props.pinCallBack(index);
					}}
				>
					<img className="pin" src={pinIcon} alt="" />
				</div>
				<p>{item.message}</p>
			</div>
		);
	});
	return bulletinMessages;
};
