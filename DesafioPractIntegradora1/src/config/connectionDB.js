import { connect } from "mongoose";
const url = 'mongodb://localhost:27017/ecommerce'

const dbConnection = async () => {
    try {
        console.log('db conectada');
        return await connect(url)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection