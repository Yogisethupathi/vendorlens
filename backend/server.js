const express = require("express")
const logger = require("./utils/logger")

const app = express()
const PORT = process.env.PORT || 5000 

// Middleware
app.use(express.json())
app.use(logger)

app.get("/", async(req, res) => {
    await logger.info("homeappi acceed.")
 
    res.json({
        message:"welcome you hava accessed backend"
  })
})

app.get("/" ,(req,res) => {
res.send("success you hava accessed backend")
})
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
