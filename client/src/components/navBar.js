import React, { Component } from "react";
import { Link } from "react-router-dom";
import homeBtn from "./images/homeBtn.png";
import "./styles.css";

class NavBar extends Component {
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

// class NavBar extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			menuOpen: false
// 		};

// 		this.navMenu = this.navMenu.bind(this);
// 	}

// 	navMenu() {
// 		this.setState({
// 			menuOpen: true
// 		});
// 	}

// 	render() {
// 		console.log("This is our current state", this.state.menuOpen);
// 		const { menuOpen } = this.state;

// 		return (
// 			<div className="mainNavBar">
// 				<div className="homeBtn">
// 					<img className="homeBtnImg" src={homeBtn} />
// 				</div>
// 				<div className="mainTsLogo">
// 					<span className="mainNavTitle">Team Stream</span>
// 				</div>
// 				<div className="menuToggle" onClick={this.navMenu}>
// 					<input type="checkbox" />
// 					<span />
// 					<span />
// 					<span />
// 					<ul className="menu">
// 						<a href="#">
// 							<li>Bulletin</li>
// 						</a>
// 						<a href="#">
// 							<li>Roster</li>
// 						</a>
// 						<a href="#">
// 							<li>Messaging</li>
// 						</a>
// 						<a href="#">
// 							<li>Calendar</li>
// 						</a>
// 						<a href="#">
// 							<li>Profile</li>
// 						</a>
// 						<a href="#">
// 							<li>Athlete/Admin Account</li>
// 						</a>
// 						<a href="#">
// 							<li>Log Out</li>
// 						</a>
// 					</ul>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default NavBar;
