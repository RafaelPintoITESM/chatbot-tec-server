const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const SECRET_KEY = 'mi_secreto';

// Middleware para verificar el token JWT
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

// Ruta pública: No requiere token
app.get('/public', (req, res) => {
  res.send('Esta es una ruta pública');
});

// Ruta protegida: Requiere token
app.get('/protected', verifyToken, (req, res) => {
  res.send(`Ruta protegida. Tu id de usuario es ${req.userId}`);
});

// Ruta para iniciar sesión y generar un token
app.post('/login', (req, res) => {
  const userId = '1'; // ID del usuario
  const email = 'user@example.com'; // Ejemplo de email

  // Crear el token con userId y email
  const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ auth: true, token });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
