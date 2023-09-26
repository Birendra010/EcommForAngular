const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {swaggerDefinition} = require("./docs/apidoc.js");
dotenv.config({ path: ".env" });
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", route);

// swagger config
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(
    "mongodb+srv://birendra:birendra0106@cluster0.qyyrhjk.mongodb.net/ecommerce-test",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT, () => {
  console.log(`Express app running on port ${process.env.PORT}...`);
});
module.exports = server;
