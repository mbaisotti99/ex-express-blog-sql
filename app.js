const express = require("express")
const app = express()
const port = 3000
app.use(express.json())



const routes = require("./routers/routes")



app.use("/posts", routes)
app.use(express.static("public"))


app.listen(port, () =>{
    console.log("Server listening");
    
})