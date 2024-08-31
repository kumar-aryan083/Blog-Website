import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { editHomeArray, findStucture } from '../controllers/home.controller.js';
const router = express.Router();

router.post('/edit', verifyToken, editHomeArray);
router.get('/get', findStucture);

export default router;