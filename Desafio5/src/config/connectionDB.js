import { connect } from "mongoose";

// const url = 'mongodb+srv://Ximena:5OmZ0uyg6sraSd4Q@coder.kcakzry.mongodb.net/?retryWrites=true&w=majority'
const url = 'mongodb://localhost:27017/ecommerce'

const dbConnection = async () => {
    try {
        console.log('DB Connected');
        return await connect(url)
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

export default dbConnection