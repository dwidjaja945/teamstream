const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const webserver = express();

const credentials = require('./config/mysqlcredentials.js');
const dataBase = mysql.createConnection(credentials);

const bodyParser = require('body-parser');

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());
webserver.use(cookieParser());

webserver.use(cors());

webserver.use(session({
  secret: 'test_secret'
}));

webserver.use(express.static(__dirname + '/' + 'client'));

dataBase.connect(error => {
  if (error) throw error;
  console.log("Created connection to database");
});

webserver.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test_ajax.html');
});

require("./session.js")(webserver, dataBase, mysql, session);

require("./routes/signup")(webserver, dataBase, mysql, session);

require('./routes/athlete_profile')(webserver, dataBase, mysql);

// endpoint for roster
require('./routes/roster')(webserver, dataBase, mysql);

// endpoint for bulletin board
require('./routes/bulletin_board')(webserver, dataBase, mysql);

require('./routes/logout')(webserver, dataBase, mysql);

webserver.get('*', (req, res) => {
  res.sendFile(__dirname + "/client" + "/dist" + "/index.html");
});

webserver.listen(9000, () => {
    console.log("Server listening on 9000");
}).on('error', (error) => {
  console.log('Server Error: ' , error.message);
})