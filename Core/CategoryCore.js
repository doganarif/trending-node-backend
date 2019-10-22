const { Category } = require("../database");

getCategories = () => {
  Category.findAll()
    .then(data => {
    //   console.log(data, "In function log");
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getCategories
};
