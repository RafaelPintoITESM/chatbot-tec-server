const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));  // Configuración de CORS
app.use(express.json());     // Para parsear JSON en las solicitudes

// Rutas
app.use('/public', publicRoutes);  // Rutas públicas
app.use('/auth', authRoutes);      // Rutas protegidas (requieren autenticación)

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
