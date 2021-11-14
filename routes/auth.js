const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req, res) => {
    try{
        const exist = await User.findOne({username: req.body.username});
        {exist && res.status(400).json("User Already Exist");}

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).json("Internal Server Error");
            }
            else{
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                });
                const user = await newUser.save();
                res.status(200).json(user);
            }
        });
        
    }
    catch(err){
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res)=>{

    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).json("Username does't exist");

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated) return res.status(400).json("Wrong Password");

        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;