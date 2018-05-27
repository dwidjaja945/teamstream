import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./profile_fields";
import "../styles.css";

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: "ketih",
			last_name: "silman",
			age: "56",
			height: "62",
			weight: "99",
			bio:'',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInputChange(event) {
		const { value, name } = event.target;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.addAthlete(this.state);
	}

	render() {
		const { first_name, last_name, age, height, weight, bio } = this.state;
		// const letters = /^[A-Za-z]{2,25}$/;
		// const numbers = /^[0-9]/g;
		// const numberLetters = /^[A-Za-z0-9]{2,36}$/;

		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<h1>This is where user creates their profile</h1>
					<Field
						name="first_name"
						label="First Name"
						type="text"
						value={first_name}
						onChange={this.handleInputChange}
					/>
					<Field
						name="last_name"
						label="Last Name"
						type="text"
						value={last_name}
						onChange={this.handleInputChange}
					/>
					<Field name="age" label="Age" type="number" value={age} onChange={this.handleInputChange} />
					<Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange} />
					<Field
						name="weight"
						label="Weight"
						type="number"
						value={weight}
						onChange={this.handleInputChange}
					/>
                    <Field
                        name="bio"
                        label="Bio"
                        type="text"
                        value={bio}
                        onChange={this.handleInputChange}
                    />
					<Link to={`/athlete_profile`} className="loginButtons">
						<span className="btnLog">Create Profile</span>
					</Link>
				</div>
				<button className="btnLog">Submit</button>
			</form>
		);
	}
}
export default CreateProfile;
