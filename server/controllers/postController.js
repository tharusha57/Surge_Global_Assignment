const Post = require('../models/postModel')

//Get all posts
const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({error : error.message})
    }   
}

//Like a post
const likePost = async(req,res) => {
    const {_id , userId} = req.body

    try {
        const post = await Post.findByIdAndUpdate({_id} , {
            $push : { likes : userId}
        } , {new : true})

        res.status(200).json(post)
    } catch (error) {
        res.status(422).json({error : error.message})
    }
}

//Unlike a post
const unlikePost = async(req,res) => {
    const {_id , userId} = req.body

    try {
        const post = await Post.findByIdAndUpdate({_id} , {
            $pull : { likes : userId}
        } , {new : true})

        res.status(200).json(post)
    } catch (error) {
        res.status(422).json({error : error.message})
    }
}

module.exports = {getAllPosts , likePost , unlikePost}