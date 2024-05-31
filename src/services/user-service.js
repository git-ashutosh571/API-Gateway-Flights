const {UserRepository,RoleRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const {auth,enums} = require('../utils/common');
const bcrypt = require('bcrypt');
const AppError = require('../utils/errors/app-error');
const {Role} = require('../models');


const userRepo = new UserRepository();
const roleRepo = new RoleRepository();

async function createUser(data){
    try {
        const user = await userRepo.create(data);
        const role = await roleRepo.getRoleByName(enums.USER_ROLES_ENUMS.CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            if (error.errors && Array.isArray(error.errors)) {
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
            }
            throw new AppError(explanation.join(', '), StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function signIn(data){
    try {
        const user = await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No user found for the given email',StatusCodes.NOT_FOUND);
        };
        const passwordMatch = auth.checkPassword(user.password,data.password);
        if(!passwordMatch){
            throw new AppError('Invalid Request',StatusCodes.BAD_REQUEST);
        };
        const jwt = auth.createToken({id:user.id,email:user.email});
        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.error('Error during signIn:', error); // Log the error for debugging
        throw new AppError('Internal Server Error',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token){
    try {
        if(!token){
            throw new AppError('Missing JWT token',StatusCodes.BAD_REQUEST);
        }
        const response = auth.verifyToken(token);
        const user = await userRepo.get(response.id);
        if(!user){
            throw new AppError('No user found',StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if(error instanceof AppError) throw error;
        if (error.name =='JsonWebTokenError'){
            throw new AppError('Invalid JWT token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError'){
            throw new AppError('JWT token expired',StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Something went wrong',StatusCodes.INTERNAL_SERVER_ERROR)
        
    }
}


module.exports = {
    createUser,
    signIn,
    isAuthenticated
}


