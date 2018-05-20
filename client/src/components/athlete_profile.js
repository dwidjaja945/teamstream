import React, { Component } from "react";
import "./styles.css";
import athletePic from "./images/athlete.jpg";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import backArrow from "./images/blue-chevron-left.png";
import ProfileData from './profile_data';
import homeBtn from "./images/homeBtn.png";

class AthleteProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: "",
			lastName: "",
			age: "",
			bio: "",
			stats: {}
		};
	}

	render() {
		console.log(ProfileData);
		const dataToAppend = ProfileData.map((item, index) => {
			return (
				<div key={index} className="profileContainer">
					<NavBar icon={backArrow} hamburgerMenu={false} />
					<div className="profile profileTitleContent">
						<span className="profileTitleHeader">Athlete Profile</span>

					</div>
					<div className="profile profilePic">
						<img className="athPic" src={athletePic} />
					</div>
					<div className="profile profileInfo">
						<div className="profileName">
							<span className="athleteName">Name: {item.firstName} {item.lastName}</span>
						</div>
						<div className="profileBio">
							<div className="bioTitleContainer">
								<span className="profileBioTitle">Bio</span>
							</div>
							<span className="profileBioInfo">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit totam ab a ullam aperiam
								beatae maxime esse cum facere perferendis!
							</span>
						</div>
						<div className="profileStats">
							<div className="statsTitleContainer">
								<span className="profileStatsTitle">Stats</span>
							</div>
							<span className="profileStatsInfo">Age: {item.age}</span>
							<span className="profileStatsInfo">Weight: {item.weight}</span>
							<span className="profileStatsInfo">Height: {item.height}</span>
							<span className="profileStatsInfo">{item.statInput}: {item.statValue}</span>


						</div>
					</div>
					<div className="profile profileFooter">
						<Link to={"/fork_nav"} className="profileSubmit">
							Submit
						</Link>
					</div>
				</div>
			);
		});
		return dataToAppend;

	}
}

export default AthleteProfile;
