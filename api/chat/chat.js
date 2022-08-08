module.exports = {
  chat: (req, res, next) => {
    try {
      const db = req.app.get("db");
      const set = req.app.get("set");
      const ref = req.app.get("ref");
      const timestamp = Date.now();
      set(ref(db, process.env.dbTable + timestamp), {
        msg: req.body.msg,
        username: req.body.username,
      })
        .then(() => {
          res.status(200).send(req.body);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};
