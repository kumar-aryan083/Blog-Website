import express from 'express'
import { addNewCat, allCat, catById, catByName, deleteCat, updateCat } from '../controllers/category.controller.js';
import { verifyToken } from '../verifyToken.js';
const router = express.Router(); 

router.get('/all-category', allCat)
router.get('/:id', catById);
router.get('/byname/:catName', catByName);
router.post('/add-new-category',verifyToken, addNewCat);
router.delete('/delete-category/:id',verifyToken, deleteCat);
router.put('/update-category/:id',verifyToken, updateCat); 

export default router;  