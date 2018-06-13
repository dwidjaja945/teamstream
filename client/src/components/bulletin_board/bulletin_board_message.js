import React, { Component } from "react";
import UnpinModal from "./unpin_modal";
import teamLogo from "../images/team-logo.png";
import axios from "axios";
import DropDownMenu from './message_board_drop_menu';
import Pin from './pin';


class BulletinBoardMessages extends Component {
	constructor(props) {
		super(props);

		this.deleteBoxDisplay = this.deleteBoxDisplay.bind(this);
	}
	deleteBoxDisplay(athlete_id, post_id) {
		const { userId } = this.props;
		if (userId === athlete_id) {
			return (
				<div className="deleteBulletinMessage"
					onClick={() => { this.props.deleteBulletinPost(post_id); }}>Delete Message</div>
			)
		}
	}

	generateMessages() {
		const {hasPinned}=this.props;
		const bulletinMessages = this.props.data.map((item, index) => {
			const { first_name, last_name, post_text, timestamp, team_name, img_url, team_id, pinned, post_id, athlete_id } = item;
			const pinnedClass = pinned > 0 ? 'pinned' : '';
			var time = new Date(timestamp).toLocaleTimeString();
			var date = new Date(timestamp).toLocaleDateString();
			// console.log("This is the props in bulletin: ", this.props);

			return (
				<div className={`userMessages spill ${pinnedClass}`} key={index} >
					<img className="teamLogo" src={img_url} alt="" />
					<span onClick={() => { this.props.toTeammateProfile(athlete_id, team_id) }} className='athleteInfo'>{first_name} {last_name} {time} {date} </span>
						 <DropDownMenu delete={this.deleteBoxDisplay(athlete_id, post_id)} pinDrop={<Pin pinMessage={this.props.pinMessage} post_id={post_id} pinned={pinned} hasPinned={hasPinned} />
}/>
					<p className='postText'>{post_text}</p>
				</div>
			);
		});
		return bulletinMessages;
	}
	render() {
		return (
			<div className="messageContainer">
				{this.generateMessages()}
			</div>
		)
	}
};

export default BulletinBoardMessages;
