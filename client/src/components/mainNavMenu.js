import React from "react";
import HamburgerMenu from "./hamburgerMenu";
import homeBtn from "./images/homeBtn.png";
import "./styles.css";

export default props => (
	<div className="mainNavBar">
		<div className="homeBtn">
			<img className="homeBtnImg" src={homeBtn} />
		</div>
		<div className="mainTsLogo">
			<span className="mainNavTitle">Team Stream</span>
		</div>
		<div className="burgerMenu">
			<HamburgerMenu />
		</div>
	</div>
);
