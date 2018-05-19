import React, { Component } from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import ForkNav from "./fork_nav";

class CreateTeam extends Component {
	constructor(props) {
		super(props);
	}

	codeGenerator() {
		let newCode = "";

		for (let i = 0; i < 6; i++) {
			let codeChoice = Math.floor(Math.random() * 2 + 1);
			let code;

			if (codeChoice === 1) {
				let randomLetters = Math.floor(Math.random() * 26 + 65);

				code = String.fromCharCode(randomLetters);
			} else {
				code = Math.floor(Math.random() * 9);
			}
			newCode += code;
		}
		return newCode;
	}

	render() {
		return (
			<div className="createTeamContainer">
				<Navbar icon={backArrow} hamburgerMenu={false} url="/fork_nav" />
				<div className="cTCodeGenerator">
					<div className="createTeamName">
						<span className="teamName">Team Name</span>
					</div>
					<div className="cGNumberContainer">
						<span className="cGNumber">{this.codeGenerator()}</span>
					</div>
					<Link to="/bulletin_board" className="cGbtnContent">
						<span className="cGDoneBtn">Done</span>
					</Link>
				</div>
			</div>
		);
	}
}

export default CreateTeam;
