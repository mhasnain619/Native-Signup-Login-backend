import userModel from '../models/userSchema'
// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get single user
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Create new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        // Check if user already exists
        const existing = await userModel.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const user = new User({ name, email, password, isAdmin });
        const savedUser = await user.save();
        res.status(201).json({ id: savedUser._id, name: savedUser.name, email: savedUser.email });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update user', error });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deleted = await userModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};
