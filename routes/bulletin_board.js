const slashes = require('slashes');

module.exports = function ( webserver , dataBase , mysql ) {

    // Pulling data from bulletin board for a particular user
    webserver.get("/api/bulletin_board", function(req, res) {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        // create a function for checking if logged in --> move to webserver.js
        // function checkIfLoggedIn(reqObj, resObj, outputObj , redirectIfFalse = true) {
        //     if (reqObj.session.user_id === undefined) {
        //         outputObj.redirect = redirectIfFalse ? "/login" : "";
        //         // outputObj.redirect = '/login';
        //         outputObj.errors = 'User not logged in';
        //         resObj.json(outputObj);
        //         resObj.end();
        //         return;
        //     }    
        // };
        if (req.session.user_id === undefined) {
            output.redirect = '/login_page';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        // create checks for each variable - run through loop for each.
        let { user_id , athlete_id , athlete_info_id } = req.session;
        // let user_id = req.session.user_id;
        // let athlete_id = req.session.athlete_id;
        // let athlete_info_id = req.session.athlete_info_id;
        // team_id will need to be provided from front end in axios call.

        let team_id;
        // this check is if the user is switching teams boards.
        // maybe add check here to see if user is actually on team
        if(req.body.team_id){
            team_id = req.body.team_id
            req.session.team_id = team_id;
        } else {
            team_id = req.session.team_id
        }

        let athlete_info_id_query = `SELECT 
            \`athlete_info\`.\`first_name\`, 
            \`athlete_info\`.\`last_name\`, 
            \`bulletin\`.\`athlete_id\`, 
            \`bulletin\`.\`post_id\`,
            \`bulletin\`.\`post_text\`, 
            \`bulletin\`.\`pinned\`,
            \`bulletin\`.\`timestamp\`,
            \`teams\`.\`team_name\`,
            \`teams\`.\`team_code\`
            FROM \`bulletin\`
            JOIN \`teams\`
                ON \`bulletin\`.\`team_id\` = \`teams\`.\`team_id\`
            JOIN \`athletes\`
                ON \`bulletin\`.\`athlete_id\` = \`athletes\`.\`athlete_id\`
            JOIN \`athlete_info\`
                ON \`athletes\`.\`athlete_info_id\` = \`athlete_info\`.\`athlete_info_id\`
            WHERE \`bulletin\`.\`team_id\` = ? 
            ORDER BY \`timestamp\` DESC `;

        // do a separate request just for the athlete data, use as reference on webserver to tie back to message data.

        // where : ensure that you can only pull data from the teams user is on
        //ex  "AND team_id IN (2, 5, 7, 12) "
        // DESCRIBE  - tells what fields query is using

        let athlete_info_id_inserts = [team_id];

        let athlete_info_id_sqlQuery = mysql.format(athlete_info_id_query, athlete_info_id_inserts);

        dataBase.query(athlete_info_id_sqlQuery, function(error, data, fields) {

            if(!error) {

                for (let e = 0; e < data.length; e++) {
                    data[e].post_text = slashes.strip(data[e].post_text);
                }
                output.data = data;

                let query = `
                    SELECT teams.team_name,
                        teams.team_code,
                        teams.team_id
                    FROM teams
                    JOIN athletes
                        ON teams.team_id = athletes.team_id
                    WHERE athlete_info_id = ?
                `;

                let inserts = [ athlete_info_id ];

                let mysqlQuery = mysql.format( query , inserts );

                dataBase.query( mysqlQuery , ( err , data , fields ) => {
                    if (!err) {
                        output.success = true;
                        for (let e = 0; e < data.length; e++) {
                            data[e].post_text = slashes.strip(data[e].post_text);
                        }
                        output.userTeams = data;
                        output.redirect = '/bulletin_board';
                    } else {
                        output.errors = err;
                    }

                    res.json(output);

                });
            } else {
                output.errors = error;
                res.json(output);
                // try to include error logging
            }
        });
    });

    webserver.post("/api/bulletin_board", (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: []
        };

        // make array of things to check
        // then iterate through array, see if field is present, if not, throw error
        // if present, make object with data
        if (req.body && req.session) {
            if (req.session.athlete_id) {
                var athlete_id = req.session.athlete_id;
                // will need to rework to pull ID from sessions
            }
            if (req.body.post_text) {
                var post_text = req.body.post_text;
                // assign bulletin post here`
            }
            if (req.session.team_id) {
                var team_id = req.session.team_id;
                // assign team name here
            }
            // if (req.body.pinned) {
            //     var pinned = req.body.pinned;
            // }
        } else {
            res.send("Missing Proper query items");
        }

        let query =
            "INSERT INTO " +
            "`bulletin` (`post_text`, `athlete_id`, `timestamp`, `team_id`, `pinned`) " +
            "VALUES (?, ?, NOW(), ?, ?)";

        let inserts = [
            post_text,
            athlete_id,
            team_id,
            0,
        ];

        // adding slashes to insert variables
        for( let i = 0 ; i<inserts.length ; i++) {
            inserts[i] = slashes.add(inserts[i]);
        }
        // will be inserting post_text, athlete_id, team_id, pinned

        let sqlQuery = mysql.format(query, inserts);

        console.log('sql query', sqlQuery)

        dataBase.query(sqlQuery, function(error, data, fields) {
            if (!error) {
                output.success = true;
                output.data = data;
                console.log(data)

            } else {
                output.errors = error;
            }

            console.log('BB insert data: ', data);

            res.json(output);

        });
    });

    /**
     * Takes:
     *      post_id
     *
     *  Returns:
     *      success: true
     *      removed_id: 0
     */

    webserver.delete("/api/bulletin_board", (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: []
        };

        if (req.body) {
            if (req.body.post_id) {
                var post_id = req.body.post_id;
            }
            if (req.session.athlete_id) {
                var athlete_id = req.session.athlete_id;
            }
        }

        let query = "DELETE " +
            "FROM `bulletin` " +
            "WHERE `bulletin`.`post_id` = ? " +
            "AND `bulletin`.`athlete_id` = ?";
        let inserts = [post_id, athlete_id];
        // insert post_id and athlete_id

        let sqlQuery = mysql.format(query, inserts);

        dataBase.query(sqlQuery, (error, data, fields) => {
            if (!error) {
                output.success = true;
                output.data = data;
            } else {
                output.errors = error;
            }

            res.json(output);
        });
    });
}
