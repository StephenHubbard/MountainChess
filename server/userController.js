module.exports = {
  getUser: (req, res) => {
    const db = req.app.get("db");
      db.get_users()
      .then(result => {
        res.status(200).send(result)
      })
  },

  addFriend: (req) => {
    const {loggedInUser} = req.body;
    const {user_id} = req.params;
    const db = req.app.get('db');
    db.add_friend([loggedInUser, user_id])
    .then(res => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
  },

  findUser: (req, res) => {
    const db = req.app.get('db');
    const {username} = req.body;
    db.find_user(username)
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => console.log(err))
  }
}