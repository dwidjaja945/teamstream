const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const webserver = express();

const credentials = require('./config/mysqlcredentials.js');
const dataBase = mysql.createConnection(credentials);

const bodyParser = require('body-parser');

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());

webserver.use(cors());

webserver.use(session({
  secret: 'test_secret'
}));

webserver.use(express.static(__dirname + '/' + 'client'));

dataBase.connect(error => {
  if (error) throw error;
  console.log("Created connection to database");
});

require("./session.js")(webserver, dataBase, mysql, session);

require("./routes/signup")(webserver, dataBase, mysql, session);

require('./routes/athlete_profile')(webserver, dataBase, mysql);

// endpoint for roster
// require('./routes/roster')(webserver, dataBase, mysql);

// endpoint for bulletin board
require('./routes/bulletin_board')(webserver, dataBase, mysql);


webserver.listen(3000, () => {
    console.log("Server listening on 3000");
}).on('error', (error) => {
  console.log('Server Error: ' , error.message);
})