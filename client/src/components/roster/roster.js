import React, {Component} from "react";
import axios from 'axios';
import athleteRosterData from "./athlete_roster_data";
import homeBtn from "../images/homeBtn.png";
import Navbar from "../navbar";
import DisplayTeam from './displayTeam';
import "./roster.css";

class Roster extends Component{
	constructor(props){
		super(props);

		this.state = {
			teamData: []
		}


	}
	componentWillMount(){
		this.getTeamData();

	}
	getTeamData(){


		let path = "/api/roster";
		axios.get(path).then(resp => {
			console.log("Roster Response: ", resp);

			const {athletes} = resp.data;

			this.setState({
				teamData: resp.data.athletes
			});
		});
	}

	


	render(){
		const {teamData} = this.state;
		console.log('Team roster data: ', this.state);
		return (
			<div className="rosterContainer">
				<Navbar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
				<h1 className="rosterHeader">Roster</h1>
				<DisplayTeam teamData={teamData}/>
			</div>
		);

	}
}
export default Roster;

