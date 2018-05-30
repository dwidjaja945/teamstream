import React, { Component } from "react";
import HamburgerMenu from "./hamburger_menu";
import ToggleMenu from "./toggle_team";
import { Link } from "react-router-dom";
import teamStreamLogo from "./images/asset4.png";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="mainNavBar">
				<div className="mainBtn">
					{this.props.toggleMenu ? (
						<ToggleMenu teamCodes={this.props.teamCodes} toggleAxios={this.props.toggleAxios} />
					) : (
						<Link to={this.props.url}>
							<img className="mainBtnImg" src={this.props.icon} />
						</Link>
					)}
				</div>
				<div className="mainTsLogo">
					<img className="mainNavLogo" src={teamStreamLogo} />
				</div>
				<div className="burgerMenuContainer">
					{this.props.hamburgerMenu ? (
						<div className="burgerMenu">
							<HamburgerMenu />
						</div>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

export default NavBar;
