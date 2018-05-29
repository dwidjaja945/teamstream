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
		};


		this.pinMessage = this.pinMessage.bind(this);
		this.deleteMessage = this.deleteMessage.bind(this);
		this.getDataFromServer = this.getDataFromServer.bind(this);

        this.getDataFromServer();
    }

	// componentDidMount() {
	// 	this.getDataFromServer();
	// }

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

	render() {
		const { messageArray, teamCodes } = this.state;
		return (
			<div>
				<Navbar
					refreshMessages={this.getDataFromServer}
					toggleMenu={true}
					teamCodes={teamCodes}
					hamburgerMenu={true}
					url="/bulletin_board"
				/>
				<div className="pinnedMessage" />
				<div className="messageContainer">
					<img className="bulletin-background" src={teamLogo} alt="" />

					<BulletinBoardMessages
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
