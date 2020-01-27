const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const excelCtrl = require('./excel.ctrl');

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    limit: "150mb",
    extended: false
  })
);


router.get("/", excelCtrl.view);
router.post("/", excelCtrl.upload);

module.exports = router;
