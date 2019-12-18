module.exports = {
  getUser: (req, res) => {
    const db = req.app.get("db");
      db.get_user()
      .then(result => {
        res.status(200).send(result)
        console.log(result)
      })
  }
}