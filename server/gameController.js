let i = 0;

module.exports = {
    newMove: (req, res) => {
        // console.log(req.body)
        // combines what I got with req.body and combines the strings to the correct postgres table format
        const before = req.body.history[i].color + req.body.history[i].piece + req.body.history[i].from
        const after = req.body.history[i].color + req.body.history[i].piece + req.body.history[i].to

        i++
        const db = req.app.get('db')
        db.new_move({ before, after })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    },
    updateFen: (req, res) => {
        // console.log(req.body.fen)
        const db = req.app.get('db')
        fen_string = req.body.fen
        db.new_fen({ fen_string })
        .then(result => {
            result = fen_string
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }, 
    getLastGame: (req, res) => {
        const db = req.app.get('db')
        db.get_last_game()
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }
}