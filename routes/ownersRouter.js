const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.lenght > 0)
      return res
        .status(504)
        .send("You dont have permission to create new owner");

    let { fullName, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });
    res.status(200).send(createdOwner);
  });
}

router.get("/", (req, res) => {
  res.status(200).send("hello");
});

module.exports = router;
