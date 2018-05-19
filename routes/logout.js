module.exports = (webserver, dataBase, mysql) => {
    webserver.get('/api/logout', (req, res) => {
        const output = {
            success: false,
            redirect: '',
        }
        req.session.destroy((err) => {
            if(!err) {
                output.redirect = '/login';
                output.success = true;
                res.json(output);
            } else {
                res.json(err);
            }
        });
    })
}