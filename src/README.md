# Social Network


![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description:
Application that shows users, friends, thoughts and reactions on a social network, allows filtering by each of these, adding, modifying and deleting

## Motivation:
learn and deepen the concept of NOSQL, implementing a social network where I can access tables, modify them and delete them

## Build:
I decided to do this project because creating a social network API is a good way to practice NoSQL concepts.

## Learn:
I learned to use the concept of NOSQL appropriately, using tables, adding, deleting and updating them themselves

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing) 
- [Test](#tests)


## Installation

* you will have to run the command: npm install to get all our Packages
* run the seed to get the Data Base seeded: npm run seed,
* run the command to transcribe all the code from typescript to javascript: npm run build
* start the server: npm run start
* open insomia and start interacting with the Social Network API, use get, post, update and delete

## Usage
This Social Network API will allow you to get, post, delete and update any user, comment, reaction or friends.
If you want to access all users you must write with the option GET: http://localhost:3001/api/users
Also, if you want to get all thoughts you will have to keep the opction GET: http://localhost:3001/api/thought
Same if you want to create a new user or thought, you will have to selet POST and on the body part, write the new user or thought

{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}

 {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
  }


If you want to delete or update you can choose the option PUT or Delete, write the ID and make the modification
 http://localhost:3001/api/users/:id
 http://localhost:3001/api/thought/:id


 If you want to get all friends or friends'users
 you can use next url:
http://localhost:3001/api/users/:id/friends
http://localhost:3001/api/users/:id/friends/:id

Same if you want to get all reactions or thought's reactions:
 http://localhost:3001/api/thought/:id/reactions
http://localhost:3001/api/thought/:id/reactions/:id



## License:
MIT

[MIT License](https://opensource.org/licenses/MIT)

## Contributing:
- Packages: mongoose, NOSQL, Typescript
- Made by: laura aristizabal
- GitHub: https://github.com/laristizabal02/SocialNetwork
- Email: lauris.paz@hotmail.es

## Test:
if you want to test it, you can follow this video:

For Users:
https://www.loom.com/share/3ca2c6a73d1c44bdbcebe4d4c95977ec?sid=910a876f-78a8-4690-b370-1c325758d6d8


For Thoughts:
https://www.loom.com/share/dae1835eb8dc4bde8c0a484b222a0dd0?sid=f25bf86f-86cc-49d4-ab56-281d8f42379c



