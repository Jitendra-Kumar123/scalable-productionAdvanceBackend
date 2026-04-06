import ConnectDB from "./config/database.js";
import app from "./src/app.js";

ConnectDB();


app.listen(3000, ()=> {
    console.table("Server is running on Port 3000");
})