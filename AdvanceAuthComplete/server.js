import ConnectToDB from "./src/config/db.js"
import {app} from "./src/app.js";

ConnectToDB();


app.listen(3000, ()=> {
    console.log("Server is running on Port 3000");
})