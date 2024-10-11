const express = require('express');
const { quest} = require('../controllers/chatController');

const router = express.Router();

router.post('/quest', quest);

module.exports = router;
