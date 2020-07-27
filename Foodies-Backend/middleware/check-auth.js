const jwt = require("jsonwebtoken");


module.exports = (req, res, next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secret_used_to_validate_hashes_stored_on_the_server");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId}
        next(); 
    } catch (error) {
        res.staus(401).json({ message: "Auth faild!"});
    }
    
};