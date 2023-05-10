import { connect } from "mongoose";
import session from 'express-session'
import MongoStore from 'connect-mongo'

// const url = 'mongodb+srv://Ximena:5OmZ0uyg6sraSd4Q@coder.kcakzry.mongodb.net/?retryWrites=true&w=majority'
const url = 'mongodb://localhost:27017/ecommerce'

let configObject = {
    dbConnection: async () => {
        try {
            console.log('db conectada');
            return await connect(url)
        } catch (error) {
            console.log(error);
            process.exit()
        }
    },
    session: {
        store: MongoStore.create({
          mongoUrl: url,
          mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
          ttl:150
        }),
        secret: "s3cr3t123",
        resave: false,
        saveUninitialized: false,
        maxAge: 15000000
      }
}

export default configObject