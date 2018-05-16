import React, { Component } from "react";
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
							<Link to="/">Bulletin</Link>
						</li>
						{/* <li>
								<Link to="">Roster</Link>
							</li>
							<li>
								<Link to="">Profile</Link>
							</li>
							<li>
								<Link to="">Athlete/Admin Account</Link>
							</li>
							<li>v
								<Link to="">Calendar</Link>
							</li>
							<li>
								<Link to="">Messaging</Link>
							</li>
							<li>
								<Link to="">Other Team Accounts</Link>
							</li>
							<li>
								<Link to="">Log Out</Link>
							</li> */}
					</ul>
				</div>
			);
		}
		return <div>{button}</div>;
	}
}

export default hamburgerMenu;
