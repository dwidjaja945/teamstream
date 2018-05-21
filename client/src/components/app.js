import React, { Component } from "react";
import { Route } from "react-router-dom";
import AddBulletinMessages from "./bulletin_board/add_bulletin_message";
import BulletinBoard from "./bulletin_board/bulletin_board";
import bulletinDummyData from "./bulletin_board/bulletin_dummy_data";
import Login from "./log_in/login";
import Login_Page from "./log_in/login_page";
import ForkNav from "./fork_nav";
import CreateTeam from "./create_team";
import JoinTeam from "./join_team";
import AthleteProfile from "./profile_pages/athlete_profile";
import Roster from "./roster/roster";
import UserIdPw from "./create_user_id_pw";
import NavBar from "./navbar";
import AddAthlete from "./profile_pages/add_athlete";
import CreateProfile from "./profile_pages/create_profile";

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
	// getDataCallback(dataToGet, pathToGoTo, historyPush){
	//     const historyObj = {
	//         pathname: pathToGoTo,
	//         state: dataToGet,
	//     };
	//     historyPush(historyObj)
	// }

	render() {
		return (
			<div className="container">
				<Route exact path="/" component={Login} />

				<Route path="/login_page" component={Login_Page} />
				{/*<Route path='/login_page' render={routeProps =>*/}
				{/*<Login_Page {...routeProps} dataPassCallback={this.getDataCallback.bind(this)}/>} />*/}

				<Route path="/user_id_pw" component={UserIdPw} />

				<Route path="/bulletin_board" component={BulletinBoard} />

				<Route path="/athlete_profile" component={AthleteProfile} />

				<Route path="/roster" component={Roster} />

				<Route path="/fork_nav" component={ForkNav} />

				<Route path="/create_team" component={CreateTeam} />

				<Route path="/join_team" component={JoinTeam} />
				<Route path="/create_profile" component={CreateProfile} />
			</div>
		);
	}
}

export default App;
