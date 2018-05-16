import React, { Component } from "react";
import MainNav from "./mainNavMenu";
import DropDownNav from "./dropDownMenu";
import BackArrowNav from "./backArrowMenu";
import "./styles.css";

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}

	render() {
		if () {
			return <MainNav />;
		} else {
			return <h1>Hello</h1>;
		}
	}
}

export default NavBar;
