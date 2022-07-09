if(process.env.NODE_ENV != "production") require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const cors = require("cors")

app.listen(5000, () => console.log(`🎧 Listening to http://localhost:${port}`))
mongoose.connect(process.env.MONGO_URI, (err) => console.log(err ? `❌ Error connecting to MongoDB: ${err.message}` : "🔗 Connected to MongoDB"))

app.use(cors({origin: "http://localhost:3000"}))
app.use(express.static("./uploads"))
app.use(express.json())
app.use(require("express-fileupload")())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/reset", require("./routes/reset"))
app.use(require("./middleware/error"))