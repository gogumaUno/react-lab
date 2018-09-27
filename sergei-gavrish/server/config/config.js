import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const { USER, PASSWORD, HOST, DBPORT, KEY, NAME, SERVERPORT } = process.env;

const db = (async () => {
  try {
    if (process.env.USER && process.env.PASSWORD && process.env.HOST) {
      await mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DBPORT}/${NAME}`, { useNewUrlParser: true })
        .then(() => console.log(`Conection open on port ${DBPORT}`));
    } else {
      await mongoose.connect(`mongodb://localhost:${DBPORT}/${NAME}`, { useNewUrlParser: true })
        .then(() => console.log(`Conection open on port ${DBPORT}`));
    }
  } catch (e) {
    console.error(e);
  }
})();

export { KEY, SERVERPORT, db };
