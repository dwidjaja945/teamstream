import React, { Component } from "react";
import MainNav from "./mainNavMenu";
import DropDownNav from "./dropDownMenu";
import BackArrowNav from "./backArrowMenu";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);

		console.log(props);
	}

	render() {

		return <h1>Hello</h1>;

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
				<div className="mainNavBar">
					<div className="homeBtn">
						<img className="homeBtnImg" src={homeBtn} />
					</div>
					<div className="mainTsLogo">
						<span className="mainNavTitle">Team Stream</span>
					</div>
					<div className="hamburgerBtn">
						{button}
						<ul>
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
								<Link to="">Log Out</Link>
							</li>
						</ul>
					</div>
				</div>
			);
		}
		return <div>{button}</div>;

	}
}

export default NavBar;
