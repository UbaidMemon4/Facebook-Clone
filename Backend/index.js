const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Connectdb = require("./config/db");

//router import
const userRoutes = require("./Route/userRoute");
const blogRoutes = require("./Route/blogRoute");

//env config
dotenv.config();

//mongodb comnnection
Connectdb();

//rest object
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

//cors config
const corsOptions = {
  origin: "https://facebook-clone-blue-three.vercel.app/", // Replace with your Vercel app URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//routes
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

//Port
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send(`<h1>Server Running On Port ${port}</h1>`);
});
//listen
app.listen(3001, () => {
  console.log(`Server Running On Port ${port}`);
});
