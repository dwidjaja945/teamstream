module.exports = (webserver, dataBase, mysql) => {
	/**
	 * Takes:
	 *      team_code: ####
	 *
	 * Returns:
	 *      success: true
	 *      team_id: ####
	 */

	webserver.post("/api/join_team", (req, res) => {
		const output = {
			success: false,
			data: [],
			errors: [],
			redirect: ""
		};

		let user_id;
		if (req.session.user_id === undefined) {
			output.redirect = "/login";
			output.errors = "User not logged in";
			res.json(output);
			res.end();
			return;
		} else {
			user_id = req.session.user_id;
		}

		let team_code = req.body.team_code;

		let athlete_info_id = req.session.athlete_info_id;

		console.log("Join team body team code", team_code);
		console.log("Join team athlete info id", athlete_info_id);

		// select team_id via team_code from teams
		// add athlete in athletes
		// return team_id to front end

		let query = `

            SELECT team_id
            FROM teams
            WHERE team_code = ?
        `;

		let inserts = [team_code];

		let mysqlQuery = mysql.format(query, inserts);

		dataBase.query(mysqlQuery, (err, data, fields) => {
			let team_id;

			console.log("join team 1st query data: ", data);

			if(data.length === 0) {
				output.errors = 'team code does not exist';
				output.redirect = '/join_team';
				res.json(output);
				res.end();
				return;
			}

			if (!err) {
				output.success = true;
				output.data = data;
				team_id = data[0].team_id;
				addAthleteToTable(athlete_info_id, team_id, output);
			} else {
				console.log("join team 1st query data: ", data);

				if (!err) {
					output.success = true;
					output.data = data;
					team_id = data[0].team_id;
					addAthleteToTable(athlete_info_id, team_id, output);
				} else {
					output.errors = err;
				}
			}

			function addAthleteToTable(athleteInfoId, teamId, output) {
				let query = `
                INSERT INTO athletes
                (
                    athlete_info_id,
                    team_id
                )
                VALUES (
                    ?,
                    ?
                )
            `;

				let inserts = [athleteInfoId, teamId];

				let mysqlQuery = mysql.format(query, inserts);

				dataBase.query(mysqlQuery, (err, data, fields) => {
					if (!err) {
						req.session.athlete_id = data.insertId;
						output.success = true;
						output.data = data;
						output.redirect = "/bulletin_board";
					} else {
						output.errors = err;
					}

					console.log("join_team.js output object: ", output);
					res.json(output);
				});
			}
		});
	});
};
