
module.exports = {
    getPortraits: (req, res) => {
        const db = req.app.get("db");
        db.get_portraits()
        .then(portraits => res.status(200).send(portraits))
        .catch(err => console.log(err))
    },

    updatePortrait: (req, res) => {
        const db = req.app.get("db");
        db.update_portrait([req.body.name, req.session.user.user_id])
        .then(portrait => {
            //console.log(portraits[0])
            req.session.user = portraits[0]
            res.status(200).send(req.session.user)
        })
    }


}