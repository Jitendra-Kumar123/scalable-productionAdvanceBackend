import {app} from "./src/app.js"
import { ConnectToDB } from "./src/DB/DB.js";

ConnectToDB();

app.listen(3000, ()=>{
    console.log("running||professional server is running")
});