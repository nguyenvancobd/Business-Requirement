const express = require("express");

const router = express.Router();

router.get('/subscribers', (req, res, next) => {
    res.render('subscribers');
});

module.exports = router;