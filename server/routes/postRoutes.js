const express = require('express')
const router = express.Router()

const {getAllPosts , likePost , unlikePost} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

//Get all posts
router.get('/' , getAllPosts)

//Like a post
router.put('/like' , requireAuth , likePost)

//Unlike a post
router.put('/unlike' , requireAuth , unlikePost)

module.exports = router