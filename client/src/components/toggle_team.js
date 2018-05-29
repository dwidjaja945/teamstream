import React, { Component } from "react";
import axios from "axios";
import dropDown from "./images/double-down.png";

class ToggleTeams extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
	}

	// componentDidMount() {
	//     this.setState({
	// 	teamCodes:this.props.teamCodes
	// });
	// }

	// bulletinBoardAxios() {
	//     const path = "/api/bulletin_board";
	//
	//     axios.get(path).then(response => {
	//         console.log("BB info: ", response.data.userTeams);
	//
	//         const teamCodes = response.data.userTeams;
	//
	//         this.setState({
	//             teamCodes: teamCodes
	//         });
	//     });
	// }

	toggleAxios(id) {
		const path = "/api/toggle_teams";

		const dataToSend = { team_id: id };
		axios.post(path, dataToSend).then(response => {
			console.log("toggleAxios: ", response.data.userTeams);
			this.props.refreshMessages();
			this.setState({
				show: false
			});
		});
	}

	render() {
		const { show } = this.state;
		const { teamCodes } = this.props;
		const button = (
			<div className="dropDownBtn" onClick={() => this.setState({ show: !show })}>
				<img src={dropDown} />
			</div>
		);

		const teams = teamCodes.map((code, index) => {
			return (
				<li
					key={index}
					onClick={() => {
						this.toggleAxios(code.team_id);
					}}
				>
					{code.team_name}
				</li>
			);
		});

		if (show) {
			return (
				<div className="toggleMenuBtn">
					{button}
					<ul className="toggleBullets">{teams}</ul>
				</div>
			);
		}
		return button;
	}
}

export default ToggleTeams;
