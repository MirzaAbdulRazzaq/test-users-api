const { users } = require('../models/users.model');

async function createUser(user) {
    users.push(user);
    return {
        message: 'User Created',
    }
}

async function updateUser(id, userdata) {
    console.log(id);
    let index = users.findIndex(user => user.id === Number(id));
    if (index >= 0) {
        users.at(index).name = userdata.name;
        users.at(index).email = userdata.email;
        users.at(index).address = userdata.address;
        return {
            message: 'User updated'
        }
    }
    throw new Error('Not Found')
}

async function deleteuser(userId) {
    let index = users.findIndex((user) => user.id === Number(userId));
    if (index >= 0) {
        let user = users[index];
        users.splice(index, 1);
        return { 
            user,
            message: 'user deleted'
        }
    }
    throw new Error('Not Found')
}

async function getUser() {
    return users
}

async function getUserById(userId) {
    let index = users.findIndex((user) => user.id === Number(userId));
    if (index >= 0) {
        const user = users.at(index);
        return user
    }
    throw new Error('Not Found')
}

module.exports = {
    createUser,
    updateUser,
    deleteuser,
    getUser,
    getUserById
}