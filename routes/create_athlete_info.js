const { check, validationResult } = require("express-validator/check");

module.exports = function ( webserver , dataBase , mysql ) {

    webserver.post('/api/create_athlete_info', [
        check('first_name').isEmpty().matches(/^[a-zA-Z]*$/),
        check('last_name').isEmpty().matches(/^[a-zA-Z]*$/),
        check('age').matches(/^[0-9]{0, 2}$/)
    ] , (req , res ) => {
        const errors = validationResult(req);
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };

        if( !errors.isEmpty() ) {
            output.errors = errors.array;
            res.json(output);
            return;
        }
        
        if (req.body) {
            var firstName = req.body.first_name;
            var lastName = req.body.last_name;
            var age = req.body.age;
            var weight = req.body.weight;
            var height = req.body.height;
        }

        console.log('Create Profile Request Body', req.body);

        let user_id = req.session.user_id;

        let query = `INSERT INTO \`athlete_info\` 
        (\`athlete_info_id\`, 
        \`first_name\`, 
        \`last_name\`, 
        \`height\`, 
        \`weight\`, 
        \`img_url\`, 
        \`age\`, 
        \`user_id\`) 
        VALUES (NULL, ?, ?, ?, ?, '', ?, ?)`;

        let inserts = [firstName, lastName, height, weight, age, user_id];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query( mysqlQuery , (err, data, fields) => {
            if(!err) {
                console.log('create athlete info query data', data);
                output.success = true;
                output.data = data;
                output.redirect = '/create_team';
            } else {
                console.log('create athlete info error', err)
                output.errors = err;
            }

            res.json(output);
        })
    })
};