const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {authenticateToken} = require('../middleware/authMiddleware')
const { authorizeRoles } = require('../middleware/authorizeMiddleware');


router.post('/register', register);
router.post('/login', login)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({
        message: "welcome to your profile!",
        user: req.user 
    })

});

router.get('/admin/dashboard', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.status(200).json({
        message: "Welcome to the Admin Dashboard! Highly sensitive data here."
    });
});


module.exports = router;
