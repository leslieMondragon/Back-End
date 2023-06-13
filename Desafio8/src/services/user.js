import UserDTO from "../dao/DTOs/user.js"

export default class UserService {
    constructor (UserDao){
        this.userDao = UserDao
    }
    async getUsers(){
        try {
            return await this.userDao.get()
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByEmail(email){
        try {
            return await this.userDao.getByEmail(email)
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(uid){
        try {
            return await this.userDao.getById(uid)
        } catch (error) {
            console.log(error);
        }
    }
    async createUser(newUser){
        try {
            let newUserNormalize = new UserDTO(newUser)
            let result = await this.userDao.create(newUserNormalize)
            return result            
        } catch (error) {
            return error
        }
    }
    
    async deleteUser(uid){
        return await this.userDao.delete(uid)
    }
}