import React, { Component } from "react";
import athletePic from "./images/athlete.jpg";

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
			<div>
				<section className="hero is-light">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1 has-text-centered">Athlete Profile</h1>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<figure className="image is-3by2">
							<img src={athletePic} alt="An Athelete Runner" />
						</figure>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<h1 className="title is-3 has-text-centered">Name(first, last)</h1>
						<h2 className="subtitle is-3">Bio</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ipsum distinctio
							reiciendis ab libero aspernatur, sunt voluptatum laboriosam nulla itaque!
						</p>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<h1 className="subtitle is-3">Stats</h1>
						<p>Info: Age</p>
						<p>Info: Height</p>
						<p>Info: Weight</p>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<h1 className="has-text-centered">Team Info(from Code)</h1>
						<div className="buttons is-centered">
							<a className="button is-primary is-rounded">Create Team</a>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default AthleteProfile;
