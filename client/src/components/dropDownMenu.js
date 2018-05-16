import React from "react";
import dropDownArrow from "./images/double-down.png";
import HamburgerMenu from "./hamburgerMenu";
import "./styles.css";

export default props => (
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
	</div>
);
