module.exports = function (webserver, dataBase, mysql) {

    webserver.post('/api/create_athlete_info', function (req , res ) {
        const output = {
            success: false,
            data: [],
            errors: [],
            redirect: ''
        };
        if (req.body) {
            let firstName = req.body.first_name;
            let lastName = req.body.last_name;
            let age = req.body.age;
            let weight = req.body.weight;
            let height = req.body.height;
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
        VALUES (NULL, '?', '?', '?', '?', '', '?', '?')`;

        let inserts = [firstName, lastName, height, weight, age, user_id];

        let mysqlQuery = mysql.format(query, inserts);

        dataBase.query( mysqlQuery , (err, data, fields) => {
            if(!err) {
                output.success = true;
                output.data = data;
                output.redirect = '/create_team';
            } else {
                output.errors = err;
            }

            
        })
    })
};