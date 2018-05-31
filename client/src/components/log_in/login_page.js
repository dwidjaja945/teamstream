import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../images/blue-chevron-left.png";
import Navbar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import teamLogo from "../images/asset_4_3x.png";
import "../styles.css";
import ErrorModal from '../error_modal';

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		let email='';
		if(typeof props.location.state === 'object'){
			email=props.location.state.email;
		}

		this.state = {
			email: email,
			password: "",
            errors:'',
            onCloseModal:null,
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
				this.props.history.push(response.data.redirect);
			} else {
				this.setState({
					errors: "Email or password are incorrect, please try again",
				})

			}
		});
	}

    closeModal(){
        this.setState({
            errors:'',
        })
    }

	render() {
		const { email, password, onCloseModal, errors } = this.state;
        let openModal = false;
        if(errors){
            openModal=true;
        }

		return (
			<div className="loginInfoContainer">
                <ErrorModal onCloseModal={onCloseModal} errors={errors} openModal={openModal} closeModal={this.closeModal.bind(this)}/>
				<Navbar icon={backArrow} hamburgerMenu={false} url="/" />
				<div className="teamLogoImg">
					<img className="logoImg" src={teamLogo} />
				</div>
				<form className="loginForm">
					<div className="userNameContainer">
						<div className="userNameLine">
							<label>Email:</label>
							<input value={email} onChange={this.handleChange} name="email" type="email" />
						</div>
					</div>
					<div className="passwordContainer">
						<div className="passwordLine">
							<label>Password:</label>
							<input value={password} onChange={this.handleChange} name="password" type="password" />
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
