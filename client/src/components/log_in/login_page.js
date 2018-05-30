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
			email: "keith@keith.com",
			password: "Test123"
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
		const { email, password } = this.state;
		this.loginAxiosCall(email, password);

		// this.setState({
		//     email: "",
		//     password: ""
		// });
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
                // this.props.history.push("/edit_profile");
            } else {
                //ERROR
                console.log(response.data.errors);
            }
        });
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
							<label>Email:</label>
							<input value={email} onChange={this.handleChange} name="email" type="text" />
						</div>
					</div>
					<div className="passwordContainer">
						<div className="passwordLine">
							<label>Password:</label>
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
