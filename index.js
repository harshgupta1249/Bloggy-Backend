const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send('Server is Running');
});

//CONNECTING TO DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) =>console.log(err))

app.use('/auth', authRoute);
app.use('/user', userRoute);

//STARTING PORT
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});