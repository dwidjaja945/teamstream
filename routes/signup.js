module.exports = (webserver, dataBase, mysql, encrypt ) => {
    /**
     * Takes: {
	 *  username
	 *  password
	 *  email
	 * }
     *
     * Returns:
     *  success: true
     */
    webserver.post("/api/signup", (req, res) => {
        console.log('started signup process');
        const output = { success: false, data: [], errors: [], redirect: "" };

        let password = req.body.password;
        let email = req.body.email;

        //=========================
        //== Password Encryption ==
        //=========================

        encrypt.hash(password, encrypt.saltRounds, null, (err, hash) => {
            password = hash;

            // =======================
            // === Finishing Query ===
            // =======================
            //Checks if user currently exists
            let query = `SELECT email, username FROM users WHERE email = ?`;
            let inserts = [email];

            let selectSqlQuery = mysql.format(query, inserts);

            dataBase.query(selectSqlQuery, (error, data, fields) => {
                if (data.length === 0) {
                    console.log("User does not exist, continuing");

                    query = `INSERT INTO users (user_id, email, password, 
					google_id, facebook_id, status) VALUES (NULL, ?, ?, '', '', 'active')`;

                    inserts = [email, password];

                    let sqlQuery = mysql.format(query, inserts);

                    dataBase.query(sqlQuery, (error, data, fields) => {
                        if (!error) {
                            console.log(`Creating ${email} with userId: ${data.insertId}`);
                            output.success = true;
                            // output.data = data;
                            req.session.user_id = data.insertId;
                            output.redirect = "/add_athlete";
                            console.log('signup post-session: ', req.session)
                        } else {
                            output.errors = error;
                        }
                        res.json(output);
                    });
                } else {
                    console.log("user already exists");
                    res.send("User already exists");
                }
            });
        });
    });
};
