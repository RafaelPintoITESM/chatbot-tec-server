const {execute} = require('../services/LLM/chatbotService')

const quest = (async (req, res) => { 
  try {
    const responseText = await execute(req.body.text);
    res.json({response: responseText});
 } catch (err) {
   console.error('Error al procesar el mensaje:', err);
   res.status(500).send('Hubo un error al procesar el mensaje.');
 }
});

module.exports = { quest };
