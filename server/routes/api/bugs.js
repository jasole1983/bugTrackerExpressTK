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

router.post("/new", asyncHandler(async (req, res, next) => {
    const { name, details, steps, version, assignedTo, createdBy, priority } = req.body
    console.log( "request = ", {name, details, steps, version, assignedTo, createdBy, priority})
    const newBug = await Bug.build({
                name, 
                details, 
                steps, 
                version, 
                assignedTo, 
                createdBy,
                priority,
                })

    await newBug.save();
    
    res.status(203)

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