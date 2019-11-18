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
const SehirModel = require("./Model/Sehir");
const IlceModel = require("./Model/Ilce");
const MahalleModel = require("./Model/Mahalle");
const SokakModel = require("./Model/Sokak");

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
const Company = CompanyModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize);
const CardProduct = CardProductModel(sequelize, Sequelize);
const Sehir = SehirModel(sequelize, Sequelize);
const Ilce = IlceModel(sequelize, Sequelize);
const Mahalle = MahalleModel(sequelize, Sequelize);
const Sokak = SokakModel(sequelize, Sequelize);

Sehir.hasMany(Ilce, {
  foreignKey: "ilce_sehirkey",
  sourceKey: "sehir_key",
  allowNull: false
});
Ilce.belongsTo(Sehir, {
  foreignKey: "ilce_sehirkey",
  targetKey: "sehir_key",
  allowNull: false
});
Ilce.hasMany(Mahalle, {
  foreignKey: "mahalle_ilcekey",
  sourceKey: "ilce_key",
  allowNull: false
});
Mahalle.belongsTo(Ilce, {
  foreignKey: "mahalle_ilcekey",
  targetKey: "ilce_key",
  allowNull: false
});

Mahalle.hasMany(Sokak, {
  foreignKey: "sokak_cadde_mahallekey",
  sourceKey: "mahalle_key",
  allowNull: false
});
Sokak.belongsTo(Mahalle, {
  foreignKey: "sokak_cadde_mahallekey",
  targetKey: "mahalle_key",
  allowNull: false
});

Company.belongsToMany(Card, { through: CardProduct, as: "company_id" });
Card.belongsToMany(Company, { through: CardProduct, as: "card_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(Company, { foreignKey: "company_id" });
Company.hasMany(Comment, { foreignKey: "company_id" });
Company.hasMany(CompanyPhoto, { foreignKey: "company_id" });
Category.hasMany(Category, { foreignKey: "parent_id" });
Category.hasMany(Company, { foreignKey: "parent_id" });
Company.hasMany(Product, { foreignKey: "company_id" });

Sehir.hasMany(Company, {
  foreignKey: "sehirId",
  sourceKey: "sehir_key",
  allowNull: false
});
Company.belongsTo(Sehir, {
  foreignKey: "sehirId",
  targetKey: "sehir_key",
  allowNull: false
});
Ilce.hasMany(Company, {
  foreignKey: "ilceId",
  sourceKey: "ilce_key",
  allowNull: false
});
Company.belongsTo(Ilce, {
  foreignKey: "ilceId",
  targetKey: "ilce_key",
  allowNull: false
});
Mahalle.hasMany(Company, {
  foreignKey: "mahalleId",
  sourceKey: "mahalle_key",
  allowNull: false
});
Company.belongsTo(Mahalle, {
  foreignKey: "mahalleId",
  targetKey: "mahalle_key",
  allowNull: false
});
Sokak.hasMany(Company, {
  foreignKey: "sokakId",
  allowNull: false
});
Company.belongsTo(Sokak, {
  foreignKey: "sokakId",
  allowNull: false
});
module.exports = {
  sequelize,
  Category,
  CompanyPhoto,
  Photo,
  User,
  Company,
  Comment,
  Product,
  Card,
  CardProduct,
  Sehir,
  Ilce,
  Sokak,
  Mahalle
};
