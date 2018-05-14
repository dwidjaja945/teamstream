import React, {Component} from "react";
import AthleteProfile from "./athlete_profile";
import Roster from './roster';
import AddBulletinMessages from './addBulletinMessage';
import BulletinBoard from './bulletinBoard';
import bulletinDummyData from './bulletinDummyData';


class App extends Component{
	constructor(props){
		super(props);
		this.state = ({
			bulletinDummyData: [],
			messageToPin: []
		});
	}
	componentDidMount(){
		this.getRosterData();
	}
	addMessage(message){
		this.setState({
			bulletinDummyData: [message, ...this.state.bulletinDummyData ]
		});
	}
	getRosterData(){
		this.setState({
			bulletinDummyData
		})
	}

	render(){
	return (
		<div className="container">
			{/* <AthleteProfile /> */}
			{/* <Roster/> */}
			<BulletinBoard   data={this.state.bulletinDummyData}/>
			<AddBulletinMessages add={this.addMessage.bind(this)}/>
		</div>
	);
}
}

export default App;
