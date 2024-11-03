const { getAll, getById, create, update, remove } = require('../services/db/userRepository');

const getUsers = async (_, res) => {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error al obtener los usuarios de Cosmos DB");
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await getById(req.params.id);

    if (!result) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send("Error al obtener el usuario de Cosmos DB");
  }
};

const insertUser = async (req, res) => {
  try {
    const data = req.body;
    const result = await create(data);

    res.status(201).json({
      message: 'Usuario creado correctamente',
      item: result
    });
  } catch (err) {
    console.error("Error al insertar datos:", err);
    res.status(500).send("Error al insertar el usuario");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      res.status(400).send("Error, el identificador no puede ser nulo o vacío");
    } else {
      const existEntity = await getById(id);
      if (existEntity) {
        const user = {
          id: id,
          name: data.name,
          email: data.email,
          password: data.password
        };
        const result = await update(user);

        res.status(200).json({
          message: 'Usuario actualizado correctamente',
          item: result
        });
      } else {
        res.status(404).json({
          message: 'El usuario a actualizar no existe'
        });
      }
    }
  } catch (err) {
    console.error("Error al actualizar el usuario:", err);
    res.status(500).send("Error al actualizar el usuario");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await remove(id);

    res.status(200).json({
      message: 'Usuario eliminado correctamente',
      item: result
    });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).send("Error al eliminar el usuario");
  }
};

module.exports = { getUsers, getUserById, insertUser, updateUser, deleteUser };
