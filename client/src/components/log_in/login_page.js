import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../images/blue-chevron-left.png";
import Navbar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import teamLogo from "../images/tsLogo.png";
import "../styles.css";

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userName: "test",
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
		const { userName, password } = this.state;
		this.loginAxiosCall(userName, password);

		this.setState({
			userName: "",
			password: ""
		});
	}

	loginAxiosCall(username, password) {
		const dataToSend = { username, password };
		let path = "/api/login";
		axios.post(`${path}`, dataToSend).then(response => {
			//here is where we redirect
			if (response.data.success) {
				console.log("data from server response: ", response);
				console.log("current props at this time: ", this.props);

				//if success, log them in, take them to bulletin board
				// this.props.history.push(response.data.redirect);
				this.props.history.push('/create_team');


			} else {
				//ERROR
				console.log(response.data.errors);
			}
		});
	}

	render() {
		const { userName, password } = this.state;

		return (
			<div className="loginInfoContainer">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/" />
				<img className="teamLogoImg" src={teamLogo} />
				<form className="loginForm">
					<div className="userNameContainer">
						<div className="userNameLine">
							<label>username</label>
							<input value={userName} onChange={this.handleChange} name="userName" type="text" />
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
