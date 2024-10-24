const express = require('express');
const { insertGraduateStudy, updateGraduateStudy, getGraduateStudies,getGraduateStudyById, deleteGraduateStudy} = require('../controllers/graduateStudyController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getGraduateStudies); 
router.get('/:id', verifyToken, getGraduateStudyById); 
router.post('/', verifyToken, insertGraduateStudy); 
router.put('/:id', verifyToken, updateGraduateStudy); 
router.delete('/:id', verifyToken, deleteGraduateStudy); 

module.exports = router;
