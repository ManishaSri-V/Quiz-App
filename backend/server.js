const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const playersRoute = require("./routes/playersRoutes");
const quizRoute = require("./routes/quizRoutes");
const authRoute = require("./routes/authRoutes");

const app = express();
const port = 5050;
app.use(express.json());
app.use(cors());

const MongoDB_URI =
  "mongodb+srv://rasurimanishasri:S1ryf8HP89FVLfcy@cluster0.zv8dxjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB
mongoose.connect(MongoDB_URI, {});

// Event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB successfully");
});

app.use("/api/auth", authRoute);
app.use("/api/players", playersRoute);
app.use("/api/quiz", quizRoute);

app.listen(port, () => {
  console.log("Server started on port" + " " + port);
});
