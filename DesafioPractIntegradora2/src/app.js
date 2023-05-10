import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import session from 'express-session'
import configObject from "./config/connectionDB.js";
import initializePassport from "./middleware/initialPassport.js";
import passport from "passport";

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

configObject.dbConnection()

initializePassport()
app.use(session(configObject.session))


app.use(passport.initialize())
app.use(passport.session())



app.use(useRouter)
