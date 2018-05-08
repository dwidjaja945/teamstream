
modules.export = function (webserver) {
    webserver.post('/athlete_profile', function (req , res ) {
        if (req.body && req.body.id) {
            let athleteID = req.body.id;
        }
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['athlete_profile', 'id', athleteID];

        let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            user: null,
            errors: []
        };

        database.query(sqlQuery, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.user = data;
            } else {
                output.errors = errors;
            }
            res.json(output);
        });
    });
}