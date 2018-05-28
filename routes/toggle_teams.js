module.exports = ( webserver , dataBase , mysql ) => {
    
    webserver.post( '/api/toggle_teams' , ( req , res ) => {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if (req.session.user_id === undefined) {
            output.redirect = "/login_page";
            output.errors = "User not logged in";
            res.json(output);
            res.end();
            return;
        }
        console.log('Toggle Team, Current Team ID: ', req.session.team_id)
        console.log('Toggle Team, Team ID to become: ', req.body.team_id)
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
                // output.redirect = '/bulletin_board';
                req.session.athlete_id = data[0].athlete_id;
                req.session.team_id = req.body.team_id;
                console.log("toggle team data: ", data)
            } else {
                output.errors = err;
            }

            res.json(output);

        });

    })
}