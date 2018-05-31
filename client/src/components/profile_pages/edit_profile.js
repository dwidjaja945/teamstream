import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./profile_fields";
import AddNewInputs from "./add_new_input";
import "../styles.css";
import axios from "axios/index";

class EditProfile extends Component {
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

		this.initialNumberOfStats = null;
		this.pullAthleteProfileData();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addNewInput = this.addNewInput.bind(this);
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

				this.initialNumberOfStats = response.data.user.length;
			} else {
				//ERROR
				console.log(response.data.errors);
				this.props.history.push(response.data.redirect);
			}
		});
	}
	addNewInput(event) {
		event.preventDefault();

		const newCustomInput = {
			inputName: "inputName",
			stat_name: "",
			valueName: "valueName",
			stat_value: ""
		};

		this.setState({ customStatsArray: [...this.state.customStatsArray, newCustomInput] });
	}

	handleInputChange(event) {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	}

	submitAthleteInput() {
		let redirect = "/athlete_profile";

		const path = "/api/edit_athlete_stats";
		axios.post(path, this.state).then(response => {
			console.log("Updating profile response: ", response);

			if (response.data.success) {
				console.log("data for update-profile info response: ", response);
				// updateExistingStats();
			} else {
				//ERROR
				console.log(response.data.errors);
			}
		});

		this.props.history.push(redirect);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("This is the handleSubmit: ", this.state);

		this.submitAthleteInput();
	}
	navBack(e) {
		e.preventDefault();
		this.props.history.push("/athlete_profile");
	}
	joinTeam(e) {
		e.preventDefault();
		this.props.history.push("/join_team");
	}
	createTeam(e) {
		e.preventDefault();
		const userExists = {
			userExists: true
		};
		this.props.history.push("/create_team", userExists);
	}

	render() {
		const { first_name, last_name, age, height, bio, img_url, weight, customStatsArray } = this.state;
		console.log("edit profile current state: ", this.state);

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="createAth">
						<h1 className="createAthHeader">Edit Athlete Profile</h1>
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
                                placeholder='Your Bio'
								className="createFields"
								name="bio"
								label="Bio:"
								type="text"
								value={bio}
								onChange={this.handleInputChange}
							/>

							<AddNewInputs addNewInput={this.addNewInput} customStatsArray={customStatsArray} />
						</div>
					</div>
					<div className="createJoinTeamButtons">
							<button className="createAthleteBtnSub" onClick={this.joinTeam.bind(this)}>
								Join Team
							</button>
							<button className="createAthleteBtnSub" onClick={this.createTeam.bind(this)}>
								Create Team
							</button>
					</div>
					<div className="createAthleteBtn">
						<button className="createAthleteBtnSubmit">Submit</button>
						<button className="createAthleteBtnCancel" onClick={this.navBack.bind(this)}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	}
}
export default EditProfile;
