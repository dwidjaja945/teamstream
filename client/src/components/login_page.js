import React from "react";
import axios from "axios";
import teamLogo from "./images/tsLogo.png";

class LogIn extends React.Component {
	constructor(props) {
		super(props);


//         this.state = {
//             userName:'',
//             password:'',
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleAddItem = this.handleAddItem.bind(this);
//     }
//     handleChange(event){
//         const {name,value} = event.target;

//         this.setState({
//             [name]:value,
//         })
//     }
//     handleAddItem(event){
//         event.preventDefault();
//         // this.props.addItemCallback(this.state);
//         const {userName, password} = this.state;
//         this.performAxiosCall(userName, password);

		this.state = {
			userName: "",
			password: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		});
	}
	handleAddItem(event) {
		event.preventDefault();
		// this.props.addItemCallback(this.state);
		console.log(this.state);
		const { userName, password } = this.state;
		this.performAxiosCall(userName, password);


		this.setState({
			userName: "",
			password: ""
		});
	}

	performAxiosCall(username, password) {
		const dataToSend = { username, password };
		let path = "/api/login";
		axios.post(`http://localhost:9000${path}`, dataToSend).then(response => {
			console.log(response);
			//here is where we redirect

		});
	}

	render() {
		const { userName, password } = this.state;

		console.log(this.state);
		return (
			<div className="loginInfoContainer">
				<img className="teamLogoImg" src={teamLogo} />
				<form onSubmit={this.handleAddItem} className="loginForm">
					<div className="userNameContainer">
						<div className="userNameLine">
							<label>username</label>
							<input value={userName} onChange={this.handleChange} name="userName" type="text" />
						</div>
					</div>
					<div className="passwordContainer">
						<div className="passwordLine">
							<label>password</label>
							<input value={password} onChange={this.handleChange} name="password" type="text" />
						</div>
					</div>
					<div className="loginBtnContainer">
						<button className="loginBtn">Submit</button>
					</div>
				</form>
			</div>
		);
	}
}

export default LogIn;

{
	/* <form onSubmit={this.handleAddItem}>
    <div className="row">
        <div className="col s12 m8 offset-m">
            <label>username</label>
            <input value={userName} onChange={this.handleChange} name="userName" type="text" />
        </div>
    </div>
    <div className="row">
        <div className="col s12 m8 offset-m">
            <label>password</label>
            <input value={password} onChange={this.handleChange} name="password" type="text" />
        </div>
    </div>
    <div className="right-align">
        <button className="btn purple darken-2">Submit</button>
    </div>
</form> */
}
