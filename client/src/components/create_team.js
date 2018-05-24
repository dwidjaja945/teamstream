import React, { Component } from "react";
import { Link } from "react-router-dom";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import ForkNav from "./fork_nav";
import axios from "axios/index";

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team_name: 'ROWMASTERS',
            sport_name: 'Rowing',
            team_bio: 'A bunch of cool people doing awesome rowing',
            generatedCode:'',
        };

    }
    // codeGenerator() {
    // 	let newCode = "";
    //
    // 	for (let i = 0; i < 6; i++) {
    // 		let codeChoice = Math.floor(Math.random() * 2 + 1);
    // 		let code;
    //
    // 		if (codeChoice === 1) {
    // 			let randomLetters = Math.floor(Math.random() * 26 + 65);
    //
    // 			code = String.fromCharCode(randomLetters);
    // 		} else {
    // 			code = Math.floor(Math.random() * 9);
    // 		}
    // 		newCode += code;
    // 	}
    // 	return newCode;
    // }

    handleSubmit(){
		//perform axios call to return code, then show login
        const {team_name, sport_name, team_bio} = this.state;
        const dataToSend = {team_name, sport_name, team_bio};
        const path = '/api/create_team';
        axios.post(`${path}`, dataToSend).then(response => {

            if (!response.data.success) {
                console.log("Create team data from server response: ", response);
                console.log(response.data.errors);

                // this.setState({
				// 	generatedCode:response.data.team_code
				// })

            } else {
                //ERROR
                console.log(response.data.errors);
            }
        });
    }
    login(){
        this.props.history.push('/bulletin_board');
    }

    displayLogIn(generatedCode){
        if(generatedCode){
            return(
                <button type='button' onClick={this.login.bind(this)} className="cGbtnContent cGDoneBtn">Log In</button>
            )
        }else{
            return (
                <button type='button' onClick={this.handleSubmit.bind(this)}
                    className="cGbtnContent cGDoneBtn">Generate Code</button>
            )
        }
    }

    render() {
        const {team_name, sport_name, team_bio, generatedCode} = this.state;

        const hashCode = generatedCode ? generatedCode : 'Generate your code';

        return (
            <div className="createTeamContainer">
                <Navbar icon={backArrow} hamburgerMenu={false} url="/fork_nav" />
                <div className="cTCodeGenerator">
                    <div className="createTeamName">
                        {/*<span className="teamName">Team Name</span>*/}
                        <input
                            value={team_name}
                            className='teamName'
                            type="text"
                            placeholder="Your Team Name"
                            onChange={event => {
                                this.setState({ team_name: event.target.value });
                            }}
                        />
                    </div>
                    <input
                        value={sport_name}
                        type="text"
                        placeholder="Sport Name"
                        onChange={event => {
                            this.setState({ sport_name: event.target.value });
                        }}
                    />
                    <input
                        value={team_bio}
                        type="text"
                        placeholder="A quick blurb about your team"
                        onChange={event => {
                            this.setState({ team_bio: event.target.value });
                        }}
                    />
                    <div className="cGNumberContainer">
                        <span className="cGNumber">{hashCode}</span>
                    </div>
                    <div>
                        {this.displayLogIn(generatedCode)}
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateTeam;

