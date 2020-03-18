const express = require('express')
const path = require('path')
const { getTotal, addEmail } = require('./utils/mongo-app')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3009

app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Allow-Control-Allow-Origin", "*")
    res.header("Allow-Control-Allow-Headers", "*")
    next()
})

app.get("/data", async (req, res) => {
    const totalUsers = await getTotal()
    console.log(`there are ${totalUsers} users in my database`)
    res.send({
        data: totalUsers
    })
})

app.post("/register", (req, res) => {
    addEmail(req.body.email)
    res.send("POST request sent")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})