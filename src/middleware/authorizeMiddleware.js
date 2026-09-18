const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
   
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: "Unauthorized. User role not found." });
        }

        if (!allowedRoles.includes(req.user.role)) {
          
            return res.status(403).json({ message: "403 Forbidden. Admin access only." });
        }

        next();
    };
};

module.exports = { authorizeRoles };
