import React, { Component } from "react";
import UnpinModal from "./unpin_modal";
import teamLogo from "../images/team-logo.png";
import axios from "axios";
import Pin from './pin';

class BulletinBoardMessages extends Component {
	constructor(props) {
		super(props);
	}
	generateMessages() {
		console.log("This is the props in bulletin at the top: ", this.props.data);
		// const deleteBoxDisplay = this.props.data.map((item, index)=>{
		// 	const {first_name, last_name, post_text, timestamp, team_name, pinned, post_id, athlete_id} = item;
		// 	if(){
		// 		return(
		// 			<div key={index} className="deleteBulletinMessage"
		// 			onClick= {()=>{this.props.deleteBulletinPost(post_id);}}>x</div>
		// 		)
		// 	}

		// });

		const bulletinMessages = this.props.data.map((item, index) => {
			const {first_name, last_name, post_text, timestamp, team_name, team_id, pinned, post_id, athlete_id} = item;
			const pinnedClass= pinned > 0 ? 'pinned' : '';
			var time = new Date(timestamp).toLocaleTimeString();
			var date = new Date(timestamp).toLocaleDateString();
			console.log("This is the props in bulletin: ",athlete_id);

			return (
				<div className={`userMessages spill ${pinnedClass}`} key={index} >
					<img className="teamLogo" src={teamLogo} alt="" />
					<span onClick={ () => { this.props.toTeammateProfile(athlete_id, team_id) } } className='athleteInfo'>{first_name} {last_name} {time} {date} </span>
					<Pin pinMessage={this.props.pinMessage} post_id={post_id} pinned={pinned} />
					<div className="deleteBulletinMessage"
						 onClick= {()=>{this.props.deleteBulletinPost(post_id);}}>x</div>
						 {/* {deleteBoxDisplay} */}
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
