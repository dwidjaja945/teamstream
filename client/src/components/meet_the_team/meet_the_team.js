import React, { Component } from 'react';
import defaultPic from '../images/batman-for-facebook.jpg';
import NavBar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import homeBtn from "../images/team-stream-logo.png";
import meetTheTeamData from './meet_the_team_data';
import './meet_team.css';




class MeetTheTeam extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const team = meetTheTeamData.map((item, index) => {
            return (
                <div className='teamDev'>
                    <img className="teamPic" src={item.pic} alt="batman" />
                    <div className="teamBody">
                        <h2>{item.title}</h2>
                        <h3>{item.firstName} {item.lastName}</h3>
                        <p>{item.bio}</p>
                    </div>


                </div>
            )
        })

        return (
            <div>
                <NavBar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
                <div className="meetTeam">
                <h1>Team TeamStream</h1>
                    {team}
                </div>
            </div>
        )
    }
}
export default MeetTheTeam
