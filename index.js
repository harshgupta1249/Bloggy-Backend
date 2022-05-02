const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res)=>{
    res.send('Server is Running on port ', PORT);
});

//CONNECTING TO DB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) =>console.log(err))

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images");
    },filename:(req,file,cb) => {
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File uploaded succesfully");
});

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/category', categoryRoute);

//STARTING PORT
app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});