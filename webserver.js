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

webserver.use(express.static(__dirname + '/' + 'client' + '/dist'));

webserver.use(session({
    secret: 'test_secret',
    // cookie: {
    //     path:'/',
    //     secure: false,
    //     httpOnly: false,
    // },
    // proxy:true,
    // saveUninitialized: true,
    // resave: false,
}));

dataBase.connect(error => {
    if (error) throw error;
    console.log("Created connection to database");
});

webserver.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test_ajax.html');
});

// maybe create middleware to check if user is logged in?

require("./session.js")(webserver, dataBase, mysql);

require("./routes/signup")(webserver, dataBase, mysql);

require('./routes/create_athlete_info')(webserver, dataBase, mysql);

require('./routes/athlete_profile.depreciated')(webserver, dataBase, mysql);

// endpoint for roster
require('./routes/roster')(webserver, dataBase, mysql);

// endpoint for bulletin board
require('./routes/bulletin_board')(webserver, dataBase, mysql);

require("./routes/pinned")(webserver, dataBase, mysql);

require('./routes/logout')(webserver, dataBase, mysql);

webserver.get('*', (req, res) => {
    res.sendFile(__dirname + "/client" + "/dist" + "/index.html");
});

webserver.listen(9000, () => {
    console.log("Server listening on 9000");
}).on('error', (error) => {
    console.log('Server Error: ', error.message);
});