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
		});
	}
	componentDidMount(){
		this.getRosterData();
	}

	getRosterData(){
		this.setState({
			bulletinDummyData
		});
	}

	render(){
	return (
		<div className="container">
			{/* <AthleteProfile /> */}
			{/* <Roster/> */}
			<BulletinBoard   />
		</div>
	);
}
}

export default App;
