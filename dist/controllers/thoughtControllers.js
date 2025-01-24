import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';
export const thoughtController = {
    // GET all thoughts
    async getThoughts(_req, res) {
        try {
            const thoughts = await Thought.find();
            return res.json(thoughts);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // GET a single thought by _id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // POST a new thought and push to user's thoughts array
    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;
            const thought = await Thought.create({ thoughtText, username });
            const user = await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // PUT to update a thought by _id
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            return res.json(updatedThought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // DELETE a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            // Remove the thought from the associated user's thoughts array
            await User.updateMany({ thoughts: req.params.id }, { $pull: { thoughts: req.params.id } });
            return res.json({ message: 'Thought deleted successfully' });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // POST a reaction to a thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    // DELETE a reaction by reactionId
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async getAllReactions(req, res) {
        try {
            const { thoughtId } = req.params;
            // Fetch the specific thought and its reactions
            const thought = await Thought.findById(thoughtId);
            // If the thought is not found, return a 404 error
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            // Return the thought's reactions
            return res.json(thought.reactions);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async getReactionById(req, res) {
        try {
            // Find the thought by its ID
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }
            // Find the reaction within the thought's reactions array
            const reaction = thought.reactions.find((reaction) => reaction._id.toString() === req.params.reactionId);
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction found with this ID' });
            }
            return res.json(reaction);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
};
