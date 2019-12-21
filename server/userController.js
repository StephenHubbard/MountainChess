module.exports = {
  getUser: (req, res) => {
    const db = req.app.get("db");
      db.get_users()
      .then(result => {
        res.status(200).send(result)
      })
  },

  addFriend: (req, res) => {
    const {loggedInUser} = req.body;
    const {user_id_display} = req.params;
    const db = req.app.get('db');
    // console.log(loggedInUser, user_id_display)
    db.add_friend([loggedInUser, user_id_display])
    .then(() => {
      res.status(200)
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
  },

  checkFriend: (req, res) => {
    const db = req.app.get('db');
    const {loggedInUser} = req.body;
    const {user_id_display} = req.params;
    db.check_friend([loggedInUser, user_id_display])
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => console.log(err))
  }, 

  getUserFriends: (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.body
    db.get_user_friends(user_id)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => console.log(err))
  },

  checkIfSame: (req, res) => {
    const db = req.app.get('db');
    const {user_id_display} = req.params;
    db.check_if_same(user_id_display)
    .then(result => {
      res.status(200).send(result)
    })
    .catch( err => {
      console.log(err)
    })
    .catch(er => console.log(err))
  },

  getTopUsers: (req, res) => {
    console.log("hit")
    const db = req.app.get("db")
      db.get_top_users()
      .then(result => {
        res.status(200).send(result)
      })
  }

}