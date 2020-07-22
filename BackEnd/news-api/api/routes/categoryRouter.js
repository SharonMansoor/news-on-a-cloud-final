module.exports = function(app) {
    var categories = require('../controllers/categoryController');
  
    // todoList Routes
    app.route('/category')
      .get(categories.get_all_categories)
      .post(categories.add_category)
  };