const express = require("express");
const router = express.Router();
const SpecSearchController = require("../controllers/SpecSearchController");

router.get("/spec-search", SpecSearchController.form);
router.get("/spec-search/results", SpecSearchController.results);

module.exports = router;