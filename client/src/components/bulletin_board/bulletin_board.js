import React, { Component } from "react";
import "./bulletin_board.css";
import BulletinBoardMessages from "./bulletin_board_message";
import AddBulletinMessages from "./add_bulletin_message";
import Navbar from "../navbar";
import dropDown from "../images/double-down.png";
import axios from "axios";
import hamburgerMenu from "../hamburger_menu";
import teamLogo from '../images/team-stream-logo.png';

class BulletinBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageArray: [],
            hasPinned: false,
            teamCodes: [],
            currentTeam_code:null,
            currentTeam_name:null,
        };


        this.pinMessage = this.pinMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);

        this.getDataFromServer();
    }

    // componentDidMount() {
    // 	this.getDataFromServer();
    // }

    axiosToTeammateProfile(athlete_id, team_id) {
        console.log("this.props : ", this.props);
        const path = "/api/teammate_profile";
        const dataToSend = {athlete_id: athlete_id, team_id : team_id};
        axios.post(path, dataToSend).then(resp => {
            const customStatsArray = [];
            for (let statIndex = 0; statIndex < resp.data.user.length; statIndex++) {
                const { stat_id, stat_value, stat_name } = resp.data.user[statIndex];
                customStatsArray.push({ stat_id, stat_value, stat_name });
            }
            resp.data.user[0].customStatsArray = customStatsArray;
            resp.data.user[0].thisAthlete = resp.data.thisAthlete;
            this.props.history.push("/teammate_profile", resp.data.user[0]);
        });
    }

    getDataFromServer(path) {
        path = "/api/bulletin_board";
        axios.get(path).then(response => {
            console.log("BB GET response: ", response);
            if (response.data.success) {
                const messageArray = this.findPinnedMessage(response.data.data);
                this.setState({
                    messageArray: messageArray,
                    teamCodes: response.data.userTeams
                });

                if(this.state.currentTeam_code === null){
                    this.setState({
                        currentTeam_code:response.data.userTeams["0"].team_code,
                        currentTeam_name:response.data.userTeams["0"].team_name,
                    });
                }

            } else {
                this.props.history.push(response.data.redirect);
            }
        });
    }

    findPinnedMessage(dataArray) {
        for (let arrayIndex = 0; arrayIndex < dataArray.length; arrayIndex++) {
            if (dataArray[arrayIndex].pinned > 0) {
                const removedItem = dataArray.splice(arrayIndex, 1);
                dataArray.splice(0, 0, removedItem[0]);
            }
        }
        return dataArray;
    }

    addMessage(message) {
        const path = "/api/bulletin_board";

        const dataToSend = {
            post_text: message
        };

        axios.post(path, dataToSend).then(resp => {
            console.log("BB POST response: ", resp);
            console.log("BB Message insert ID: ", resp.data.data.insertId);

            this.getDataFromServer();
        });
    }

    pinMessage(post_id, pin_level) {
        const path = pin_level > 0 ? "/api/unpin" : "/api/pinned";

        axios.post(path, { post_id }).then(resp => {
            console.log("BB pinned post response: ", resp);

            this.getDataFromServer();
        });
    }

    deleteMessage(post_id) {

        const path = "/api/bulletin_board";
        axios.delete(path, { params: { post_id } }).then(resp => {
            console.log("BB message to delete: ", resp);
            if (resp.data.success) {
                this.getDataFromServer();
            }
        });
    }

    changeTeam(id, name, code){
        const path = "/api/toggle_teams";

        const dataToSend = { team_id: id };
        axios.post(path, dataToSend).then(response => {
            if(response.data.success) {
                console.log("toggleAxios: ", response.data.userTeams);
                this.getDataFromServer();
                this.setState({
                    currentTeam_code:code,
                    currentTeam_name:name,
                });
            }
        });
    }

    render() {
        const { messageArray, teamCodes, currentTeam_code, currentTeam_name } = this.state;

        return (
            <div>
                <Navbar
                    toggleMenu={true}
                    teamCodes={teamCodes}
                    hamburgerMenu={true}
                    toggleAxios={this.changeTeam.bind(this)}
                    url="/bulletin_board"
                />
                <div className="teamNameDisplay">
                    <p className="teamNameText">{currentTeam_name}: {currentTeam_code}</p>
                </div>
                <div className="pinnedMessage" />
                <div className="messageContainer">
                    <img className="bulletin-background" src={teamLogo} alt="" />

                    <BulletinBoardMessages
                        toTeammateProfile={this.axiosToTeammateProfile.bind(this)}
                        pinMessage={this.pinMessage}
                        data={messageArray}
                        deleteBulletinPost={this.deleteMessage}
                    />

                </div>
                <AddBulletinMessages add={this.addMessage.bind(this)} />
            </div>
        );
    }
}
export default BulletinBoard;
