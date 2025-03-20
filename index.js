const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Importing routes
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

// Using routes
app.use('/users', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);

// Starting server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// userRoutes.js
const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

// POST create user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = userRouter;

// dashboardRoutes.js
const express = require('express');
const dashboardRouter = express.Router();
const Dashboard = require('../models/Dashboard');

// GET all dashboard data
router.get('/', async (req, res) => {
    try {
        const dashboardData = await Dashboard.find();
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// GET dashboard data by ID
router.get('/:id', async (req, res) => {
    try {
        const dashboardData = await Dashboard.findById(req.params.id);
        if (!dashboardData) {
            return res.status(404).json({ message: 'Dashboard data not found' });
        }
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// POST create dashboard data
router.post('/', async (req, res) => {
    try {
        const dashboardData = new Dashboard(req.body);
        await dashboardData.save();
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: 'Error creating dashboard data' });
    }
});

// PUT update dashboard data
router.put('/:id', async (req, res) => {
    try {
        const dashboardData = await Dashboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!dashboardData) {
            return res.status(404).json({ message: 'Dashboard data not found' });
        }
        res.json(dashboardData);
    } catch (err) {
        res.status(500).json({ message: 'Error updating dashboard data' });
    }
});

// DELETE dashboard data
router.delete('/:id', async (req, res) => {
    try {
        await Dashboard.findByIdAndRemove(req.params.id);
        res.json({ message: 'Dashboard data deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting dashboard data' });
    }
});

module.exports = router;

// authRoutes.js
const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');

// POST login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;