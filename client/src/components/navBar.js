import React, { Component } from "react";
import HamburgerMenu from "./hamburger_menu";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="mainNavBar">
				<div className="mainBtn">
					<img className="mainBtnImg" src={this.props.icon} />
				</div>
				<div className="mainTsLogo">
					<span className="mainNavTitle">Team Stream</span>
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
