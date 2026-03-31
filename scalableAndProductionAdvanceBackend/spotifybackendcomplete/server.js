import {app} from "./src/app.js"
import {ConnectToDB} from "./src/db/db.js";

ConnectToDB();

app.listen(3000, ()=>{
    console.log("server is running");
})