import React, { Component } from "react";
import "./styles.css";
import athletePic from "./images/athlete.jpg";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import backArrow from "./images/blue-chevron-left.png";
import ProfileData from './profile_data';

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
					<Navbar icon={backArrow} hamburgerMenu={false} />
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
						<Link to="/fork_nav" className="profileSubmit">
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

// <div>
// 	<nav className="navbar" role="navigation" aria-label="main navigation">
// 		<div className="profileNav">
// 			<a className="button is-primary">Back</a>
// 			<span>Team Stream</span>
// 			<a className="button is-primary">Done</a>
// 		</div>
// 		<section className="hero is-light">
// 			<div className="hero-body">
// 				<div className="container">
// 					<h1 className="title is-1 has-text-centered">Athlete Profile</h1>
// 				</div>
// 			</div>
// 		</section>
// 	</nav>
// 	<section className="section">
// 		<div className="container">
// 			<figure className="image is-3by2">
// 				<img src={athletePic} alt="An Athelete Runner" />
// 			</figure>
// 		</div>
// 	</section>
// 	<section className="section">
// 		<div className="container">
// 			<h1 className="title is-3 has-text-centered">Name(first, last)</h1>
// 			<h2 className="subtitle is-3">Bio</h2>
// 			<p>
// 				Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsum distinctio
// 				reiciendis ab libero aspernatur, sunt voluptatum laboriosam nulla itaque!
// 			</p>
// 		</div>
// 	</section>
// 	<section className="section">
// 		<div className="container">
// 			<h1 className="subtitle is-3">Stats</h1>
// 			<p>Info: Age</p>
// 			<p>Info: Height</p>
// 			<p>Info: Weight</p>
// 		</div>
// 	</section>
// 	<section className="section">
// 		<div className="container">
// 			<h1 className="has-text-centered">Team Info(from Code)</h1>
// 			<div className="buttons is-centered">
// 				<a className="button is-primary is-rounded">Create Team</a>
// 			</div>
// 		</div>
// 	</section>
// </div>
