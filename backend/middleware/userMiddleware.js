const userMiddleware = (req, res, next) => {
    try {
        const {name, email, password, confirmPassword, role} = req.body;
        if(!name || !email || !password || !confirmPassword || !role) 
            return res.status(400).json({messge: "All fields are required"})
        if(password !== confirmPassword)
            return res.status(400).json({message: "Password are not matched"})
    } catch(error) {
        res.status(500).json({"message": error.message})
    }

    next();
}

export default userMiddleware;