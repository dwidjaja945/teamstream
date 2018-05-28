const slashes = require('slashes');

module.exports = ( webserver , dataBase , mysql ) => {
    
    // ==============================
    // ==== update athlete stats ====
    // ==============================
    function updateAthleteStats( req , res , output ) {
        return new Promise((resolve, reject) => {
            const { athlete_id } = req.session;

            let update_athlete_stats_query = `INSERT INTO stats
                (
                    stat_id,
                    stat_name,
                    stat_value, 
                    athlete_id
                )
                VALUES`;

            let update_athlete_stats_inserts = [];

            console.log('the request body: ', req.body)

            // Inserting all potential stat entries into sql query
            for (let statIndex = 0; statIndex < req.body.customStatsArray.length; statIndex++) {
                const stat_name = req.body.customStatsArray[statIndex].stat_name;
                const stat_value = req.body.customStatsArray[statIndex].stat_value;
                // const { stat_name, stat_value } = req.body.customStatsArray[statIndex];
                let stat_id = req.body.customStatsArray[statIndex].stat_id;
                // let { stat_id } = req.body.customStatsArray[ statIndex ];

                update_athlete_stats_query += " (?,?,?,?)";
                update_athlete_stats_query += statIndex === req.body.customStatsArray.length - 1 ? "" : ",";

                // check to see if a stat_id has been provided or not.
                if (isNaN(stat_id)) {
                    stat_id = 'null';
                };
                update_athlete_stats_inserts.push(stat_id, stat_name, stat_value, athlete_id);
            };

            // Adding the ON DUPLICATE KEY UPDATE part of query
            update_athlete_stats_query += ` ON DUPLICATE KEY UPDATE 
                stat_name = VALUES(stat_name),
                stat_value = VALUES(stat_value)`;


            let mysqlQuery = mysql.format(update_athlete_stats_query, update_athlete_stats_inserts);

            dataBase.query(mysqlQuery, (err, data, fields) => {
                if (!err) {
                    output.insertIds = {
                        insertStart: data.insertId,
                        rowsAffected: data.affectedRows,
                    }

                    let deleteAthleteStatsQuery = `
                        DELETE FROM stats 
                        WHERE (stat_name, stat_value) 
                        IN (('', ''))`;

                    dataBase.query(deleteAthleteStatsQuery, (err, data, fields) => {
                        if (!err) {
                            output.updateAthleteStatsData = data;
                            return resolve(data);
                            // output.success = true;
                            // output.redirect = "/athlete_profile";
                        } else {
                            output.updateAthleteStatsErrors = err;
                            return reject(data);
                        };
                    })
                    // output.data = data;
                } else {
                    output.errors = err;
                    return reject(err);
                }
            });
        });
    };

    // ==============================
    // ==== update athlete info =====
    // ==============================
    function updateAthleteInfo( req , res , output ) {
        return new Promise((resolve, reject) => {
            let { first_name, last_name, age, height, weight, bio } = req.body;
            let { athlete_info_id } = req.session;

            let update_athlete_info_query = `UPDATE athlete_info
                SET first_name = ?,
                    last_name = ?,
                    age = ?,
                    height = ?,
                    weight = ?,
                    bio = ?
                WHERE athlete_info_id = ?`;

            let update_athlete_info_inserts = [first_name, last_name, age, height, weight, bio, athlete_info_id];

            for (let i = 0; i < update_athlete_info_inserts.length; i++) {
                update_athlete_info_inserts[i] = slashes.add(update_athlete_info_inserts[i]);
            }

            let update_athlete_info_mysqlQuery = mysql.format(update_athlete_info_query, update_athlete_info_inserts);

            dataBase.query(update_athlete_info_mysqlQuery, (err, data, fields) => {
                if (!err) {
                    output.updateAthleteInfoData = data
                    return resolve(data);
                } else {
                    output.updateAthleteInfoErrors = err
                    return reject(err);
                };
            });
        })
    };


    // ==============================
    // ==== Start Endpoints here ====
    // ==============================

    /**
     * Takes : {
     *    first_name,
     *    last_name,
     *    age,
     *    height,
     *    weight,
     *    bio
     *    stat_id
     *    stat_name
     *    stat_value
     *    athlete_id
     * }
     * 
     * Returns:
     *   success: true
     *   insertId
     */
    webserver.post( '/api/edit_athlete_stats' , ( req , res ) => {
        // console.log("edit athlete stats body: ", req.body)
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        };

        function handleSuccess(data , output ) {
            output.success = true;
            output.data = data;
            output.redirect = '/athlete_profile';
            console.log('handleSuccess output: ' , output);
            res.json(output);
        };

        function handleError(errors , output ) {
            output.errors = errors;
            console.log("handleError output: ", output);
            res.json(output);
        }
        Promise.all([updateAthleteInfo( req , res , output ), updateAthleteStats( req , res , output )]).then( data => { handleSuccess(data, output) } ).catch( errors => { handleError(errors, output) } );

    });

    webserver.delete('/api/delete_athlete_stat', (req, res) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = '/login_page';
            output.errors = 'User not logged in';
            res.json(output);
            res.end();
            return;
        }

        let { stat_id, athlete_id } = req.body;

        let query = `DELETE FROM \`stats\` 
        WHERE \`stat_id\` = ?
        AND \`athlete_id\` = \`athlete_id\``;

        let inserts = [stat_id];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query(mysqlQuery, (err, data, fields) => {
            if (!err) {
                output.success = true;
                output.data = data;
                output.message = "Stat Deleted";
                // output.redirect = '/athlete_profile'  // Might not need to redirect since will still be on edit page
            } else {
                output.errors = err;
            }
            res.json(data);
        });
    });

    //==========================
    //====End module.exports====
    //==========================
};


    // This end point is no longer necessary since it is handled in the /api/edit_athlete_stats endpoint

    // /**
    //  * Takes : {
    //  *    stat_name
    //  *    stat_value
    //  *    athlete_id
    //  * }
    //  * 
    //  * Returns:
    //  *   success: true
    //  */
    // webserver.post( '/api/update_athlete_stats' , ( req , res ) => {
    //     const output = {
    //         success: false,
    //         data: [],
    //         errors: [],
    //         redirect: ''
    //     };

    //     if (req.session.user_id === undefined) {
    //         output.redirect = '/login_page';
    //         output.errors = 'User not logged in';
    //         res.json(output);
    //         res.end();
    //         return;
    //     }

    //     let { stat_name, stat_value, athlete_id, stat_id } = req.body;

    //     let query = ` UPDATE stats
    //         SET stat_name = ? , stat_value = ?
    //         WHERE athlete_id = ?
    //         AND stat_id = ?
    //         `;

    //     let inserts = [ stat_name, stat_value, athlete_id, stat_id ];

    //     let mysqlQuery = mysql.format( query , inserts );

    //     dataBase.query( mysqlQuery , ( err , data , fields ) => {
    //         if(!err) {
    //             output.success = true;
    //             output.data = data;
    //             output.redirect = "/athlete_profile";
    //         } else {
    //             output.errors = err;
    //         };

    //         res.json(err);
    //     });
    // });
