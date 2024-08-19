import express from 'express';
import { addComment, deleteComment, disLikeBlog, disLikeComment, editComment, likeBlog, likeComment, login, register, saveBlog } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/add-comment', addComment)
router.put('/edit-comment', editComment)
router.delete('/delete-comment/:cId', deleteComment)
router.get('/save-blog/:bId', saveBlog)
router.get('/like-comment/:cId', likeComment)
router.get('/dislike-comment/:cId', disLikeComment)
router.post('/like-blog/:bId', likeBlog)
router.post('/dislike-blog/:bId', disLikeBlog)

export default router;