import express from 'express';
import { addComment, deleteComment, disLikeBlog, disLikeComment, editComment, likeBlog, likeComment, login, register, saveBlog, verifyOtp } from '../controllers/user.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/add-comment', verifyToken, addComment)
router.put('/edit-comment', verifyToken, editComment)
router.delete('/delete-comment/:cId', verifyToken, deleteComment)
router.get('/save-blog/:bId', verifyToken, saveBlog)
router.get('/like-comment/:cId', verifyToken, likeComment)
router.get('/dislike-comment/:cId', verifyToken, disLikeComment)
router.get('/like-blog/:bId', verifyToken, likeBlog)
router.get('/dislike-blog/:bId', verifyToken, disLikeBlog)
router.post('/verify-otp', verifyOtp)

export default router;