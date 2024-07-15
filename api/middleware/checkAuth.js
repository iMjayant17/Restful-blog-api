const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const a = jwt.verify(token, "This is Dummy Text...");
        console.log(token)
        next();
    }
    catch (error) {
        console.log("authentication fails" ,error)
        res.status(500).json({
            msg:"authentication fails..."
        })
    }
}