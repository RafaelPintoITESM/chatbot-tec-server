const express = require('express');
const { extractText} = require('../controllers/pdfProcessController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/extract', verifyToken, extractText);

module.exports = router;
