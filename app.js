
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const registerRoute = require("./routes/register");
const subscribersRoute = require("./routes/subscribers");
const database = require("./database/database");
const app = express();
const cors =  require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
database();

app.set('views', './resource/views'); // define view folder
app.set('view engine', 'ejs'); // define view engine

app.use('/public', express.static('public')); // define folder './public' as /public

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());
// 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// PORT
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use(subscribersRoute);
app.use(registerRoute);
app.use("/user", userRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});