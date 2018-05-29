import React, { Component } from "react";
import UnpinModal from "./unpin_modal";
import teamLogo from "../images/team-logo.png";
import Pin from './pin';

class BulletinBoardMessages extends Component {

	generateMessages() {
		console.log("This is the props in bulletin at the top: ", this.props.data);

		const bulletinMessages = this.props.data.map((item, index) => {
			const {first_name, last_name, post_text, timestamp, team_name, pinned, post_id, athlete_id} = item;
			const pinnedClass= pinned > 0 ? 'pinned' : '';
			console.log("This is the props in bulletin: ",pinned)

			return (
				<div className={`userMessages spill ${pinnedClass}`} key={index} >
					<img className="teamLogo" src={teamLogo} alt="" />
					<span>{first_name} {last_name} {timestamp} </span>
					<Pin pinMessage={this.props.pinMessage} post_id={post_id} pinned={pinned} />
					<div className="deleteBulletinMessage" onClick= {()=>{
						this.props.deleteBulletinPost(post_id);
					}}
					>
						x
					</div>
					<p>{post_text}</p>
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
