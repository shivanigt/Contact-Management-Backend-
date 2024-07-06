const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv =  require("dotenv").config();
const cors = require('cors');

connectDb();
const app = express(); 
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

// app.get("/api/contacts", (req, res) => {
    // res.send("Get all contacts");
    // res.json({message : "Get all contacts"});
//     res.status(200).json({message : "Get all contacts"});
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});