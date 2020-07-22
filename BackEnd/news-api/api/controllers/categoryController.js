var db = require("../../pool");
var pool = db.getPool();

exports.get_all_categories = async function (req, res) {
  try {
    const results = await pool.query(
      "select id, name from article_Categories"
    );
    res.json(results.rows);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.add_category = async function (req, res) {
    try {
      const results = await pool.query(
        "insert into article_Categories (name) values ($1)",
        [req.body.name]
      );
      res.json(results);
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  };