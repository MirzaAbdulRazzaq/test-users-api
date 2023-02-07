const userService = require('../services/users.service')

async function createUser(req, res, next){
    let user = req.body;
    try{
        return res.status(201).json(await userService.createUser(user))
    }catch (err){
        next(err);
    }
}

async function getUsers(req, res, next){
    try{
        return res.status(200).json(await userService.getUser())
    }catch (err){
        next(err);
    }
}

async function updateUser(req, res, next){
    let user = req.body;
    let id = req.params.id
    try{
        return res.status(200).json(await userService.updateUser(id,user))
    }catch (err){
        next(err);
    }
}

async function getUserById(req, res, next){
    let userId = req.params.id
    try{
        return res.status(200).json(await userService.getUserById(userId))
    }catch (err){
        next(err);
    }
}

async function deleteUser(req, res, next){
    let userId = req.params.id;
    console.log(userId)
    try{
        return res.status(200).json(await userService.deleteuser(userId))
    }catch (err){
        next(err);
    }
}

module.exports = {
    createUser,
    getUsers,
    updateUser,
    getUserById,
    deleteUser
}