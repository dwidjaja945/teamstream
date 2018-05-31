
module.exports = function ( webserver , dataBase , mysql ) {

    // =================================
    // ====== Create Athlete Info ======
    // =================================
    /**
     *  Takes:
     *      first_name,
     *      last_name,
     *      age,
     *      weight,
     *      height,
     *      url,
     *      bio
     * 
     *  returns:
     *      success: true
     *      insertID: #
     *      redirect: ''
     */
    webserver.post('/api/create_athlete_info', (req , res ) => {
        const slashes=require('slashes');
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

        if(req.body) {
            var { first_name , last_name , age , weight , height, url, bio } = req.body;
        }

        let user_id = req.session.user_id;

        let query = `INSERT INTO \`athlete_info\` 
        (\`athlete_info_id\`, 
        \`first_name\`, 
        \`last_name\`, 
        \`height\`, 
        \`weight\`, 
        \`img_url\`, 
        \`age\`, 
        \`bio\`,
        \`user_id\`) 
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let inserts = [first_name, last_name, height, weight, url, age, bio, user_id];

        // adding slashes for all the inputs
        for( let i = 0 ; i < inserts.length ; i++ ) {
            inserts[i] = slashes.add(inserts[i]);
        }

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query( mysqlQuery , (err, data, fields) => {
            if(!err) {
                // console.log('create athlete info query data', data);
                output.success = true;
                output.data = data;
                req.session.athlete_info_id = data.insertId;
                addAthleteToAthletesTable();
            } else {
                // console.log('create athlete info error', err)
                output.errors = err;
            }
        });

        function addAthleteToAthletesTable() {
            let query = `INSERT INTO \`athletes\` 
                (\`athlete_info_id\` , \`team_id\`)
                VALUES (? , NULL)`;

            let inserts = [req.session.athlete_info_id];

            let mysqlQuery = mysql.format(query, inserts);

            dataBase.query( mysqlQuery , (err, data, fields) => {
                if(!err) {
                    // console.log(`Added athlete_info_id ${req.session.athlete_info_id} to athlete table with id: ${data.insertId}`);
                    output.success = true;
                    output.data = data;
                    req.session.athlete_id = data.insertId;
                    output.redirect = '/fork_nav';
                    // console.log('create_athlete_info post-session: ', req.session)
                } else {
                    // console.log('create athlete info error', err);
                    output.errors = err;
                };

                res.json(output);

            });
        };

    });
};