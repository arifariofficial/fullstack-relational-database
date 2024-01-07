const router = require("express").Router();

const { ActiveSessions } = require("../models");

router.delete("/", async (req, res) => {
  const authorization = req.get("authorization");
  const token = authorization.substring(7);
  await ActiveSessions.destroy({
    where: {
      token,
    },
  });

  res.sendStatus(200);
});

module.exports = router;
