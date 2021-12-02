const express = require("express");
const router = express.Router();
const db = require("../../db/models")
const { Bug } = db
const asyncHandler = require("express-async-handler");


router.get("/", asyncHandler(async (req, res) => {
    const bugs = await Bug.findAll()
    return res.json({ bugs })
}))

router.get("/priority/:id", asyncHandler(async (req, res) => {
    const minPriorityLevel = parseInt(req.params.id, 10);
    const priorityBugs = await Bug.findAll({where:{priority: {[Op.gt]: minPriorityLevel}}})
    return res.json({ priorityBugs })
}))

router.post("/update/:id", asyncHandler(async (req, res, next) => {
    const paramId = parseInt(req.params.id, 10);
    const { id, name, details, steps, version, assignedTo, createdBy, priority } = req.body
    const editBug = await Bug.findByPk(paramId)
    await editBug.update({
            name, 
            details, 
            steps, 
            version, 
            assignedTo, 
            priority,
        })

    await editBug.save();
    
    return res.json({ editBug })

}))

router.post("/create", asyncHandler(async (req, res) => {
    const { name, details, steps, version, assignedTo, createdBy, priority } = req.body
    const newBug = await Bug.build({
        name,
        details,
        steps,
        version,
        assignedTo,
        priority,
        createdBy,
    })

    await newBug.save();

    return res.json({ newBug })
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    const bugId = parseInt(req.params.id, 10);
        
    await Bug.destroy({
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
        
    })
    return res.json(returnObj)
}))

module.exports = router