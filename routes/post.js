const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const router = express.Router();

// Create post
router.post('/', async (req, res) => {
    const { userId, title, content } = req.body;
    const post = await Post.create({ userId, title, content });
    res.json(post);
});

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
});

// Add comment
router.post('/:postId/comments', async (req, res) => {
    const { userId, comment } = req.body;
    const commentDoc = await Comment.create({ postId: req.params.postId, userId, comment });
    res.json(commentDoc);
});

// Get comments for a post
router.get('/:postId/comments', async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
});

module.exports = router;
