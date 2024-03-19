const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, userValidation} = require('../models/userModel')

const register = async(req, res) =>{
    try {
        const {name, mobile, email, password} = req.body;
        const validationResult = userValidation.validate(req.body);

        if(validationResult.error){
            return res.status(400).json({message:validationResult.error.message, success: false,})
        }

        const emailCheck= await User.findOne({email: email})
        const mobileCheck= await User.findOne({mobile:mobile})
        if(emailCheck || mobileCheck){
            return res.status(409).json({message:'User Already Exists', success: false,})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new User({
            name, mobile, email, password: hashedPassword,
        })
        const userResponse = await userData.save();
        const token = await jwt.sign(
            {userId: userResponse._id},
            process.env.JWT_SECRET,
        )

        res.status(201).json({
            message: "User Registered Successfully",
            token: token,
            name: name,
            success: true,
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
      const { credential, password } = req.body;
      if (!credential || !password) {
        return res
          .status(409)
          .json({ message: "Invalid Credentials", success: false });
      }
  
      let userDetail = await User.findOne({ email :credential });
      if (!userDetail) {
        userDetail = await User.findOne({ mobile :credential });
      }

      if(!userDetail){
        return res
          .status(400)
          .json({ message: "User Not Found", success: false });
      }
  
      const passwordCheck = await bcrypt.compare(password, userDetail.password);
      if (!passwordCheck) {
        return res
          .status(400)
          .json({ message: "Invalid Password", success: false });
      }
      const token = await jwt.sign(
        { userId: userDetail._id },
        process.env.JWT_SECRET
      );
      res
        .status(201)
        .json({
          message: "User Login Successful",
          token: token,
          name: userDetail.name,
          success: true,
        });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  };

  module.exports = {register, login};