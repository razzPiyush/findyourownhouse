import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const hashedpassword = await bcryptjs.hash(password, salt);
    const newUser = new User({ username, email, password:hashedpassword });

    try {
        await newUser.save();
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=newUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        res.status(201).json({ message: 'New user created successfully.' });
    } catch (error) {
        // Handle the error, for example, send an error response
        next(error)
    }
};
export const signin = async (req, res,next) => {
    const { username, password } = req.body;
    try {
        const validuser= await User.findOne({username});
        if(!validuser){
            return next(errorHandler(404,'User not found!!!'))
        }
        const validpassword= bcryptjs.compareSync(password,validuser.password);
        if(!validpassword){
            return next(errorHandler(401,'Wrong Credentials'))
        }
        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=validuser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
};

export const google = async (req, res, next) => {
    const { name, email, photoURL } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        // User is already registered, proceed to sign in
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...rest } = user._doc;
  
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      } else {
        // User is not registered, create a new user
        const generatePassword = Math.random().toString(36).slice(-8);
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcryptjs.hash(generatePassword, saltRounds);
  
        const newUser = new User({
          username: name.split(' ').join('').toLowerCase() + Math.random().toString(10).slice(-4),
          email,
          password: hashedPassword,
          avatar: photoURL,
        });
  
        try {
          await newUser.save();
  
          // Sign in the newly created user
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
          const { password, ...rest } = newUser._doc;
  
          res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        } catch (error) {
          // Handle the error, for example, send an error response
          next(error);
        }
      }
    } catch (error) {
      next(error);
    }
  };
  export const signout= async(req,res,next)=>{
    try {
      res.clearCookie('access_token');
      res.status(200).json('loged out successfully.');  
    } catch (error) {
      next(error);
    }
  }