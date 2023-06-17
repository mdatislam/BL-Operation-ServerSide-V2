const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

// app.js file require
const app = require("./app.js");

// Database connect
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bzozooi.mongodb.net/BL-Operation?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(dbUrl, connectionParams).then(() => {
  console.log(`Database connection successful`.red.bold);
});

//server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.blue.bold);
});
