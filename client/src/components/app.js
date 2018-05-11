import React from "react";
import AthleteProfile from "./athlete_profile";
import Roster from './roster';
import AddBulletinMessages from './addBulletinMessage';
import BulletinBoard from './bulletinBoard';

function App() {
	return (
		<div className="container">
			{/* <AthleteProfile /> */}
			{/* <Roster/> */}
			<BulletinBoard/>
			<AddBulletinMessages/>
		</div>
	);
}

export default App;
