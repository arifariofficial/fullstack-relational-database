const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const where = {
    user_id: req.params.id,
  };

  if (req.query.read) {
    where.read = req.query.read !== "false";
  }
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["userId"] },
      through: {
        attributes: [],
      },
      include: {
        model: ReadingList,
        where,
        attributes: ["read", "id"],
      },
    },
  });
  res.json(user);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const newUserName = req.body.username;
  const user = await User.findOne({ where: { username } });

  if (user) {
    user.username = newUserName;
    await user.save();
    res.json(user);
  } else {
    res.statusCode(404);
  }
});

module.exports = router;
