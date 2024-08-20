import express from 'express';
import { addBlog, deleteBlog, deleteComment, editBlog, login, register } from '../controllers/admin.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-blog', verifyToken, addBlog);
router.put('/edit-blog', verifyToken, editBlog);
router.post('/delete-blog/:bId', verifyToken, deleteBlog);
router.post('/delete-comment', verifyToken, deleteComment);

export default router;