const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const cors = require("cors"); // Used for interaction between different domains, port or http

//Database
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// details of Node.api in localhost:8080/
app.get("/", (req, res) => {
	fs.readFile('docs/apiDocs.json', (err, data) => {
		if(err) {
			res.status(400).json({
				error: err
			});
		}
		const docs = JSON.parse(data);
		res.json(docs);
	});
});

//Middleware for code validation,etc...
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function(err, req, res, next) {
	if(err.name === "UnauthorizedError") {
		res.status(401).json({error: "Unauthorised Acces!"});
	}
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Node API running on port: ${port}`); 
});