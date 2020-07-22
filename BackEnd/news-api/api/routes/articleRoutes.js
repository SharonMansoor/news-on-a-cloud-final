module.exports = function(app) {
    var articles = require('../controllers/articleController');
  
    // todoList Routes
    app.route('/articles')
      .get(articles.get_all_articles)
      .post(articles.save_article);
  
    app.route('/articles/:id')
      .get(articles.get_article_by_id);
  };