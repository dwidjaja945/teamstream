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


		this.props.add(this.state.message);
		this.setState({
			message: ""
		});
	}
	render() {
		const { message } = this.state;
		console.log(this.state);
		return (
			<form onSubmit={this.handleAddMessage}>
				<div className="sendMessageForm">
					<div className="inputContainer addMessage">
						<textarea
							className="addMessageInput"
							value={message}
							type="text"
							placeholder="Enter Message"
							onChange={event => {
								this.setState({ message: event.target.value });
							}}
						/>
					</div>
				
						<button className='addMessageButton'>Send</button>
					
				</div>

			</form>
		);
	}
}
export default Bulletin;
