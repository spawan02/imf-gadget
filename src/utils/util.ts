import { v4 as uuidv4 } from "uuid";

const generateProbability = (): number => {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
};

const generateCodename = () => {
  const adjectives = [
      "Mighty", "Silent", "Fierce", "Brave", "Swift", "Stealthy", "Legendary", "Royal", "Invisible", "Shadow", "Thunder", "Phantom", "Eternal"
  ];
  const animals = [
      "Wolf", "Eagle", "Tiger", "Lion", "Falcon", "Dragon", "Bear", "Cheetah", "Shark", "Rhino", "Panther", "Jaguar", "Phoenix"
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  return `${adjective} ${animal}`;
};


function generateConfirmationCode(): string {
    return uuidv4();
}

export { generateProbability, generateCodename, generateConfirmationCode };
