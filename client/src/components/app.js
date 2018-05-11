import React from "react";
import AthleteProfile from "./athlete_profile";
import Roster from "./roster";
import Login from "./login";
import ForkNav from "./forkNav";

function App() {
	return (
		<div className="container">
			{/* <Login /> */}
			<ForkNav />
			{/* <AthleteProfile />
			<Roster /> */}
		</div>
	);
}

export default App;
