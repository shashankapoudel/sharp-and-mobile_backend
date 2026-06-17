const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://khanal-barber-services.vercel.app",
    ],
  }),
);

app.use("/api/booking", require("./src/routes/bookingRoutes"));

app.listen(PORT, () => {
  console.log(`server started at ${PORT} `);
});
