const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Connectdb = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./Route/userRoute");

//mongodb comnnection
Connectdb();

//rest object
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRoutes);

//Port
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send(`<h1>Server Running On Port ${port}</h1>`);
});
//listen
app.listen(3001, () => {
  console.log(`Server Running On Port ${port}`);
});
