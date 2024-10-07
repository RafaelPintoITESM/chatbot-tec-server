const express = require('express');
const { insertGraduateStudy, getGraduateStudies,getGraduateStudyById} = require('../controllers/graduateStudyController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, getGraduateStudies); 
router.get('/:id', verifyToken, getGraduateStudyById); 
router.post('/', verifyToken, insertGraduateStudy); 

module.exports = router;
