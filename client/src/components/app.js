import React from "react";
import Login from "./login";
import ForkNav from "./forkNav";
import CreateTeam from "./create_team";
import JoinTeam from "./join_team";
import AthleteProfile from "./athlete_profile";
import Roster from "./roster";

function App() {
	return (
		<div className="container">
			{/* <Login />
			<AthleteProfile />
			<ForkNav /> */}
			<CreateTeam />
			{/* <JoinTeam /> */}
			{/* <Roster /> */}
		</div>
	);
}

export default App;
