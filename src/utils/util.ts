import { v4 as uuidv4 } from "uuid";

const generateProbability = (): number => {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
};

const codenames = [
    "The Kraken",
    "The Nightingale",
    "The Viper",
    "The Phantom",
    "The Hydra",
    "The Griffin",
    "The Falcon",
    "The Hawk",
    "The Raven",
    "The Panther",
];

const generateCodename = (): string => {
    const randomIndex = Math.floor(Math.random() * codenames.length);
    return codenames[randomIndex];
};

function generateConfirmationCode(): string {
    return uuidv4();
}

export { generateProbability, generateCodename, generateConfirmationCode };
