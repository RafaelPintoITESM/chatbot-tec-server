const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/jwtConfig');

const login = (req, res) => {
  const userId = '1'; // ID del usuario
  const email = 'admin@mail.com'; // Ejemplo de email
  const password = 'admin';
  console.log(req.body)
  if(req.body.email !== email || req.body.password !== password){
    return res.status(400).json({ error: 'Credenciales inválidas' });
  }

  // Crear el token con userId y email
  const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ auth: true, token });
};

const protectedRoute = (req, res) => {
  res.send(`Ruta protegida. Tu id de usuario es ${req.userId}`);
};


module.exports = { login, protectedRoute };
