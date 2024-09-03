import express from 'express';
import { allBlogs, blogBySlug } from '../controllers/com.controller.js';

const router = express.Router();

router.get('/all-blogs', allBlogs);
router.get('/:slug', blogBySlug);

export default router;