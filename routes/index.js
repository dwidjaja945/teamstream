module.exports = function(webserver, dataBase, mysql) {
    require("./create_team")(webserver, dataBase, mysql);

    require("./join_team")(webserver, dataBase, mysql);

    require("./create_athlete_info")(webserver, dataBase, mysql);

    // require("./athlete_profile")(webserver, dataBase, mysql);

    // endpoint for roster
    require("./roster")(webserver, dataBase, mysql);

    // endpoint for bulletin board
    require("./bulletin_board")(webserver, dataBase, mysql);

    require("./pinned")(webserver, dataBase, mysql);

    require("./logout")(webserver, dataBase, mysql);
}


