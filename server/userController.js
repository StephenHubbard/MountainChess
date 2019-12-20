module.exports = {
  getUser: (req, res) => {
    const db = req.app.get("db");
      db.get_users()
      .then(result => {
        res.status(200).send(result)
      })
  },

  addFriend: (req) => {
    
    const db = req.app.get('db');
    db.add_friend()
    .then(res => {
      res.sendStatus(200)
    })
    .catch(er => console.log(err))
  },

  getTopUsers: (req, res) => {
    const db = req.app.get("db")
      db.get_top_users()
      .then(result => {
        console.log(result)
        res.status(200).send(result)
      })
  }
}