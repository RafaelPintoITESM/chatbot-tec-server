const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMNI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const LLMService ={
    async generateResponse(prompt){
        const result = await model.generateContent(prompt);
        return result.response.text()
    },

    async organizeText(text){
        const prompt = 'Organizame este texto bien sintetizado, sin caracteres decoradores, solo texto y signos de puntacion, ya que sera un insumo para ti posteriormente y no hagas nada más si no eso: ';
        const fullPrompt = prompt + text;
        return await this.generateResponse(fullPrompt);
    }
}

module.exports = { LLMService };