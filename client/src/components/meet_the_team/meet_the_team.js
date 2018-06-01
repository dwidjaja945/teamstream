import React, { Component } from 'react';
import defaultPic from '../images/batman-for-facebook.jpg';
import NavBar from "../navbar";
import hamburgerMenu from "../hamburger_menu";
import homeBtn from "../images/team-stream-logo.png";
import meetTheTeamData from './meet_the_team_data';
import gitHubLogo from '../images/github.png';
import teamLogo from '../images/team_stream_logo3x.png';
import './meet_team.css';




class MeetTheTeam extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const team = meetTheTeamData.map((item, index) => {
            return (
                <div className='teamDev' key={index}>
                    <img className="teamPic" src={item.pic} alt="batman" />
                    <div className="teamBody">
                        <h3>{item.title}</h3>
                        <h4>{item.firstName} {item.lastName}</h4>
                        <p>{item.position}</p>
                        <p>{item.quote}</p>
                        <a href={item.bio} target="_blank"><img className="github" src={gitHubLogo} alt="github Logo"/></a>
                        
                    </div>


                </div>
            )
        })

        return (
            <div>
                <NavBar icon={homeBtn} hamburgerMenu={true} url="/bulletin_board" />
                <div className="meetTeam">
                <h1>Team TeamStream</h1>
                <img  className="teamLogo" src={teamLogo} alt=""/>
                    {team}
                </div>
            </div>
        )
    }
}
export default MeetTheTeam
