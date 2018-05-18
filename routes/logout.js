module.exports = (webserver, dataBase, mysql) => {
    webserver.get('/api/logout', (req, res) => {
        req.session.destroy((err) => {
            if(!err) {
                res.redirect('/');
            } else {
                res.json(err);
            }
        });
    })
}