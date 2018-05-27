const { check, validationResult } = require("express-validator/check");

module.exports = function ( webserver , dataBase , mysql ) {
    // [
    //     check('first_name').isEmpty().matches(/^[a-zA-Z]*$/),
    //     check('last_name').isEmpty().matches(/^[a-zA-Z]*$/),
    //     check('age').matches(/^[0-9]{0,2}$/),
    //     check('height').matches(/^[0-9]*$/),
    //     check('weight').matches(/^[0-9]*$/)
    // ]

    webserver.post('/api/create_athlete_info', (req , res ) => {
        const errors = validationResult(req);
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

        if(req.body) {
            var { first_name , last_name , age , weight , height , bio } = req.body;
        }
        // if (req.body) {
        //     var firstName = req.body.first_name;
        //     var lastName = req.body.last_name;
        //     var age = req.body.age;
        //     var weight = req.body.weight;
        //     var height = req.body.height;
        //     var athlete_bio = req.body.athlete_bio;
        // }

        // console.log('Create Profile Request Body', req.body);

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
        VALUES (NULL, ?, ?, ?, ?, '', ?, ?, ?)`;

        let inserts = [first_name, last_name, height, weight, age, bio, user_id];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query( mysqlQuery , (err, data, fields) => {
            if(!err) {
                // console.log('create athlete info query data', data);
                output.success = true;
                output.data = data;
                req.session.athlete_info_id = data.insertId;
                addAthleteToAthletesTable();
            } else {
                console.log('create athlete info error', err)
                output.errors = err;
            }
        });

        function addAthleteToAthletesTable() {
            let query = `INSERT INTO \`athletes\` 
                (\`athlete_info_id\`)
                VALUES (?)`;

            let inserts = [req.session.athlete_info_id];

            let mysqlQuery = mysql.format(query, inserts);

            dataBase.query( mysqlQuery , (err, data, fields) => {
                if(!err) {
                    console.log(`Added athlete_info_id ${req.session.athlete_info_id} to athlete table with id: ${data.insertId}`);
                    output.success = true;
                    output.data = data;
                    req.session.athlete_id = data.insertId;
                    output.redirect = '/fork_nav';
                    console.log('create_athlete_info post-session: ', req.session)
                } else {
                    console.log('create athlete info error', err);
                    output.errors = err;
                }

                res.json(output);
            })
        }

    })
};