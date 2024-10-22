const { connectToContainer } = require('./cosmosClient'); 
const {generateUUIDv4} = require('../utils/guidService');
let cosmosContainer;
 connectToContainer('GraduateStudies').then(cont=> cosmosContainer = cont);

const getAll= async()=>{
    const querySpec = {
        query: 'SELECT c.id, c.name, c.detail from c'
    };
    const { resources: items } = await cosmosContainer.items.query(querySpec).fetchAll();

    return items.map((item, _) => { return {
    id: item.id,
    name: item.name,
    detail:item.detail,
    } })
}

const getById= async(id)=>{
    const querySpec = {
        query: 'SELECT * from c WHERE c.id = @id',
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
        detail:item.detail,
        information: item.information,
    };
}

const create = async (item) =>{
    const graduateStudy = {
        id: generateUUIDv4(),
        name : item.name,
        detail : item.detail,
        information : item.information
      }
    const { resource: createdItem } = await cosmosContainer.items.create(graduateStudy);
    return createdItem;
}

const update = async (item) =>{
    const { resource: updatedItem } = await cosmosContainer
    .item(item.id, item.id) 
    .replace(item);
    return updatedItem;
}

const remove = async (id) =>{
    const { resource: deletedItem } = await cosmosContainer
    .item(id,id) 
    .delete();
    return deletedItem;
}

module.exports = { getAll, getById, create, update, remove}