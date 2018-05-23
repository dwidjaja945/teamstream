const { check, validationResult } = require("express-validator/check");


module.exports = function (webserver, dataBase, mysql, encrypt) {
    webserver.post("/api/login", [
        check('email').isEmail().isEmpty(),
        check('password').not().isEmpty()
    ],
    (req, res) => {
        const errors = validationResult(req);
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: "",
            sessionID: null
        };

        if( !errors.isEmpty() ) {
            output.errors = errors.array;
            res.json(output);
            // return;
        }
        
        let email;
        let password;

        if (req.body.email === "" || req.body.password === "") {
            output.redirect("/login");
            res.send("Please provide login credentials");
            res.end();
            return;
        } else {
            email = req.body.email;
            password = req.body.password;
        }

        // Pull email data to compare to password

        let query = `SELECT users.password
            FROM users
            WHERE email = ?`;

        let inserts = [email];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query(mysqlQuery, (err, data, fields) => {
            if (!err) {
                encrypt.compare(password, data[0].password, (err, compareResponse) => {
                    password = data[0].password;
                    let query = `SELECT 
                        users.user_id, 
                        athlete_info.athlete_info_id, 
                        athletes.team_id,
                        athletes.athlete_id,
                        athlete_info.first_name, 
                        athlete_info.last_name,
                        teams.team_code
                    FROM users
                    JOIN athlete_info
                        ON users.user_id = athlete_info.user_id
                    JOIN athletes
                        ON athlete_info.athlete_info_id = athletes.athlete_info_id
                    JOIN teams
                        ON athletes.team_id = teams.team_id
                    WHERE email = ? 
                    AND password = ?`;

                    let inserts = [email, password];

                    let sqlQuery = mysql.format(query, inserts);

                    dataBase.query(sqlQuery, (error, data, fields) => {
                        if (!error) {
                            // tried to go to page without logging in
                            if (data.length === 0) {
                                output.redirect = "/login";
                                output.errors = "Invalid Login Credentials";
                                res.json(output);
                                return;
                            }

                            // providing data if user logged in
                            output.success = true;
                            output.data = data;
                            output.redirect = "/bulletin_board";

                            req.session.user_id = data[0].user_id;
                            req.session.team_id = data[0].team_id;
                            req.session.team_code = data[0].team_code;
                            req.session.athlete_id = data[0].athlete_id;
                            req.session.athlete_info_id = data[0].athlete_info_id;
                            req.session.team_code = data[0].team_code;

                            // send back json data about path they should go to (bulletinboard) => browser history
                            res.json(output);
                        } else {
                            output.errors = error;
                        }
                    });
                });
            }
        });
    });
};
