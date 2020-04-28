const router = require("express").Router();

router.post("/world", (req, res) => {
  res.send({
    test: `I received your POST request. This is what you sent me: ${req.body.post}`,
  });
});

module.exports = router;
