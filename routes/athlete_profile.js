
module.exports = function (webserver) {
    webserver.get('/athlete_profile', function (req , res ) {
        let athleteID;
        if (req.body && req.body.id) {
            athleteID = req.body.id;
        }
        let query = 'SELECT * FROM ?? WHERE ?? = ?';
        let inserts = ['athlete_profile', 'id', athleteID];

        let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            user: null,
            errors: []
        };

        dataBase.query(sqlQuery, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.user = data;
            } else {
                output.errors = error;
            }
            res.json(output);
        });
    });
};