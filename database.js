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
const PhotoModel = require("./Model/Photo");
const CompanyPhotoModel = require("./Model/CompanyPhoto");
const CommentModel = require("./Model/Comment");
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

const Comment = CommentModel(sequelize, Sequelize);
const CompanyPhoto = CompanyPhotoModel(sequelize, Sequelize);
const Photo = PhotoModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const City = CityModel(sequelize, Sequelize);
const Company = CompanyModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Town = TownModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize);
const CardProduct = CardProductModel(sequelize, Sequelize);

Product.belongsToMany(Card, { through: CardProduct });
Card.belongsToMany(Product, { through: CardProduct });
Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(Comment, { foreignKey: "product_id" });
Company.hasMany(CompanyPhoto, { foreignKey: "company_id" });
Product.hasMany(Photo, { foreignKey: "product_id" });
Category.hasMany(Category, { foreignKey: "parent_id" });
Category.hasMany(Product, { foreignKey: "parent_id" });
Town.belongsTo(City, { foreignKey: "city_id" });
Company.hasMany(Product, { foreignKey: "company_id" });
Product.belongsTo(Company, { foreignKey: "company_id" });
Product.belongsTo(Town, { foreignKey: "town_id" });

module.exports = {
  sequelize,
  Category,
  CompanyPhoto,
  Photo,
  User,
  City,
  Company,
  Comment,
  Product,
  Card,
  Town,
  CardProduct
};
