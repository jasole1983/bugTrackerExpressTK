const express = require("express");
const router = express.Router();
const db = require("../../db/models")
const { Bug } = db
const { csrfProtection, asyncHandler } = require("../../utils/asynccsurf")


router.get("/", asyncHandler(async (req, res) => {
    const bugs = await Bug.findAll()
    return res.json({ bugs })
}))

router.get("/priority/:id", asyncHandler(async (req, res) => {
    const minPriorityLevel = parseInt(req.params.id, 10);
    const priorityBugs = await Bug.findAll({where:{priority: {[Op.gt]: minPriorityLevel}}})
    return res.json({ priorityBugs })
}))

router.post("/new", csrfProtection, asyncHandler(async (req, res) => {
    const { name, details, steps, version, assignedTo, createdBy, priority } = req.body
    const newBug = {
                name, 
                details, 
                steps, 
                version, 
                assignedTo, 
                createdBy,
                priority,
                }
    const makeNewBug = await Bug.build(newBug)
    return res.json({ newBug })

}))

router.delete("/:id", asyncHandler(async (req, res) => {
    const bugId = parseInt(req.params.id, 10);
        
    const rObj = await Bug.destroy({
        where: {
            id: bugId
        }
    }).then(()=>{
        const returnObj = {}
        if (result.err){
            returnObj[errors] = [...err]
            return returnObj
        }
        returnObj['message']= "Successfully removed Bug record from system";
        returnObj['ok']= true;
        return returnObj
    })
    return res.json(rObj)
}))

module.exports = router