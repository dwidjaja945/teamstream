import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./profile_fields";
import "../styles.css";

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: "",
			last_name: "",
			url:'https://komarketing.com/images/2014/08/linkedin-default.png',
			age: "",
			height: "",
			weight: "",
			bio: ""
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
		const { first_name, last_name, age, height, weight, bio, url, } = this.state;
		// const letters = /^[A-Za-z]{2,25}$/;
		// const numbers = /^[0-9]/g;
		// const numberLetters = /^[A-Za-z0-9]{2,36}$/;

		return (
			<form onSubmit={this.handleSubmit}>
				<div className="createAth">
					<h1 className="createAthHeader">Create Athlete Profile</h1>
					<div className="createFieldsDepth">
						<Field
                            placeholder='First Name'
                            className="createFields"
							name="first_name"
							label="First Name:"
							type="text"
							value={first_name}
							onChange={this.handleInputChange}
						/>
						<Field
                            placeholder='Last Name'
                            className="createFields"
							name="last_name"
							label="Last Name:"
							type="text"
							value={last_name}
							onChange={this.handleInputChange}
						/>
						<Field
                            placeholder='Age'
                            className="createFields"
							name="age"
							label="Age:"
							type="number"
							value={age}
							onChange={this.handleInputChange}
						/>
						<Field
                            placeholder='Height'
                            className="createFields"
							name="height"
							label="Height:"
							type="text"
							value={height}
							onChange={this.handleInputChange}
						/>
						<Field
                            placeholder='Weight'
                            className="createFields"
							name="weight"
							label="Weight:"
							type="number"
							value={weight}
							onChange={this.handleInputChange}
						/>
                        <Field
                            placeholder='Image URL'
                            className="createFields"
                            name="url"
                            label="Image Url:"
                            type="text"
                            value={url}
                            onChange={this.handleInputChange}
                        />
						<Field
                            placeholder='Your Bio'
                            className="createFields"
							name="bio"
							label="Bio:"
							type="text"
							value={bio}
							onChange={this.handleInputChange}
						/>
					</div>
				</div>
				<div className="createAthleteBtn">
					<button className="createAthleteBtnSub">Submit</button>
				</div>
			</form>
		);
	}
}
export default CreateProfile;
