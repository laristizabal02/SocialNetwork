import { Router } from 'express';
import { userController } from '../../controllers/userControllers.js';
const router = Router();

router.route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

  router.route('/:userId/friends')
  .get(userController.getAllFriends);

router.route('/:userId/friends/:friendId')
  .get(userController.getFriendById)
  .post(userController.addFriend)
  .delete(userController.removeFriend);

  
export default router;