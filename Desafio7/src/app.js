import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import session from 'express-session'
import configObject from "./config/config.js";
import initializePassport from "./middleware/initialPassport.js";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Escuchando en el puerto ${PORT}`);
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

configObject.dbConnection()

initializePassport()
app.use(session(configObject.session))
app.use(passport.initialize())
app.use(passport.session())
app.use(useRouter)

