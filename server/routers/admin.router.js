import express from 'express';
import { addBlog, deleteBlog, deleteComment, editBlog, login, register } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-blog', addBlog);
router.post('/edit-blog', editBlog);
router.post('/delete-blog/:bId', deleteBlog);
router.post('/delete-comment', deleteComment);

export default router;