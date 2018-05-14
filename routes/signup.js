module.exports = (webserver, dataBase, mysql, session) => {
    webserver.post("/api/signup" , (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: []
        };

        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;

        let query = `INSERT INTO users (user_id, email, username, password, google_id, facebook_id, status) VALUES (NULL, ?, ?, ?, '', '', 'active')`;
        let inserts = [email, username, password];

        let sqlQuery = mysql.format(query, inserts);

        dataBase.query(sqlQuery, (error, data, fields) => {
            if(!error) {
                output.success = true;
                output.data = data;
            } else {
                output.errors = error;
            }
            res.json(output);
        })
    });
}