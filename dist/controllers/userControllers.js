import { User } from '../models/User.js';
import { Thought } from '../models/Thought.js';
export const userController = {
    async getUsers(_req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            return res.json(users); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id)
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            return res.json(user); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            return res.json(updatedUser); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            // Remove associated thoughts
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            return res.json({ message: 'User and associated thoughts deleted' }); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
    async getAllFriends(req, res) {
        try {
            const { userId } = req.params;
            // Fetch the specific user and populate their friends
            const user = await User.findById(userId).populate('friends');
            // If the user is not found, return a 404 error
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            // Return the user's friends
            return res.json(user.friends);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async getFriendById(req, res) {
        try {
            const user = await User.findById(req.params.userId).populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            const friend = user.friends.find((friend) => friend._id.toString() === req.params.friendId);
            if (!friend) {
                return res
                    .status(404)
                    .json({ message: 'No friend found with this ID for the user' });
            }
            return res.json(friend);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            return res.json(user); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            return res.json(user); // Explicitly return here
        }
        catch (err) {
            return res.status(500).json(err); // Explicitly return here
        }
    },
};
