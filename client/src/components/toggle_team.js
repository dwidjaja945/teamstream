import React, { Component } from "react";
import axios from "axios";

class ToggleTeams extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
            display: {
                display: 'none',
            },
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

	// toggleAxios(id) {
	// 	const path = "/api/toggle_teams";
    //
	// 	const dataToSend = { team_id: id };
	// 	axios.post(path, dataToSend).then(response => {
	// 		console.log("toggleAxios: ", response.data.userTeams);
	// 		this.props.refreshMessages();
	// 		this.setState({
	// 			show: false
	// 		});
	// 	});
	// }

	closePullOut(e){
        this.setState({
			show: false,
        })
		setTimeout( ()=> {
			this.setState({
                display: {
                    display: 'none',
                },
			})
		}, 500);
	}

	render() {
		const { show } = this.state;
		const { teamCodes } = this.props;
		const pullOutClass = show ? 'toggleBulletsAnim' : 'closeToggleBulletsAnim';
        const pullOutDiv = show ?
            <div className="toggleClosePulloutDiv" onClick={this.closePullOut.bind(this)}></div> : <span></span>


        const button = (
			<div className="dropDownBtn" onClick={() => this.setState({
				show: !show,
                display: {
                    display: 'block',
                },
			})}>
				<span className="topLeftArrow" />
				<span className="topRightArrow" />
				<span className="bottomLeftArrow" />
				<span className="bottomRightArrow" />
			</div>
		);

		const teams = teamCodes.map((code, index) => {
			return (
				<li
					className="toggle-li"
					key={index}
					onClick={() => {
						this.props.toggleAxios(code.team_id, code.team_name, code.team_code);
						this.setState({
                            show: false
                        })
					}}
				>
					{code.team_name}
				</li>
			);
		});

		// if (show) {
			return (
				<div className="toggleMenuBtn">
					{button}
					<ul className={`toggleBullets ${pullOutClass}`} style={this.state.display}>{teams}</ul>
					{pullOutDiv}
				</div>
			);
		// }else{
            // {setTimeout( () => {
            //     return button;
            // }, 500)}
		// }
		// return button;
	}
}

export default ToggleTeams;
