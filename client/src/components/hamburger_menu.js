import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

class hamburgerMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			display: {
                display: 'none',
            },
		};
        this.closePullOut = this.closePullOut.bind(this);
	}
    closePullOut(e){
        this.setState({
            show: false,
        })
        setTimeout( ()=> {
            this.setState({
                display: {
                    display: 'none',
                },
            })
        }, 500);
    }


	render() {
		const { show } = this.state;
        const pullOutClass = show ? 'hamburgerBulletsAnim' : 'closeHamburgersAnim';
        const pullOutDiv = show ?
			<div className="toggleCloseHamburgerDiv" onClick={this.closePullOut.bind(this)}></div> : <span></span>


        const button = (
			<div className="menuBtn" onClick={() => this.setState({
				show: !show,
                display: {
                    display: 'block',
                },
			})}>
				<span className={show ? "menuTop" : ""} />
				<span className={show ? "menuMiddle" : ""} />
				<span className={show ? "menuButtom" : ""} />
			</div>
		);

			return (
				<div className="hamburgerBtn">
					{button}
					<ul className={`hamburgerBullets ${pullOutClass}`} style={this.state.display}>
						<li className="hamburger-li">
							<Link to="/bulletin_board" onClick={this.closePullOut}>Bulletin</Link>
						</li>
						<li className="hamburger-li">
							<Link to="/roster" onClick={this.closePullOut}>Roster</Link>
						</li>
						<li className="hamburger-li">
							<Link to="/athlete_profile" onClick={this.closePullOut}>Profile</Link>
						</li>
						<li className="hamburger-li">
							<Link to="/meet_the_team" onClick={this.closePullOut}>Meet the Team</Link>
						</li>
						{/* <li>
							<Link to="/create_profile">Create Profile</Link>
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
						</li> */}
						<li className="hamburger-li">
							<Link to="/logout">Log Out</Link>
						</li>
					</ul>
					{pullOutDiv}
				</div>
			);
		// return <div>{button}</div>;
	}
}

export default hamburgerMenu;
