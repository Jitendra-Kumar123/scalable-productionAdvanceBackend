import {app} from "./src/app.js"
import "dotenv/config"
import { ConnectToDB } from "./src/db/db.js";

ConnectToDB();


app.listen(3000, ()=>{
    console.log("server is running")
});