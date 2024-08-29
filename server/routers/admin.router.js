import express from 'express';
import { addBlog, contactForms, deleteBlog, deleteComment, deleteForm, editBlog, login, register, validate, verifyOtp } from '../controllers/admin.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/add-blog', verifyToken, addBlog);
router.put('/edit-blog', verifyToken, editBlog);
router.delete('/delete-blog/:bId', verifyToken, deleteBlog);
router.post('/delete-comment', verifyToken, deleteComment);
router.get('/validate', verifyToken, validate);
router.post('/verify-otp', verifyOtp);
router.get('/contact-forms', contactForms);
router.delete('/delete-contact-form/:fId', deleteForm);

export default router;