const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./route/route");
const app = express();
const cors = require("cors");

dotenv.config({ path: ".env" });
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", route);

mongoose
  .connect(
    "mongodb+srv://birendra:birendra0106@cluster0.qyyrhjk.mongodb.net/ecommerce-test",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const server = app.listen(5000, () => {
  console.log(`Express app running on port ${process.env.PORT || 5000}...`);
});
module.exports = server;
