import React, { Component } from "react";
import "./styles.css";
import athletePic from "./images/athlete.jpg";
import leftArrow from "./images/chevron-left.png";
import blueLeftArrow from "./images/blue-chevron-left.png";

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
				<div className="backNav">
					<div className="backArrow">
						<img className="backArrowImg" src={blueLeftArrow} />
					</div>
					<div className="backTsLogo">
						<span className="backNavTitle">Team Stream</span>
					</div>
				</div>
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
					<div className="profileSubmit">Submit</div>
				</div>
			</div>
		);
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
