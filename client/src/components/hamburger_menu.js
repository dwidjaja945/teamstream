import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./styles.css";

class hamburgerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			logoutRedirect:'/',
		};
	}

	logoutOnClick(){
		console.log('clicked loggout');

		const path = '/api/logout';
		axios.get(path).then( (response) => {
			console.log('This is the response from logging out: ', response);

			if(response.data.success){
				//data was properly sent to server.
				this.setState({
					logoutRedirect: response.data.redirect,
				});
			}else{
				//data failed, need to handle it
			}

		})

	}

	render() {
		const { show, logoutRedirect} = this.state;

		const button = (
			<div className="menuBtn" onClick={() => this.setState({ show: !show })}>
				<span />
				<span />
				<span />
			</div>
		);

		if (show) {
			return (
				<div className="hamburgerBtn">
					{button}
					<ul className="hamburgerBullets">
						<li>
							<Link to="/bulletin_board">Bulletin</Link>
						</li>
						<li>
							<Link to="/roster">Roster</Link>
						</li>
						<li>
							<Link to="/athlete_profile">Profile</Link>
						</li>
						<li>
							<Link to="/create_profile">Create Profile</Link>
						</li>
						<li>
							<Link to="">Athlete/Admin Account</Link>
						</li>
						<li>
							<Link to="">Calendar</Link>
						</li>
						<li>
							<Link to="">Messaging</Link>
						</li>
						<li>
							<Link to="">Other Team Accounts</Link>
						</li>
						<li>
							<Link to={logoutRedirect} onClick={this.logoutOnClick.bind(this)}>Log Out</Link>
						</li>
					</ul>
				</div>
			);
		}
		return <div>{button}</div>;
	}
}

export default hamburgerMenu;
