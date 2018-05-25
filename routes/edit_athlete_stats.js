module.exports = ( webserver , dataBase , mysql ) => {

    /**
     * Takes : {
     *    stat_name
     *    stat_value
     *    athlete_id
     * }
     * 
     * Returns:
     *   success: true
     *   insertId
     */
    webserver.post( '/api/add_athlete_stats' , ( req , res ) => {
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

        let { stat_name , stat_value , athlete_id } = req.body;

        let query = `INSERT INTO stats
            (
                stat_name,
                stat_value, 
                athlete_id
            )
            VALUES (
                ?,
                ?,
                ?
            )`;

        let inserts = [stat_name, stat_value, athlete_id];

        let mysqlQuery = mysql.format( query , inserts );

        dataBase.query( mysqlQuery , ( err , data , fields ) => {
            if(!err) {
                output.success = true;
                output.data = data;
                output.statId = data.insertId
                output.redirect = '/athlete_profile'
            } else {
                output.errors = err;
            }
            res.json(data);
        });
    });


    /**
     * Takes : {
     *    stat_name
     *    stat_value
     *    athlete_id
     * }
     * 
     * Returns:
     *   success: true
     *   insertId
     */
    webserver.post( '/update_athlete_stats' , ( req , res ) => {
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

        let { stat_name, stat_value, athlete_id } = req.body;

        let query = ` UPDATE stats
            SET stat_name = ? , stat_value = ?
            WHERE athlete_id = ?
            `;

        let inserts = [ stat_name, stat_value, athlete_id ];

        let mysqlQuery = mysql.format( query , inserts );

        dataBase.query( mysqlQuery , ( err , data , fields ) => {
            if(!err) {
                output.success = true;
                output.data = data;
                output.redirect = "/athlete_profile";
            } else {
                output.errors = err;
            };

            res.json(err);
        });
    })
};