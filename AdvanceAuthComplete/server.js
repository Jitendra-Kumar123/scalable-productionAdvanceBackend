import ConnectToDB from "./config/database.js";
import app from "./src/app.js";

ConnectToDB();


app.listen(3000, ()=> {
    console.table("Server is running on Port 3000");
})