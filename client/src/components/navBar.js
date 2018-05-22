import React, { Component } from "react";
import HamburgerMenu from "./hamburger_menu";
import { Link } from "react-router-dom";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<div className="mainNavBar">
				<div className="mainBtn">
					<Link to={this.props.url}>
						<img className="mainBtnImg" src={this.props.icon} />
					</Link>
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
