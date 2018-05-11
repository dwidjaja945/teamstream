module.exports = function (webserver, dataBase, mysql) {

    webserver.get('/athlete_profile', function (req , res ) {
        let athleteID;
        if (req.body && req.body.id) {
            athleteID = req.body.id;
        }

        // let ai = 'athlete_info_id';
        // let a = 'athletes';
        // let s = 'stats';
        // let query = 'SELECT ??.??'

        // let query1 = "SELECT `ai`.`first_name`, `ai`.`last_name`, `ai`.`height`, " +
        //     "`ai`.`weight`, `ai`.`img_url`,`ai`.`age`, " +
        //     "`s`.`stat_name`, `s`.`stat_value` " +
        //     "FROM `athlete_info` AS ai " +
        //     "JOIN `athletes` AS a " +
        //     "ON `ai`.`athlete_info_id` = `a`.`athlete_info_id` " +
        //     "JOIN `stats` as s " +
        //     "ON `a`.`athlete_id` = `s`.`athlete_id` " +
        //     "WHERE `ai`.`user_id` = '4' ";

        let ai = 'athlete_info';
        let s = 'stats';


        let query = "SELECT ??.??, ??.??, ??.??, " +
            "??.??, ??.??, ??.??, " +
            "??.??, ??.?? " +
            "FROM ?? " +
            "JOIN ??" +
            "ON ??.?? = ??.?? " +
            "JOIN ?? " +
            "ON ??.?? = ??.?? " +
            "WHERE ??.?? = '4' ";
        let inserts = [ai, 'first_name', ai, 'last_name', ai, 'height', ai, 'weight', ai, 'img_url', ai, 'age',
        s, 'stat_name', s, 'stat_value', ai, 'athletes', ai, 'athlete_info_id', 'athletes', 'athlete_info_id',
        s, 'athletes', 'athlete_id', s, 'athlete_id', ai, 'user_id'];

        let sqlQuery = mysql.format(query, inserts);
        console.log(sqlQuery)

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
            console.log(JSON.stringify(output));
            res.json(output);
        });
    });

    webserver.post('/athlete_profile', function (req , res ) {
        let athleteID;
        if (req.body && req.body.id) {
            athleteID = req.body.id;
        }

        let athleteInfoQuery = "INSERT INTO `athlete_info` (`athlete_info_id`, `first_name`, `last_name`, `height`, " +
            "`weight`, `img_url`, `age`, `user_id`) VALUES (NULL, 'Karth', 'Silman', '194', '400', '', '32', '4');";

        let statsQuery = "INSERT INTO `stats` (`stat_id`, `stat_name`, `stat_value`, `athlete_id`)" +
            " VALUES (NULL, 'Stuff and things', 'all the goods', '');";


        // let sqlQuery = mysql.format(query, inserts);
        // console.log(sqlQuery)

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
            console.log(JSON.stringify(output));
            res.json(output);
        });
    });

};