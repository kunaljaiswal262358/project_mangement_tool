import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const register = async (req, res) => {
    try {
        const {name , email , password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        const savedUser = await user.save();
        res.status(200).json({message: "User created successfully",data: savedUser})
    } catch(error) {
        res.status(500).json({message: error.message})
    }

}

export const login = async (req, res) => {

    try {
        const {email, password} = req.body;
        if(!email || !password) res.status(400).json({message: "All fields are required"})

        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "User not found"})
        const isMatched = await matchpassword(password, user.password)
        if(!isMatched) return res.status(400).json({message: "Password is not matched"})
        
        const plainUser = user.toObject()
        delete plainUser.password
        const token = generateToken(plainUser)
        res.cookie("token",token,{httpOnly: true})
        res.status(200).json({message: "User login successfully",data: plainUser})
    } catch(error){
        res.status(500).json({message: error.message})
    }

}

const matchpassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword)
}

const generateToken = (payload) => {
    const token = jwt.sign(payload,process.env.SECRET_KEY)
    return token
}

