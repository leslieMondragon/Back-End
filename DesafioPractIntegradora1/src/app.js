import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import useRouter from "./routes/index.js"
import dbConnection from "./config/connectionDB.js";
import MessageManager from "./dao/classes/MongoDb/MessageManager.js";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const messageManager = new MessageManager()

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

app.get('/chat', (req, res, next)=>{
  res.render('chat')
})

const io = new Server(httpServer)

io.on('connection', socket=>{
  console.log('Nuevo cliente conectado');

  socket.on('message',async data=>{
      console.log(data);
      await messageManager.addMessage(data)
      let messages = await messageManager.getMessages()
      io.emit('messageLog', messages)
  })

  socket.on('authenticated', data=>{
      socket.broadcast.emit('newUserConnect', data)
  })

})

app.use(useRouter)