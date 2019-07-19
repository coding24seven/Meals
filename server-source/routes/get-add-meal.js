/// IMPORTS
const express = require('express');
const router = express.Router();

/// EXPORTS
export default router;

/// GET ROUTE that renders the new-meal submission form
router.get("/", function (req, res, next) {
  res.render("new-meal.ejs");
});
