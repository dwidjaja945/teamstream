import React, { Component } from "react";

class Bulletin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ""
		};
		this.handleAddMessage = this.handleAddMessage.bind(this);
	}
	handleAddMessage(event) {
		event.preventDefault();
		console.log(this.state);
		this.setState({
			message: ""
		});
		this.props.add(this.state);
	}
	render() {
		const { message } = this.state;
		return (
			<form onSubmit={this.handleAddMessage}>
				<div className="inputContainer">
					<input
						value={message}
						type="text"
						placeholder="Enter Message"
						onChange={event => {
							this.setState({ message: event.target.value });
						}}
					/>
				</div>
				<div className="buttonContainer">
					<button>Send</button>
				</div>
			</form>
		);
	}
}
export default Bulletin;
