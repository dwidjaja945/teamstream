module.exports = ( webserver , dataBase , mysql , check) => {

    /**
     * Takes:
     *      team_name: ''
     *      sport_name: ''
     *      team_bio: ''
     *      team_code: ####
     *
     *  Returns:
     *      success: true
     *      insertID: #
     *      redirect: ''
     */

    webserver.post( '/api/create_team' , ( req , res ) => {

        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: []
        };

        let user_id;
        if(req.session.user_id !== undefined) {
            user_id = req.session.user_id;
        } else {
            output.redirect = "/login";
            output.errors = "User not logged in";
            res.json(output);
            res.end();
            return; 
        };

        let { team_name, sport_name, team_bio, team_code } = req.body;

        let query = `
            INSERT INTO teams
            (
                team_name,
                sport_name,
                team_bio,
                team_code
            )
            VALUES (
                ?,
                ?,
                ?,
                ?
            )`;
        
        let inserts = [ team_name , sport_name , team_bio , team_code ];

        let mysqlQuery = mysql.format( query , inserts );

        dataBase.query( mysqlQuery , ( err , data , fields ) => {

            if(!err) {
                
                output.success = true;
                output.data = data;
                output.redirect = "/bulletin_board";
                console.log("User created the team: ", team_name);
            } else {

                output.errors = err;
            }

            res.json(output);

        });

    } );

};