const express = require('express');
const router = express.Router();
const Student = require('../model/studentSchema')
const checkAuth = require('../middleware/checkAuth')

router.get('/:id',checkAuth,(req, res, next) => {
    const id = req.params.id;
    Student.findById(id).then((result) => {
        res.status(200).json({
            msg: "Student Details",
            result: result
        })
    })
        .catch(err => {
            res.status(500).json({
                msg: "no res found",
                error:err
        })
    })
    
})

router.post('/:id',checkAuth ,(req, res, next) => {
    const id = req.params.id;
    console.log(req);
    Student.findByIdAndUpdate(id, {
        "$set": req.body
    })
        .then(result => {
            res.status(200).json({
                msg: "update is successful",
                result: result
        })
        })
        .catch(err => {
            res.status(500).json({
                msg: "no res found",
                error: err
                })
    })
    // res.status(200).json({
    //     msg: "Student Details"
    // })
})


module.exports = router; 