const Sequelize = require("sequelize");

// const VPNModel = require('./Model/VPN')
const CategoryModel = require("./Model/Category");
const CityModel = require("./Model/City");
const CompanyModel = require("./Model/Company");
const ProductModel = require("./Model/Product");
const TownModel = require("./Model/Town");
const UserModel = require("./Model/User");
const CardModel = require("./Model/Card");
const CardProductModel = require("./Model/CardProduct");

const sequelize = new Sequelize("school_system", "root", "afoafoafo1A.", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.sync().then(() => {
  console.log("Veritabanina Baglanildi.");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.log("Cannot connected", err);
  });

const Category = CategoryModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const City = CityModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Town = TownModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize);
const CardProduct = CardProductModel(sequelize, Sequelize);

Category.hasMany(Product, { foreignKey: "parent_id", sourceKey: "UUID" });

// Subcategory.belongsTo(Category, { foreignKey: "parent_id", targetKey: "UUID" });
Town.belongsTo(City, { foreignKey: "city_id" });
Product.belongsTo(Company, { foreignKey: "company_id" });
CardProduct.belongsTo(Card, { foreignKey: "card_id" });
CardProduct.belongsTo(Product, { foreignKey: "prod_id" });
Product.belongsTo(Town, { foreignKey: "town_id" });

module.exports = {
  sequelize,
  Category,
  User,
  City,
  Company,
  Product,
  Town,
  CardProduct
};
