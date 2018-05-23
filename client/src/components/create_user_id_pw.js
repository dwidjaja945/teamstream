import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./field_inputs";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import teamStream from "./images/tsLogo.png";
import "./styles.css";

class UserIdPw extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			username: "",
			password: ""
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

	addInput(input) {
		this.setState({
			userData: [...this.state.userData, input]
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("this handleSubmit: ", this.state);

		this.addInput(this.state);

		this.reset();
	}

	reset() {
		this.setState({
			email: "",
			username: "",
			password: ""
		});
	}

	render() {
		const { email, username, password } = this.state;

		return (
			<div className="createCredentialsContainer">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/" />
				<img className="createLogo" src={teamStream} />
				<form className="userSignUpContainer" onSubmit={this.handleSubmit}>
					<Field
						className="signUpInput"
						name="email"
						label="Email:"
						type="email"
						value={email}
						onChange={this.handleInputChange}
					/>
					<Field
						className="signUpInput"
						name="username"
						label="Username:"
						type="text"
						value={username}
						onChange={this.handleInputChange}
					/>
					<Field
						className="signUpInput"
						name="password"
						label="Password:"
						type="password"
						value={password}
						onChange={this.handleInputChange}
					/>
					<Link to={"/create_profile"}>
						<button className="signUpButton">Submit</button>
					</Link>
				</form>
			</div>
		);
	}
}

export default UserIdPw;
