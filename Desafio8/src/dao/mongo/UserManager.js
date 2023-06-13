import UserModel from "../../models/user.js"
export default class UserManager {
    constructor(){
        this.userModel = UserModel
    }
    async get (){
        try {
            return await this.userModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }
    async getById(uid){
        try {
            return await this.userModel.findById(uid)
        } catch (error) {
            new Error(error)
        }
    }
    async getByEmail(email){
        try {
            return await this.userModel.findOne({email: email})
        } catch (error) {
            new Error(error)
        }
    }

    async create(newUser){
        try {
            return await this.userModel.create(newUser)
        } catch (error) {
            new Error(error)
        }
    }
    
    // async update(){
    //     try {
    //         return await 
    //     } catch (error) {
    //         new Error(error)
    //     }
    // }

    async delete(uid){
        try {
            return await this.userModel.findByIdAndDelete(uid)
        } catch (error) {
            new Error(error)
        }
    }
}