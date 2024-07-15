const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const studentSchema = require('../model/studentSchema')



router.post('/', (req, res, next) => {

    studentSchema.find({ email: req.body.email })
        .exec()
        .then((student) => {
            if (student.length < 1) {
                return res.status(401).json({
                    msg: "No student exist for this name"
                });
            }
            
            bcrypt.compare(req.body.password, student[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: "Password is incorrect"
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        email: student[0].email,
                        author: student[0].author,
                        college: student[0].college
                    }, "This is Dummy Text...",
                        {
                            expiresIn: "24h"
                        });
                    
                    res.status(200).json({
                        msg:"Logged in with given Credentials ",
                        email: student[0]?.email,
                        author: student[0]?.author,
                        college: student[0]?.college,
                        fullName: student[0]?.fullName,
                        profilePic: student[0]?.profilePic,
                        _id:student[0]?._id,
                        Token : token
                    })
                
                    
                }

            })
            
        })
        .catch(err => {
            res.status(500).json({
                msg: "Something went wrong",
                error: err
        })
    })
})




module.exports = router