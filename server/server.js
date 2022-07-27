if(process.env.NODE_ENV != "production") require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")

app.listen(5000, () => console.log(`🎧 Listening to http://localhost:${port}`))
mongoose.connect(process.env.MONGO_URI, (err) => console.log(err ? `❌ Error connecting to MongoDB: ${err.message}` : "🔗 Connected to MongoDB"))

app.use(cookieParser())
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use("/uploads", express.static(path.join(__dirname, "./uploads")))
app.use(express.json())
app.use(require("express-fileupload")())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/reset", require("./routes/reset"))
app.use("/api/data", require("./routes/data"))
app.use(require("./middleware/error"))