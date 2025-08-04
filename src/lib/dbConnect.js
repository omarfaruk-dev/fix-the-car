import { MongoClient, ServerApiVersion } from 'mongodb';

async function dbConnect(collectionName) {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2vxppji.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, { 
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
 
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');
        
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(collectionName);
        
        return { collection, client };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

export default dbConnect;