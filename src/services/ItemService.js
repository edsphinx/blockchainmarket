import { Item } from '../domain';
import EVENTS from '../constants/Events';

export const fetchItemIds = async(contract, userId) => {

    return await contract.methods.getItemIds(userId).call();
};

export const fetchItems = async(contract, ids) => {
    
    const promises = ids.map(id => contract.methods.getItem(id).call());

    const itemArrays = await Promise.all(promises);

    return itemArrays.map(itemArray => Item.fromArray(itemArray));
};

export const createItem = async(contract, owner, userId, price, name, callback) => {

    contract.events[EVENTS.NEW_ITEM]({userId: userId}).once('data', callback);

    contract.methods.addItem(userId, name, price).send({from: owner});
};