
const express = require ("express")
var db = require('./pool');
const cors = require ('cors');

const app = express();
app.use(express.json())
app.use(cors());

const ArticleRoutes = require('./api/routes/articleRoutes');
const CategoriesRoutes = require('./api/routes/categoryRouter');
ArticleRoutes(app);
CategoriesRoutes(app);

app.listen(8080, () => console.log("Web server is listening.. on port 8080"))

start()

async function start() {
  await db.connect();
}

// app.get("/articles", async (req, res) => {
//   const rows = await get_all_articles()
//   res.setHeader("content-type", "application/json")
//   res.send(JSON.stringify(rows))
// })

