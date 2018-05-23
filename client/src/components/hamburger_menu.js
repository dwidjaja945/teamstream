import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

class hamburgerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
	}

	render() {
		const { show } = this.state;

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
						{/* <li>
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
						</li> */}
						<li>
							<Link to="/logout">Log Out</Link>
						</li>
					</ul>
				</div>
			);
		}
		return <div>{button}</div>;
	}
}

export default hamburgerMenu;
