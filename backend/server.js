const express = require("express")
const app = express()
const PORT = 5000|| process.env.PORT 
app.use(express.json)

app.listen(PORT ,  ()=> {
    console.log(`server is runnnng on ${PORT}`)
})