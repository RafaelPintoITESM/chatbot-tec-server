const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload'); 
const corsOptions = require('./config/corsOptions');
const authRoutes = require('./routes/authRoutes');
const graduateStudyRoutes = require('./routes/graduateStudyRoutes');
const userRoutes = require('./routes/userRoutes');
const pdfProcessRoutes = require('./routes/pdfProcessRoutes');
const chatRoutes = require('./routes/chatRoutes');
const textProcessRoutes = require('./routes/textProcessRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));  // Configuración de CORS
app.use(fileUpload());
app.use(express.json());     // Para parsear JSON en las solicitudes

// Rutas
app.use('/auth', authRoutes);  
app.use('/graduateStudy', graduateStudyRoutes);  
app.use('/user', userRoutes);  
app.use('/pdf', pdfProcessRoutes);  
app.use('/chatbot', chatRoutes);  
app.use('/text', textProcessRoutes);  

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
