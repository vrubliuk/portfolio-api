const express = require('express')
const personController = require("../controllers/person")

const router = express.Router()

router.get("/person", personController.getPerson)

module.exports = router