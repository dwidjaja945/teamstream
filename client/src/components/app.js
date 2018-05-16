import React, { Component } from "react";
import AddBulletinMessages from "./addBulletinMessage";
import BulletinBoard from "./bulletinBoard";
import bulletinDummyData from "./bulletinDummyData";
import Login from "./login";
import ForkNav from "./forkNav";
import CreateTeam from "./create_team";
import JoinTeam from "./join_team";
import AthleteProfile from "./athlete_profile";
import Roster from "./roster";
import NavBar from "./navBar";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bulletinDummyData: []
		};
	}
	componentDidMount() {
		this.getRosterData();
	}

	getRosterData() {
		this.setState({
			bulletinDummyData
		});
	}

	render() {
		return (
			<div className="container">
				<NavBar />
				{/* <Login /> */}
				{/* <AthleteProfile /> */}
				{/* <BulletinBoard /> */}
				{/* <ForkNav /> */}
				{/* <CreateTeam /> */}
				{/* <JoinTeam /> */}
				{/* <Roster /> */}
			</div>
		);
	}
}

export default App;
