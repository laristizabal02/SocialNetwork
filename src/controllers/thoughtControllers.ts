import { Request, Response } from 'express';
import { Thought } from '../models/Thought.js';
import { User } from '../models/User.js';

export const thoughtController = {
  // GET all thoughts
  async getThoughts(_req: Request, res: Response) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // GET a single thought by _id
  async getThoughtById(req: Request, res: Response) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // POST a new thought and push to user's thoughts array
  async createThought(req: Request, res: Response) {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // PUT to update a thought by _id
  async updateThought(req: Request, res: Response) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      return res.json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // DELETE a thought by _id
  async deleteThought(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      // Remove the thought from the associated user's thoughts array
      await User.updateMany(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } }
      );
      return res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // POST a reaction to a thought
  async createReaction(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // DELETE a reaction by reactionId
  async deleteReaction(req: Request, res: Response) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};