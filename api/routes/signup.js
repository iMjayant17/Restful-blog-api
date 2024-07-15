const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const studentSchema = require('../model/studentSchema')


router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                msg: "Bad Request",
                error : err 
            })
        }
        else {
            const student = new studentSchema({
                _id: new mongoose.Types.ObjectId,
                email:req.body.email,
                author:req.body.author,
                password:hash,
                profilePic: req.body.profilePic,
                college: req.body.college,
                fullName:req.body.fullName
            })

            student.save()
                .then((result) => {
                    res.status(200).json({
                        msg: "student added Successfully",
                        result: result
                })
                })
                .catch((err) => {
                    res.status(500).json({
                        msg: "bad request Generated ",
                        error:err
                })
            })
        }
    })
})



module.exports = router