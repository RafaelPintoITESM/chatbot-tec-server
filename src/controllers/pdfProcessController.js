const pdfParse = require('pdf-parse'); 
const extractText = (async (req, res) => { 
  if (!req.files || !req.files.pdfFile) {
    return res.status(400).send('No se subió ningún archivo PDF.');
  }

  const pdfFile = req.files.pdfFile;

  try {
    const data = await pdfParse(pdfFile.data); // Extrae el contenido del PDF
    res.json({text:data.text}); // Muestra el texto extraído en la respuesta
  } catch (err) {
    console.error('Error al procesar el PDF:', err);
    res.status(500).send('Hubo un error al procesar el archivo PDF.');
  }
});


module.exports = { extractText };
