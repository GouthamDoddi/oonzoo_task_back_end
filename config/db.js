import mongodb from 'mongodb';
// import { logger, errorLogger, successLogger } from "./logger.js";


const { MongoClient, Db } = mongodb;

// const __dirname = dirname(fileURLToPath(import.meta.url));
// dotenv.config({ path: __dirname+'./../.env' });1

//db init
const uri = ''

const connect = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db('miramira')

        console.log(`connected to db miramira`);
        return db

    } catch (err) {
        console.log(err)
        client.close();
    }

}

const db = await connect()

// export const getAllRecordsFromCollection = async (collectionName) => {
//     try {
//         const collection = db.collection(collectionName)
//         const records = await collection.find().toArray()
//         // logger.info(records)
//         return records
//     } catch (err) {
//         logger.info(err)
//         errorLogger.error(`error getting all records from collection ${collectionName}`);
//         errorLogger.error(err);
//         return err 
//     }
// }

export default db


// const uri = "mongodb+srv://goutham:<password>@cluster0.ipdqc.mongodb.net/?retryWrites=true&w=majority";
