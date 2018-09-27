import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

console.log(PORT);

export default PORT;
