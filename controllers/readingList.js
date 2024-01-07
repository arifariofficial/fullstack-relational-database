const { ReadingList } = require("../models");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const readingList = await ReadingList.findAll();
  res.json(readingList);
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const readingList = await ReadingList.create(req.body);
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  const read = await ReadingList.findByPk(req.params.id);
  if (read) {
    read.read = req.body.read;
    await read.save();
    res.json(read);
  } else {
    res.sendStatus(404);
  }
});
module.exports = router;
