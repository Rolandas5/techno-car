const User = require('../models/userModel');

// ADMIN ONLY - Gauti visus vartotojus
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }

    const users = await User.find({}, 'name email role createdAt').lean();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ADMIN ONLY - Keisti rolę (pvz. vartotoją padaryti admin arba atvirkščiai)
exports.updateUserRole = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }

    const userId = req.params.id;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role value' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true, select: 'name email role' }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User role updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

// ADMIN ONLY - Ištrinti vartotoją
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Not authorized. Admin access required' });
    }

    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
