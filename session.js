const slashes = require("slashes");
const asyncMiddleware = require("./middleware/async");
require('express-async-errors');

module.exports = function (webserver, dataBase, mysql, encrypt) {
    // ============================
    // ==== Already Logged In? ====
    // ============================
    webserver.get( '/api/' , asyncMiddleware(( req , res ) => {
        const output = {
            redirect: '',
            success: false,
            // sessionID : null
        };

        if (req.session.user_id !== undefined) {
            // console.log("User is already logged in")
            output.redirect = '/bulletin_board';
            output.success = true;
            res.json(output);
        } else {
            // output.sessionID = req.session.user_id;
            output.redirect = '/';
            res.json(output);
        }
        // console.log("checking if user already logged in...");
        
    }));

    // ====================
    // ==== Logging In ====
    // ====================
    webserver.post("/api/login", asyncMiddleware((req, res) => {
        // console.log("starting log-in process")
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: "",
            sessionID: null
        };

        // ======================
        // Validating inputs=====
        // ======================
        req.check('email' , 'must be valid email').isEmail();
        const validationErrors = req.validationErrors();

        if( validationErrors ) {
            console.log('login error');
            output.redirect = '/login';
            output.errors = 'invalid login credentials';
            res.json(output);
            res.end();
            return;
        }



        let email;
        let password;

        if (req.body.email === "" || req.body.password === "") {
            output.redirect ="/login";
            res.send("Please provide login credentials");
            res.end();
            return;
        } else {
            email = slashes.add(req.body.email);
            password = slashes.add(req.body.password);
        }

        // console.log('email and pass', email, password)
        // Pull email data to compare to password

        let query = `SELECT users.password
            FROM users
            WHERE email = ?`;

        let inserts = [email];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query(mysqlQuery, (err, data, fields) => {
            if (!err) {
                if(data.length > 0){
                    encrypt.compare(password, data[0].password, (err, compareResponse) => {
                        // If there's an error with checking password, likely an issue with the encrypt
                        if (compareResponse) {
                            throw new Error("Error in encryption check");
                        };
                        password = data[0].password;
                        let query = `SELECT 
                        users.user_id, 
                        athlete_info.athlete_info_id, 
                        athletes.team_id,
                        athletes.athlete_id,
                        athlete_info.first_name, 
                        athlete_info.last_name,
                        teams.team_code,
                        teams.team_name
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

                                // Setting Session Data
                                req.session.user_id = data[0].user_id;
                                req.session.team_id = data[0].team_id;
                                req.session.team_code = data[0].team_code;
                                req.session.athlete_id = data[0].athlete_id;
                                req.session.athlete_info_id = data[0].athlete_info_id;
                                // console.log("User Logged in and session data has been stored")

                                res.json(output);
                            } else {
                                output.errors = error;
                            }
                        });
                    });
                }else{
                    output.redirect = "/login";
                    res.json(output)
                }
            }
        });
    }));
};
