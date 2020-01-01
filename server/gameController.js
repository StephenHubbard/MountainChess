
module.exports = {
    newMove: (req, res) => {
        // console.log(req.body)
        // combines what I got with req.body and combines the strings to the correct postgres table format
        const before = req.body.move1
        const after = req.body.move2
        const user_id = req.body.user_id

        const db = req.app.get('db')
        db.new_move({ before, after, user_id })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    },
    updateGameArray: (req, res) => {
        // console.log(req.body.fen)
        const db = req.app.get('db')
        placement = req.body.placement
        // console.log(placement)
        db.update_game_array({ placement })
        .then(result => {
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