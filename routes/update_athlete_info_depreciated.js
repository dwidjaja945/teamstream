const slashes = require("slashes");
const asyncMiddleware = require("../middleware/async");

module.exports = ( webserver , dataBase , mysql ) => {

    /**
     * Takes:
     *      first_name,
     *      last_name,
     *      age,
     *      height,
     *      weight, 
     *      bio
     *      stat_name,
     *      stat_value
     *      stat_id
     * 
     *  Returns:
     *      success: true
     *      redirect: ''
     */

    webserver.post( '/api/update_athlete_info' , asyncMiddleware(( req , res ) => {
        console.log('Updating athlete info of athlete', req.session.athlete_id);
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
        }

        let {first_name, last_name, age, height, weight, bio} = req.body;
        const athlete_info_id=req.session.athlete_info_id;

        let query = `UPDATE athlete_info
            SET first_name = ?,
                last_name = ?,
                age = ?,
                height = ?,
                weight = ?,
                bio = ?
            WHERE athlete_info_id = ?
        `;

        let inserts = [first_name, last_name, age, height, weight, bio, athlete_info_id];

        for (let i = 0; i < inserts.length; i++) {
            inserts[i] = slashes.add(inserts[i]);
        }

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query( mysqlQuery , asyncMiddleware(( err , data , fields ) => {
            if(!err) {
                output.success = true;
                // output.data = data;
                output.redirect = '/athlete_profile'
            } else {
                output.errors = err;
            }
            console.log('edit athlete output: ',output)
            res.json(output);
        }));

            // This query will update the athlete_info table.
            // within it, there will be another query to update the stats table.

            //===========================
            //=========ISSUE=============
            //===========================
            // Cannot have client provide an array within an object. Can only do one or the other.
            // client do two calls to separate end points?

            // Initial issue resolved.
            // might be able to do insert and update within a single query call. working on prototype before implementation.

            // dataBase.query( mysqlQuery , ( err, data, fields ) => {
            //     if (err) throw err;
            //     console.log( 'update athlete_info table data : ' , data);
            //
            //     let statsInfo = "";
            //
            //     let { statsArray } = req.body;
            //     statsArray = JSON.parse(statsArray);
            //
            //     // This sql query is to insert and update stats with a single query.
            //     // It works when client side provides the stat id that goes with the associated stat they are trying to update.
            //     // If they are not updating, but adding a stat instead, null is provided for stat_id
            //
            //     // INSERT INTO stats(stat_id, stat_name, stat_value, athlete_id)
            //     // VALUES(5, '2k', '7:00', 9),
            //     //     (9, '10k', '38:00', 9),
            //     //     (null, '5k', '18:00', 9)
            //     // ON DUPLICATE KEY UPDATE
            //     // stat_name = VALUES(stat_name),
            //     //     stat_value = VALUES(stat_value)
            //
            //     for (let statIndex = 0; statIndex < statsArray.length ; statIndex++ ) {
            //         const { stat_name , stat_value } = statsArray[ statIndex ];
            //
            //         if (statIndex !== statsArray.length -1 ) {
            //             statsInfo = `${statsInfo} stat_name = ${stat_name}, stat_value = ${stat_value},`;
            //         } else {
            //             statsInfo = `${statsInfo} stat_name = ${stat_name}, stat_value = ${stat_value}`;
            //         }
            //     }
            //
            //     let updateQuery = `UPDATE stats SET${statsInfo}`;
            //
            //     let { athlete_id } = req.body;
            //
            //     let query = updateQuery + " WHERE athlete_id = " + athlete_id;
            //
            //     // query to update stats
            //     dataBase.query( query , ( err, data, fields ) => {
            //
            //         if(!err) {
            //             output.success = true;
            //             output.data = data;
            //             output.redirect = '/athlete_profile';
            //         } else {
            //             output.errors = err;
            //         }
            //
            //         res.json(output);
            //
            //     } )
            //
            // })

    }));

    function addSlashes( insertArray ) {
        for (let i = 0; i < insertArray.length; i++) {
            insertArray[i] = slashes.add(insertArray[i]);
        }
        return insertArray;
    };
};