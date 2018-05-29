import React, { Component } from "react";
import "../styles.css";
import athletePic from "../images/athlete.jpg";
import backArrow from "../images/blue-chevron-left.png";
import { Link } from "react-router-dom";
import NavBar from "../navBar";
import hamburgerMenu from "../hamburger_menu";
import homeBtn from "../images/team-stream-logo.png";
import axios from "axios/index";
import ProfileStats from './profile_stats_display';

class TeammateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {...props.location.state};
    }

    render() {
        const {first_name, last_name, weight, height, age, bio, img_url, customStatsArray} = this.state;

        return (
            <div className="profileContainer">
                <NavBar icon={backArrow} hamburgerMenu={true} url="/roster" />
                <div className="profile profileTitleContent">
                    <span className="profileTitleHeader">Athlete Profile</span>
                </div>
                <div className="profile profilePic">
                    <img className="athPic" src={img_url} />
                </div>
                <div className="profile profileInfo">
                    <div className="profileName">
							<span className="athleteName">
								Name: {first_name} {last_name}
							</span>
                    </div>
                    <div className="profileBio">
                        <div className="bioTitleContainer">
                            <span className="profileBioTitle">Bio</span>
                        </div>
                        <span className="profileBioInfo">{bio}
							</span>
                    </div>
                    <div className="profileStats">
                        <div className="statsTitleContainer">
                            <span className="profileStatsTitle">Stats</span>
                        </div>
                        <span className="profileStatsInfo">Age: {age}</span>
                        <span className="profileStatsInfo">Weight: {weight}</span>
                        <span className="profileStatsInfo">Height: {height}</span>
                        <span className="profileStatsInfo">
								<ProfileStats statsArray={customStatsArray}/>
							</span>
                    </div>
                </div>
                <div className="profile profileFooter">
                    <Link to={"/edit_profile"} className="profileEdit">
                        Edit
                    </Link>
                </div>
            </div>
        );
    }
}


export default TeammateProfile;
