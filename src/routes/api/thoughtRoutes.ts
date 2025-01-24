import { Router } from 'express';
import { thoughtController } from '../../controllers/thoughtControllers.js';

const router = Router();

router.route('/')
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

router.route('/:id')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .get(thoughtController.getAllReactions);

router.route('/:thoughtId/reactions/:reactionId')
  .get(thoughtController.getReactionById)
  .delete(thoughtController.deleteReaction);
  

export default router;