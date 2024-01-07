const Blog = require("./blog");
const ReadingList = require("./reading_list");
const User = require("./user");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingList, as: "readings" });
Blog.belongsToMany(User, { through: ReadingList, as: "readers" });

Blog.hasMany(ReadingList);
ReadingList.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingList,
};
