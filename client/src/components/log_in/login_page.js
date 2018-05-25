import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../images/blue-chevron-left.png";
import Navbar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import teamLogo from "../images/team-stream-type-name.png";
import "../styles.css";

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "test@test.com",
			password: "test"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}

	handleSubmitForm(event) {
		event.preventDefault();
		// this.props.addItemCallback(this.state);
		// console.log(this.state);
		const { email, password } = this.state;

		if (this.checkPassword() && this.checkEmail()) {
			this.loginAxiosCall(email, password);
		}

		this.setState({
			email: "",
			password: ""
		});
	}

	loginAxiosCall(email, password) {
		const dataToSend = { email, password };
		let path = "/api/login";
		axios.post(`${path}`, dataToSend).then(response => {
			//here is where we redirect
			if (response.data.success) {
				console.log("data from server response: ", response);
				console.log("current props at this time: ", this.props);

				//if success, log them in, take them to bulletin board
				this.props.history.push(response.data.redirect);
				// this.props.history.push("/create_team");
			} else {
				//ERROR
				console.log(response.data.errors);
			}
		});
	}

	checkPassword() {
		const { password } = this.state;

		//Must be between 6 and 32 characters long
		//Must have at least one capital letter
		//Must have at least one lower -case letter
		//Must have at least one number
		//Must start with a letter(lower -case or upper -case)
		const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])([a-z]+|[A-Z]+)(?=.*\d)[a-zA-Z\d]{6,32}$/;

		if (passwordValidation.test(password)) {
			console.log("Password Validated!");
			return true;
		} else {
			//throw error about passwords
			return false;
		}
	}

	checkEmail() {
		const { email } = this.state;

		const emailValidification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (emailValidification.test(email)) {
			console.log("email validated!");
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { email, password } = this.state;

		return (
			<div className="loginInfoContainer">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/" />
				<div className="teamLogoImg">
					<img className="logoImg" src={teamLogo} />
				</div>
				<form className="loginForm">
					<div className="userNameContainer">
						<div className="userNameLine">
							<label>email</label>
							<input value={email} onChange={this.handleChange} name="email" type="text" />
						</div>
					</div>
					<div className="passwordContainer">
						<div className="passwordLine">
							<label>password</label>
							<input value={password} onChange={this.handleChange} name="password" type="text" />
						</div>
					</div>
					<div className="loginBtnContainer">
						<button type="button" onClick={this.handleSubmitForm} className="loginBtn">
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default LogIn;
