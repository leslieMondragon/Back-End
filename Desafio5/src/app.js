import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import dbConnection from "./config/connectionDB.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import session from 'express-session'
import MongoStore from 'connect-mongo'

const app = express();
const PORT = 8080;
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

dbConnection()

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ecommerce',
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl:150
  }),
  secret: "s3cr3t123",
  resave: false,
  saveUninitialized: false
}))

app.use(useRouter)