import app from "./src/app.js";
import {createServer} from "http"
import { SocketServer } from "./src/sockets/socket.server.js";
import { ConnectDB } from "./src/database/db.js";

const port = process.env.PORT;

ConnectDB();

const httpserver = createServer(app);
SocketServer(httpserver);

httpserver.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})