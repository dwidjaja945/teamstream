const express = require('express');
const mysql = require('mysql');
const session = require("express-session");
const expressValidator = require("express-validator");
const cookieParser = require('cookie-parser');
const path = require('path');
const { body } = require('express-validator/check');
const error = require('./middleware/error');
const winston = require("winston");

winston.add(
  new winston.transports.File({
    filename: "logfile.log",
    handleExceptions: true
  })
);

const webserver = express();

const { credentials, encrypt } = require('./config/mysqlcredentials.js');
const dataBase = mysql.createConnection(credentials);

const bodyParser = require('body-parser');

webserver.use(bodyParser.urlencoded({ extended: false }));
webserver.use(bodyParser.json());
webserver.use(cookieParser());

webserver.use(express.static(path.join(__dirname, 'client', 'dist')));

webserver.use(expressValidator());
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
    if (error) throw new Error("Could not connect to Database. " + error);
    console.log("Created connection to database");
});

webserver.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test_ajax.html');
});

require("./routes/signup")(webserver, dataBase, mysql, encrypt);

require("./session.js")(webserver, dataBase, mysql, encrypt);

require("./routes")(webserver, dataBase, mysql );

webserver.use(error);

webserver.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

webserver.listen(9000, () => {
    console.log("Server listening on 9000");
}).on('error', (error) => {
    console.log('Server Error: ', error.message);
    throw new Error(" Server Error: " + error );
});