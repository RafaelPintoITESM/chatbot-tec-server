const express = require('express');
const { login, protectedRoute } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', login);        // Ruta para iniciar sesión
router.get('/protected', verifyToken, protectedRoute);  // Ruta protegida

module.exports = router;
