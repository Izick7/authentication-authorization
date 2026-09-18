const bcrypt = require('bcryptjs');

const users = require('../data/users'); 

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

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
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

module.exports = { register };
