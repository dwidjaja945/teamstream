import React, { Component } from "react";

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
			<section className="section">
				<div className="container">
					<h1 className="title">User Creation</h1>
					<button />
				</div>
			</section>
		);
	}
}

export default AthleteProfile;
