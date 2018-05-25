module.exports = ( webserver , dataBase , mysql ) => {
    
    webserver.post( '/api/toggle_teams' , ( req , res ) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = "/login";
            output.errors = "User not logged in";
            res.json(output);
            res.end();
            return;
        }

        let { athlete_info_id } = req.session;
        let team_id = req.body.team_id;
        req.session.team_id = team_id;

        let query = `
            SELECT athletes.athlete_id
            FROM athletes
            WHERE athlete_info_id = ?
            AND team_id = ?
        `;

        let inserts = [ athlete_info_id , team_id ];

        let mysqlQuery = mysql.format( query , inserts );

        dataBase.query( mysqlQuery , ( err , data , fields ) => {
            let athlete_id;
            if(!err) {
                output.success = true;
                output.data = data;
                req.session.athlete_id = data.athlete_id;
            } else {
                output.errors = err;
            }

            res.json(output);

        });

    })
}