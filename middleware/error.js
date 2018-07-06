const winston = require("winston");

module.exports = function (err, req, res, next) {
    let date = new Date;
    err.date = date.toLocaleString();
    winston.error(err.message, err);
    res.status(500).send("Error occured");
}