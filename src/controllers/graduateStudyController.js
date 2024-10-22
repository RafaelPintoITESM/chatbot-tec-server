const {getAll, getById, create, update, remove} = require('../services/db/graduateStudyRepository');

const getGraduateStudies = (async (_, res) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error al obtener los elementos de Cosmos DB");
  }
});

const getGraduateStudyById = async (req, res) => {
  try {
    const result = await getById(req.params.id);
    
    if (!result) {
      return res.status(404).send("Registro no encontrado");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error al obtener el elemento de Cosmos DB");
  }
};

const insertGraduateStudy = (async (req, res) => { 
  try {
    const data = req.body;
    const result = await create(data);

    res.status(201).json({
      message: 'Programa de posgrado creado correctamente',
      item: result
    });
  } catch (err) {
    console.error("Error al insertar datos:", err);
    res.status(500).send("Error al insertar el programa de posgrado");
  }
});

const updateGraduateStudy = (async (req, res) => { 
  try {
    const { id } = req.params;
    const data = req.body;
    if(!id){
        res.status(400).send("Error, el identificador no puede ser nulo o vació");
    }
    else{  
      const existEntity = await getById(id);
      if (existEntity) {
        const graduateStudy = {
          id: id,
          name : data.name,
          detail : data.detail,
          information : data.information
        }
        const result = await update(graduateStudy);
    
        res.status(200).json({
          message: 'Programa de posgrado actualizado correctamente',
          item: result
        });
      } else {  
        res.status(400).json({
          message: 'El programa de posgrado a actualizar no existe'
        });
      }
    }
  } catch (err) {
    console.error("Error al actualizar el programa de posgrado:", err);
    res.status(500).send("Error al actualizar el programa de posgrado");
  }
});


const deleteGraduateStudy = (async (req, res) => { 
  try {
    const { id } = req.params;
    const result = await remove(id);

    res.status(200).json({
      message: 'Dato eliminado correctamente',
      item: result
    });
} catch (err) {
  console.error("Error al eliminar programa de posgrado: ", err);
  res.status(500).send("Error al al eliminar programa de posgrado");
}
});


module.exports = { getGraduateStudies, insertGraduateStudy,updateGraduateStudy, getGraduateStudyById, deleteGraduateStudy };
