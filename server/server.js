if(process.env.NODE_ENV != "production") require("dotenv").config()

const cron = require("node-cron")
cron.schedule("0 0 * * * *", () => require("./utils/deleteExpiredFiles")(__dirname + "\\uploads"))

const express = require("express")
const app = express()

const port = process.env.PORT || 5000
app.listen(5000, () => console.log(`🎧 Listening to http://localhost:${port}`))

const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI, (err) => console.log(err ? `❌ Error connecting to MongoDB: ${err.message}` : "🔗 Connected to MongoDB"))

app.use(express.static("./uploads"))
app.use(express.json())
app.use(require("express-fileupload")())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/reset", require("./routes/reset"))
app.use(require("./middleware/error"))