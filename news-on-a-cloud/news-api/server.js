
const express = require ("express")
var db = require('./pool');
const cors = require ('cors');
const path = require("path");

const app = express();
app.use('/',express.static(path.join(__dirname, "..", "build")));
app.use(express.json())
app.use(cors());


//app.use(express.static("public"));

const ArticleRoutes = require('./api/routes/articleRoutes');
const CategoriesRoutes = require('./api/routes/categoryRouter');
ArticleRoutes(app);
CategoriesRoutes(app);

app.listen(80, () => console.log("Web server is listening.. on port 8080"))

start()

async function start() {
  await db.connect();
}

// app.get("/articles", async (req, res) => {
//   const rows = await get_all_articles()
//   res.setHeader("content-type", "application/json")
//   res.send(JSON.stringify(rows))
// })

