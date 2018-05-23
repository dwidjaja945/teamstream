module.exports = ( webserver , dataBase , mysql , check) => {

    /**
     * Takes:
     *      team_name: ''
     *      sport_name: ''
     *      team_bio: ''
     *
     *  Returns:
     *      success: true
     *      insertID: #
     *      redirect: ''
     *      team_ID: ####
     */

    webserver.post( '/api/create_team' , ( req , res ) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: []
        };

        let user_id;
        if(req.session.user_id !== undefined) {
            user_id = req.session.user_id;
        } else {
            output.redirect = "/login";
            output.errors = "User not logged in";
            res.json(output);
            res.end();
            return;
        };

        function createUniqueHash() {
            //generate random hash for new team
            const new_team_code = codeGenerator();
            console.log("new team code is: ", new_team_code);

            //check if code is in table already
            let query = `SELECT \`teams\`.\`team_id\` FROM \`teams\` WHERE \`teams\`.\`team_code\` = ?`;
            let inserts = [new_team_code];
            let mysqlQuery = mysql.format(query, inserts);

            dataBase.query(mysqlQuery, (err, data, fields) => {
                if (!err) {
                    if (data.length > 0) {
                        console.log('code already exists');
                        createUniqueHash();
                    } else {
                        console.log('team code is unique, continuing');
                        addTeamToTable(new_team_code);
                    }
                } else {
                    console.log("there was an error in routes/create_team - checkIfCodeExists");
                }
            });
        }
        createUniqueHash();

        function addTeamToTable(new_team_code){
            // need to clean input data
            let {team_name, sport_name, team_bio} = req.body;

            let query = `
            INSERT INTO teams
            (
                team_name,
                sport_name,
                team_bio,
                team_code
            )
            VALUES (
                ?,
                ?,
                ?,
                ?
            )`;

            let inserts = [team_name, sport_name, team_bio, new_team_code];

            let mysqlQuery = mysql.format(query, inserts);

            dataBase.query(mysqlQuery, (err, data, fields) => {
                if (!err) {
                    output.success = true;
                    output.data = data;
                    output.team_code = new_team_code;
                    output.redirect = "/bulletin_board";
                    console.log("User created the team: ", team_name);
                } else {

                    output.errors = err;
                }

                res.json(output);

            });
        }
    } );

    function codeGenerator() {
        let newCode = "";

        for (let i = 0; i < 6; i++) {
            let codeChoice = Math.floor(Math.random() * 2 + 1);
            let code;

            if (codeChoice === 1) {
                let randomLetters = Math.floor(Math.random() * 26 + 65);

                code = String.fromCharCode(randomLetters);
            } else {
                code = Math.floor(Math.random() * 9);
            }
            newCode += code;
        }
        return newCode;
    }

};
