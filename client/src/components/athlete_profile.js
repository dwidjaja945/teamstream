import React, { Component } from "react";
import "./styles.css";
import athletePic from "./images/athlete.jpg";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
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
		return (
			<div className="profileContainer">
				<Navbar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
				<div className="profile profileTitleContent">
					<span className="profileTitleHeader">Athlete Profile</span>
				</div>
				<div className="profile profilePic">
					<img className="athPic" src={athletePic} />
				</div>
				<div className="profile profileInfo">
					<div className="profileName">
						<span className="athleteName">Name (First, Last)</span>
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
						<span className="profileStatsInfo">Info: Age</span>
						<span className="profileStatsInfo">Info: Height</span>
						<span className="profileStatsInfo">Info: Weight</span>
					</div>
				</div>
				<div className="profile profileFooter">
					<Link to="/fork_nav" className="profileSubmit">
						Submit
					</Link>
				</div>
			</div>
		);
	}
}

export default AthleteProfile;
