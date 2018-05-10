
module.export = function (webserver) {
    webserver.get('/athlete_profile', function (req , res ) {
        let athleteID;
        if (req.body && req.body.id) {
            athleteID = req.body.id;
        }

        // let ai = 'athlete_info_id';
        // let a = 'athletes';
        // let s = 'stats';
        // let query = 'SELECT ??.??'


        // let query = 'SELECT * FROM ?? WHERE ?? = ?';
        // let inserts = ['athlete_profile', 'id', athleteID];

        let query =    "SELECT `ai`.`first_name`, `ai`.`last_name`, `ai`.`height`," +
            "`ai`.`weight`, `ai`.`img_url`,`ai`.`age`," +
            "`s`.`stat_name`, `s`.`stat_value`" +
            "FROM `athlete_info` AS ai" +
            "JOIN `athletes` AS a" +
            "ON `ai`.`athlete_info_id` = `a`.`athlete_info_id`" +
            "JOIN `stats` as s" +
            "ON `a`.`athlete_id` = `s`.`athlete_id`" +
            "WHERE `ai`.`user_id` = '4'";

        // let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            user: null,
            errors: []
        };

        dataBase.query(query, function (error, data, fields) {
            if (!error) {
                output.success = true;
                output.user = data;
            } else {
                output.errors = errors;
            }
            res.json(output);
        });
    });
};