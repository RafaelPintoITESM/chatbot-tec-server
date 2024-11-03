const express = require('express');
const { insertGraduateStudy, updateGraduateStudy, getGraduateStudies,getGraduateStudyById, deleteGraduateStudy} = require('../controllers/graduateStudyController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getGraduateStudies); 
router.get('/:id', getGraduateStudyById); 
router.post('/', insertGraduateStudy); 
router.put('/:id', updateGraduateStudy); 
router.delete('/:id',  deleteGraduateStudy); 

module.exports = router;
