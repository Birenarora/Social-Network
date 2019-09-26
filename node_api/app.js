const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

//Database
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post.js");

//Middleware for code validation,etc...
app.use(morgan("dev"));
app.use(bodyparser.json());

app.use("/", postRoutes);


const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Node API running on port: ${port}`); 
});