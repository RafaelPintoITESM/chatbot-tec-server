const { connectToContainer } = require('./cosmosClient');
const { generateUUIDv4 } = require('../utils/guidService');
let cosmosContainer;
connectToContainer('Users').then(cont => cosmosContainer = cont);

const getAll = async () => {
    const querySpec = {
        query: 'SELECT c.id, c.name, c.email FROM c'
    };
    const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

    return items.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email
    }));
};

const getById = async (id) => {
    const querySpec = {
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [
            { name: '@id', value: id }
        ]
    };

    const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

    if (items.length === 0) {
        return null;
    }

    const item = items[0];

    return {
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password
    };
};

const create = async (item) => {
    const user = {
        id: generateUUIDv4(),
        name: item.name,
        email: item.email,
        password: item.password
    };
    const { resource: createdItem } = await cosmosContainer.items.create(user);
    return createdItem;
};

const update = async (item) => {
    const { resource: updatedItem } = await cosmosContainer
        .item(item.id, item.id)
        .replace(item);
    return updatedItem;
};

const remove = async (id) => {
    const { resource: deletedItem } = await cosmosContainer
        .item(id, id)
        .delete();
    return deletedItem;
};

module.exports = { getAll, getById, create, update, remove };
