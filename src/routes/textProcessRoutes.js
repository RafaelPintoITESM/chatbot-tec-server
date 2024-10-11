const express = require('express');
const { organize} = require('../controllers/textProcessController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/organize', verifyToken, organize);

module.exports = router;
