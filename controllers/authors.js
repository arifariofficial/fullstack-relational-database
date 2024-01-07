const { Blog } = require("../models");
const { sequelize } = require("../util/db");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const users = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [[sequelize.literal("likes"), "DESC"]],
  });
  res.json(users);
});

module.exports = router;
