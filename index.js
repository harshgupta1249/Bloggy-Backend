const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) =>console.log(err))

app.use('/', (req, res)=>{
    res.send('Server is Running');
});

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});