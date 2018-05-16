module.exports = function(webserver, dataBase, mysql, session) {
    webserver.post('/api/login', (req, res) => {
        req.session.isLoggedIn = true;
        res.end();
    })

    webserver.get('/api/check', (req, res) => {
        console.log("This is our session after login", req.session.isLoggedIn);
        res.end();
    })

}