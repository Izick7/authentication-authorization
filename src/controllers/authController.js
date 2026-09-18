const bcrypt = require('bcryptjs');
const users = require('../data/users'); 
const jwt = require('jsonwebtoken')


// registaration logic
const register = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword, 
            role: role.toLowerCase()  
        };

        users.push(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, password: hashedPassword}
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

// login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            "SUPER_SECRET_KEY_123", 
            { expiresIn: "1h" } 
        );

      
        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

module.exports = { register, login };
