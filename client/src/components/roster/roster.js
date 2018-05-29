import React, { Component } from "react";
import axios from "axios";
import athleteRosterData from "./athlete_roster_data";
import homeBtn from "../images/team-stream-logo.png";
import Navbar from "../navbar";
import DisplayTeam from "./displayTeam";
import "./roster.css";

class Roster extends Component {
	constructor(props) {
		super(props);

		this.state = {
			teamData: []
		};
	}
	componentWillMount() {
		this.getTeamData();
	}
	getTeamData() {
		let path = "/api/roster";
		axios.get(path).then(resp => {
			if(resp.data.success) {
                console.log("Roster Response: ", resp);

                const {athletes} = resp.data;

                this.setState({
                    teamData: resp.data.athletes
                });
            }else{
                this.props.history.push(resp.data.redirect);
            }
		});
	}

	getTeammateProfile(teammate_id, team_id) {
        const dataToSend = {
            athlete_id: teammate_id,
            team_id
        };

        let path = "/api/teammate_profile";
        axios.post(path, dataToSend).then(resp => {

            if(resp.data.success) {
                console.log("Roster Viewing teammate profile: ", resp);

                //Combine all stats into one array
				const customStatsArray = [];
				for(let statIndex=0; statIndex<resp.data.user.length; statIndex++){
					const {stat_id, stat_value, stat_name} = resp.data.user[statIndex];
					customStatsArray.push({stat_id, stat_value, stat_name})
				}
				resp.data.user[0].customStatsArray = customStatsArray;
				resp.data.user[0].thisAthlete=resp.data.thisAthlete
                this.props.history.push('/teammate_profile', resp.data.user[0]);

            }else{
                console.log("Display team Error: ", resp.data.error)
                this.props.history.push(resp.data.redirect);
            }
        });
    }

	render() {
		const { teamData } = this.state;
		console.log("Team roster data: ", this.state);
		return (
			<div className="rosterContainer">
				<Navbar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
				<h1 className="rosterHeader">Roster</h1>
				<DisplayTeam getTeammateProfile={this.getTeammateProfile.bind(this)} teamData={teamData} />
			</div>
		);
	}
}
export default Roster;
