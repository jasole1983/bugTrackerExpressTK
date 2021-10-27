const express = require("express");
const router = express.Router();
const db = require("../../db/models")
const { Bug } = db
const { csrfProtection, asyncHandler } = require("../../utils/asynccsurf")


router.get("/", asyncHandler(async (req, res) => {
    const bugs = await Bug.findAll()
    res.json({ bugs })
}))

router.get("/priority/:id", asyncHandler(async (req, res) => {
    const minPriorityLevel = parseInt(req.params.id, 10);
    const priorityBugs = await Bug.findAll({where:{priority: {[Op.gt]: minPriorityLevel}}})
    res.json({ priorityBugs })
}))

module.exports = router