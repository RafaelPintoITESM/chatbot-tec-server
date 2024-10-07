require('dotenv').config();
const { CosmosClient } = require('@azure/cosmos');

// Configura la conexión a Cosmos DB
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const databaseId = process.env.COSMOS_DB_DATABASE_NAME;

// Crea el cliente de Cosmos
const client = new CosmosClient({ endpoint, key });

async function connectToContainer(containerId) {
  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    console.log("Conexión establecida con el contenedor de Cosmos DB");
    return container;
  } catch (err) {
    console.error("Error al conectar a Cosmos DB:", err);
    throw err;
  }
}

// Exporta la función que conecta y devuelve el contenedor
module.exports = {
  connectToContainer
};
