
modules.export = function (webserver) {
    webserver.post('/roster', function (req, res) {
        if (req.body && req.body.id) {
            let teamID = req.body.id;
        }
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['athlete_profile', 'id', teamID];

        let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            athletes: [],
            errors: []
        };

        dataBase.query(sqlQuery, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.athletes = data;
            } else {
                output.errors = errors
            }
            res.json(output);
        });
    })
}