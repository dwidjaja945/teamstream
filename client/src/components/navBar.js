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
				<div className="homeBtn">
					<img className="homeBtnImg" src={this.props.icon} />
				</div>
				<div className="mainTsLogo">
					<span className="mainNavTitle">Team Stream</span>
				</div>
				{this.props.hamburgerMenu ? (
					<div className="burgerMenu">
						<HamburgerMenu />
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

export default NavBar;

//<NavBar icon="athlete" hamburgerMenu={true}

{
	/* <div className="backNav">
	<div className="backArrow">
		<img className="backArrowImg" src={blueLeftArrow} />
	</div>
	<div className="backTsLogo">
		<span className="backNavTitle">Team Stream</span>
	</div>
</div>;

<div className="mainNavBar">
	<div className="homeBtn">
		<img className="homeBtnImg" src={dropDownArrow} />
	</div>
	<div className="mainTsLogo">
		<span className="mainNavTitle">Team Stream</span>
	</div>
	<div className="burgerMenu">
		<HamburgerMenu />
	</div>
</div> */
}
