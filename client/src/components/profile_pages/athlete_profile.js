import React, { Component } from "react";
import "../styles.css";
import athletePic from "../images/athlete.jpg";
import { Link } from "react-router-dom";
import NavBar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import homeBtn from "../images/team-stream-logo.png";

import axios from "axios/index";
import ProfileStats from "./profile_stats_display";

class AthleteProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			first_name: "",
			last_name: "",
			age: "",
			bio: "",
			img_url: "",
			height: "",
			weight: "",
			customStatsArray: []
		};

		this.pullAthleteProfileData();
	}

	pullAthleteProfileData() {
		let path = "/api/athlete_profile";
		axios.get(`${path}`).then(response => {
			if (response.data.success) {
				console.log("data for athlete profile server response: ", response);

				const users = response.data.user;
				const userStatsArray = [];
				for (let userIndex = 0; userIndex < users.length; userIndex++) {
					const { stat_id, stat_name, stat_value } = users[userIndex];
					userStatsArray.push({ stat_id, stat_name, stat_value });
				}

				this.setState({
					first_name: response.data.user[0].first_name,
					last_name: response.data.user[0].last_name,
					age: response.data.user[0].age,
					bio: response.data.user[0].bio,
					img_url: response.data.user[0].img_url,
					height: response.data.user[0].height,
					weight: response.data.user[0].weight,
					customStatsArray: userStatsArray
				});
			} else {
				//ERROR
				console.log(response.data.errors);
				this.props.history.push(response.data.redirect);
			}
		});
	}

	render() {
		const { first_name, last_name, weight, height, age, bio, img_url, customStatsArray } = this.state;

		return (
			<div className="profileContainer">
				<NavBar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
				<div className="profile profileTitleContent">
					<span className="profileTitleHeader">Athlete Profile</span>
				</div>
				<div className="profile profilePic">
					<img className="athPic" src={img_url} />
				</div>
				<div className="profile profileInfo">
					<div className="profileName">
						<span className="athleteName">
							Name: {first_name} {last_name}
						</span>
					</div>
					<div className="profileBio">
						<div className="bioTitleContainer">
							<span className="profileBioTitle">Bio</span>
						</div>
						<span className="profileBioInfo">{bio}</span>
					</div>
					<div className="profileStats">
						<div className="statsTitleContainer">
							<span className="profileStatsTitle">Stats</span>
						</div>
						<div className="statsContained">
							<span className="profileStatsInfo">Age: {age}</span>
							<span className="profileStatsInfo">Weight: {weight}</span>
							<span className="profileStatsInfo">Height: {height}</span>
							<span className="profileStatsInfo">
								<ProfileStats statsArray={customStatsArray} />
							</span>
						</div>
					</div>
				</div>
				<div className="profile profileFooter">
					<Link to={"/edit_profile"} className="profileEdit">
						Edit
					</Link>
				</div>
			</div>
		);
	}
}

export default AthleteProfile;
