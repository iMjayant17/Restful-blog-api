const express = require('express');
const router = express.Router();
const Blogg = require('../model/blogSchema')
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth')

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg:"completely working"
    })
})

router.post('/post_blog',checkAuth, (req, res, next) => {
    const blog = new Blogg({
        _id: new mongoose.Types.ObjectId,
        author:req.body.author,
        authorId: req.body.authorId,
        title: req.body.title,
        description: req.body.description
    });

    blog.save().then((result) => {
        console.log(result);
        res.status(200).json({
            msg: "Blog is saved now",
            blog: result
        })
    }) 
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "Error Occured",
                error: err
            })
    })

})


router.get('/all_blog',checkAuth,(req, res, next) => {
    Blogg.find()
        .then((result) => {
        res.status(200).json({
            msg: "All Blogs",
            blogs: result
        })
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "Error Occured",
                error: err
            })
    })
})

router.get('/find_blog_by_author/:authorId',checkAuth, (req, res, next) => {
    const authorId = req.params.authorId;
    // console.log(authorId);
    Blogg.find({authorId:authorId}).then((result) => {
        res.status(200).json({
            msg: "Blog by Author",
            blog: result
        })
    })
        .catch(err => {
            res.status(200).json({
                msg: "no blog found for " + authorId,
        })
    })
})



module.exports = router;