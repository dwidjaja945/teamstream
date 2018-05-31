const bcrypt = require("bcrypt-nodejs");

exports.credentials = {
    host: 'host',
    user: 'user',
    password: 'password',
    database: 'database',
    port: port
}

exports.encrypt = {
    saltRounds : bcrypt.genSaltSync( # ),
    hash: bcrypt.hash,
    compare : bcrypt.compare
};