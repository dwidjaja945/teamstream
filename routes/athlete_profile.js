const slashes = require('slashes');

module.exports = function (webserver, dataBase, mysql) {

    webserver.get('/api/athlete_profile', function (req , res ) {
        let athlete_id = req.session.athlete_id;

        let query = "SELECT `ai`.`first_name`, `ai`.`last_name`, `ai`.`height`, `ai`.`weight`, `ai`.`img_url`, " +
            "`ai`.`age`, `ai`.`bio`, `s`.`stat_name`, `s`.`stat_value`, `s`.`stat_id` " +
            "FROM `athletes` AS a " +
            "JOIN `athlete_info` AS ai " +
            "ON `a`.`athlete_info_id` = `ai`.`athlete_info_id` " +
            "JOIN `stats` as s " +
            "ON `a`.`athlete_id` = `s`.`athlete_id` " +
            "WHERE `a`.`athlete_id` = ?";
        let inserts = [athlete_id];

        let sqlQuery = mysql.format(query, inserts);

        const output = {
            success: false,
            user: null,
            errors: []
        };

        dataBase.query(sqlQuery, function (error, data, fields) {
            if (!error) {
                output.success = true;
                for (let e = 0; e < data.length; e++) {
                    for( let key in data[e]) {
                        data[e][key] = slashes.strip(data[e][key]);
                    }
                }
                output.user = data;
                console.log("retrieved athlete info for user with id: ",athlete_id)
            } else {
                output.errors = error;
            }

            res.json(output);
        });
    });

    // webserver.post('/api/athlete_profile', function (req , res ) {
    //     //need to get max number of athletes to create new num
    //
    //     //missing image
    //     let {firstName, lastName, height,
    //         weight, age, userID, teamID,
    //         userLevel, statName, statValue} = req.body;
    //
    //     let athleteInfoQuery = "INSERT INTO `athlete_info` (`athlete_info_id`, `first_name`, `last_name`, `height`, " +
    //         "`weight`, `img_url`, `age`, `user_id`) VALUES ('NULL', ?, ?, ?, ?, ?, ?,? );";
    //     let athleteInfoInserts = [firstName, lastName, height, weight, '', age, userID];
    //
    //     let sqlQuery = mysql.format(athleteInfoQuery, athleteInfoInserts);
    //     // console.log(sqlQuery)
    //
    //     const output = {
    //         success: false,
    //         user: null,
    //         errors: []
    //     };
    //
    //     dataBase.query(sqlQuery, function (error, data, fields) {
    //         if (!error) {
    //             output.success = true;
    //             output.user = data;
    //
    //             //need to check for errors
    //             let athleteTableData = addAthleteInfoIdToAthleteTable(data.insertId);
    //             let coachData;
    //             if(userLevel > 1){
    //                 coachData = addAthleteToCoachTable(data.insertId);
    //             }
    //             console.log(athleteTableData)
    //         } else {
    //             output.errors = error;
    //         }
    //         console.log(JSON.stringify(output));
    //         res.json(output);
    //     });
    //
    //     function addAthleteInfoIdToAthleteTable(athleteInfoId) {
    //         let query = "INSERT INTO athletes (athlete_info_id, team_id, user_level) VALUES (?, ?, ?)";
    //         let inserts = [athleteInfoId, teamID, userLevel];
    //
    //         let sqlQuery = mysql.format(query, inserts);
    //         dataBase.query(sqlQuery, function (error, data, fields) {
    //             if (!error) {
    //                 output.success = true;
    //                 output.user = data;
    //
    //                 let statsData = addStatsData(data.insertId);
    //             } else {
    //                 output.errors = error;
    //             }
    //             return output;
    //             // console.log(JSON.stringify(output));
    //             // res.json(output);
    //         });
    //     }
    //
    //     function addStatsData(athleteId) {
    //         let query = "INSERT INTO `stats` (`stat_id`, `stat_name`, `stat_value`, `athlete_id`, `team_id`) " +
    //             "VALUES ('NULL', ?, ?, ?, ?);";
    //         let inserts = [statName, statValue, athleteId, teamID];
    //
    //         let sqlQuery = mysql.format(query, inserts);
    //         dataBase.query(sqlQuery, function (error, data, fields) {
    //             if (!error) {
    //                 output.success = true;
    //                 output.user = data;
    //             } else {
    //                 output.errors = error;
    //             }
    //             console.log(output)
    //             return output;
    //             // console.log(JSON.stringify(output));
    //             // res.json(output);
    //         });
    //     }
    //
    //     function addAthleteToCoachTable(athleteInfoId) {
    //         let query = "INSERT INTO coaches (athlete_id) VALUES (?);";
    //         let inserts = [athleteInfoId];
    //
    //         let sqlQuery = mysql.format(query, inserts);
    //         dataBase.query(sqlQuery, function (error, data, fields) {
    //             if (!error) {
    //                 output.success = true;
    //                 output.user = data;
    //             } else {
    //                 output.errors = error;
    //             }
    //             return output;
    //             // console.log(JSON.stringify(output));
    //             // res.json(output);
    //         });
    //     }
    //
    // });

};