const names = [
    'laura',
    'valeria',
    'jimena',
    'alejandra',
    'patricia',
    'catalina',
    'sandra',
    'berta',
    'jaime',
    'alonso',
    'alejandro',
    'salome',
    'valentina',
    'luz',
    'dary',
  ];
  
  const thoughtsArray = [
    'esto es un pensamiento',
    'esto es OTRO pensamiento',
    'estoy usando Mongoose',
    'estoy aprendiendo NoSQL',
    'esto es un challenge muy divertido',
    'quiero viajar!!!',
    'Holaaaa me leen',
    'manizales ciudad de las puertas abiertas',
    'mi animal favorito es el gato',
    'ok bye',
  ];

  const reactionBodies = [
    'Deacuerdo contigo!!',
    'Esto esta super bien!',
    'Buen pensamiento',
    'No podria estar mas de acuerdo',
    'Excelente!',
  ];
  
  // Get a random item from an array
  export const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  // Generate random names
  const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;
  
  // Generate random thoughts
  const getRandomThoughts = (int: number) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughtsArray),
        username: '', // Placeholder for username to be assigned in seed.ts
        createdAt: new Date(),
        reactions: getRandomReactions(3),
      });
    }
    return results;
  };
  
  // Generate random reactions
  const getRandomReactions = (int: number) => {
    const reactions = [];
    for (let i = 0; i < int; i++) {
      reactions.push({
        reactionBody: getRandomArrItem(reactionBodies),
        username: getRandomName(),
        createdAt: new Date(),
      });
    }
    return reactions;
  };
  
  export { getRandomName, getRandomThoughts };