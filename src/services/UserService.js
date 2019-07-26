import { User } from '../domain';
import { EVENTS } from '../constants/Events';

export const fetchUserId = async (contract, owner) => {

    return await contract.methods.getUserId(owner).call();
};

export const fetchUserIds = async (contract, owner) => {

    return await contract.methods.getUserIds().call();
};

export const fetchUsers = async (contract, ids) => {
    let promises = ids.map(id => contract.methods.getUser(id).call());

    let userArrays = await Promise.all(promises);

    return userArrays.map(userArray => User.fromArray(userArray));
};

export const createUser = async (contract, owner, username, callback) => {

    contract.events[EVENTS.NEW_USER]({owner: owner}).once('data', callback);

    contract.methods.signUp(username).send({from: owner});
}