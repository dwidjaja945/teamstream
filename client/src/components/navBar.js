import React, { Component } from "react";
import HamburgerMenu from "./hamburger_menu";
import { Link } from "react-router-dom";
import teamStreamLogo from "./images/team-stream-type-name.png";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="mainNavBar">
				<div className="mainBtn">
					<Link to={this.props.url}>
						<img className="mainBtnImg" src={this.props.icon} />
					</Link>
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
