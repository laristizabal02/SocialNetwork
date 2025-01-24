import connection from '../config/connection.js';
import { User } from '../models/User.js';
import { Thought } from '../models/Thought.js';
import {  getRandomName, getRandomThoughts, getRandomArrItem} from './data.js';
import { Types } from 'mongoose';

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  // Clear existing data
  const userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  const thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck?.length) {
    await connection.dropCollection('thoughts');
  }

  // Generate random users and thoughts
  const users = [];
  const thoughts = getRandomThoughts(10);

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = `${username.split(' ').join('.')}@example.com`.toLowerCase();

    users.push({
      username,
      email,
    });
  }

  // Insert users into the database
  const createdUsers = await User.insertMany(users);

  // Assign thoughts to users
  for (const thought of thoughts) {
    const randomUser = getRandomArrItem(createdUsers);
    thought.username = randomUser.username; // Ensure thoughts include username

    const createdThought = await Thought.create(thought);

    // Add the thought to the user's thoughts array
    randomUser.thoughts.push(createdThought._id);
    await randomUser.save();
  }

  for (const user of createdUsers) {
    const friends: Types.ObjectId[] = [];
    const numberOfFriends = Math.floor(Math.random() * 5); // Random number of friends (0–4)

    for (let i = 0; i < numberOfFriends; i++) {
      let randomFriend;

      // Ensure a user cannot be friends with themselves and avoid duplicates
      do {
        randomFriend = getRandomArrItem(createdUsers);
      } while (
        randomFriend._id.equals(user._id) || // Prevent self-friendship
        friends.includes(randomFriend._id)   // Prevent duplicate friends
      );

      friends.push(randomFriend._id);
    }

    // Update user's friends array
    user.friends = friends;
    await user.save();
  }

  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});