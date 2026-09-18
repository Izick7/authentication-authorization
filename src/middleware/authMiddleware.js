const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verifiedPayload = jwt.verify(token, "SUPER_SECRET_KEY_123");

        req.user = verifiedPayload; 
        
        next(); 
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
         console.error("JWT Verification Error Details:", error.message);
    }
};

module.exports = { authenticateToken };
