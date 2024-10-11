const { connectToContainer } = require('../services/db/cosmosClient'); // Importar la conexión de Cosmos DB

let cosmosContainer;
 connectToContainer('GraduateStudies').then(cont=> cosmosContainer = cont);



 const getGraduateStudies = (async (_, res) => {
  try {
    const querySpec = {
      query: 'SELECT c.id, c.name, c.detail from c'
    };
    const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

    res.status(200).json(items.map((item, _) => { return {
      id: item.id,
      name: item.name,
      detail:item.detail,
    } }));
  } catch (err) {
    res.status(500).send("Error al obtener los elementos de Cosmos DB");
  }
});

const getGraduateStudyById = async (req, res) => {
  const id = req.params.id;

  try {
    const querySpec = {
      query: 'SELECT * from c WHERE c.id = @id',
      parameters: [
        { name: '@id', value: id }
      ]
    };

    const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

    if (items.length === 0) {
      return res.status(404).send("Registro no encontrado");
    }

    const item = items[0]; // Solo debe haber un elemento en el array
    res.status(200).json({
      id: item.id,
      name: item.name,
      detail:item.detail,
      information: item.information,
    });
  } catch (err) {
    res.status(500).send("Error al obtener el elemento de Cosmos DB");
  }
};


const insertGraduateStudy = (async (req, res) => { 
  try {
  // Los datos vienen en el cuerpo de la solicitud (req.body)
  const data = req.body;

  // Verificamos si el id existe en el documento
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.id = @id',
    parameters: [{ name: '@id', value: data.id }]
  };

  const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

  if (items.length > 0) {
    // Si el registro existe, lo actualizamos
    const { resource: updatedItem } = await cosmosContainer
      .item(data.id) // Pasamos el ID del elemento a actualizar
      .replace(data); // Reemplazamos el contenido con el nuevo

    res.status(200).json({
      message: 'Dato actualizado correctamente',
      item: updatedItem
    });
  } else {
    // Si no existe, lo insertamos
    const { resource: createdItem } = await cosmosContainer.items.create(data);

    res.status(201).json({
      message: 'Dato insertado correctamente',
      item: createdItem
    });
  }
} catch (err) {
  console.error("Error al insertar/actualizar datos:", err);
  res.status(500).send("Error al insertar/actualizar datos en Cosmos DB");
}
});

const deleteGraduateStudy = (async (req, res) => { 
  try {
  // Los datos vienen en el cuerpo de la solicitud (req.body)
    const { id } = req.params;
    const { resource: deletedItem } = await cosmosContainer
    .item(id) // Pasamos el ID del elemento a actualizar
    .delete(); // Reemplazamos el contenido con el nuevo

    res.status(200).json({
      message: 'Dato eliminado correctamente',
      item: deletedItem
    });
} catch (err) {
  console.error("Error al insertar/actualizar datos:", err);
  res.status(500).send("Error al insertar/actualizar datos en Cosmos DB");
}
});


module.exports = { getGraduateStudies, insertGraduateStudy, getGraduateStudyById, deleteGraduateStudy };
