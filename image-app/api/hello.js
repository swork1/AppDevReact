const router = require("express").Router();

router.get("/hello", (req, res) => {
  res.send({
    items: [
      { id: 1, name: "Apples", price: "$2" },
      { id: 2, name: "Peaches", price: "$5" },
    ],
  });
});

module.exports = router;
