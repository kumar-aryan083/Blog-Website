import express from 'express';
import { allBlogs } from '../controllers/com.controller.js';

const router = express.Router();

router.get('/all-blogs', allBlogs);

export default router;