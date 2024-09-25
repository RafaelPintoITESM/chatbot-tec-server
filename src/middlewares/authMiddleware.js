const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwtConfig');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;  // Asigna el userId al request
    next();  // Llama a next() para continuar
  });
}

module.exports = verifyToken;
