var db = require("../../pool");
var pool = db.getPool();
const defaultImg = "wi-fi-512.png";

exports.get_all_articles = async function (req, res) {
  try {
    const results = await pool.query(
      "select a.id, a.time, a.views, c.name as category, a.content, a.img, a.writer, a.title from articles a, article_Categories c where a.category = c.id"
    );
    res.json(results.rows);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

exports.get_article_by_id = async function (req, res) {
  try {
    await increase_article_view(req.params.id);
    const results = await pool.query(
      "select a.id, a.time, a.views, c.name as category, a.content, a.img, a.writer, a.title, a.body from articles a, article_Categories c where a.category = c.id and a.id = $1",
      [req.params.id]
    );
    res.json(results.rows);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const increase_article_view = async function (id) {
  try {
    const results = await pool.query(
      "update articles set views = views+1 where id = $1",
      [id]
    );
  } catch (e) {
    console.log(e);
  }
};

exports.save_article = async function (req, res) {
  try {
    const article = req.body;
    const results = await pool.query(
      "insert into articles (title, writer, category, content, body, img, views, time) values ($1,$2,$3,$4,$5,$6,0, $7)",
      [article.title, article.writer, article.category, article.content, article.body, defaultImg, new Date()]
    );
    res.json(results);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};
