import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBulletinMessages from "./add_bulletin_message";
import BulletinBoard from "./bulletin_board";
import bulletinDummyData from "./bulletin_dummy_data";
import Login from "./login";
import ForkNav from "./forkNav";
import CreateTeam from "./create_team";
import JoinTeam from "./join_team";
import AthleteProfile from "./athlete_profile";
import Roster from "./roster";
import NavBar from "./navbar";

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
				<Route exact path="/" component={Login} />
				<Route path="/bulletin_board" component={BulletinBoard} />
				<Route path="/athlete_profile" component={AthleteProfile} />
				<Route path="/roster" component={Roster} />
				<Route path="/fork_nav" component={ForkNav} />
				<Route path="/create_team" component={CreateTeam} />
				<Route path="/join_team" component={JoinTeam} />
			</div>
		);
	}
}

export default App;
