const { MongoClient } = require('mongodb');

let clientPromise;

function getDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'hepra_optical';
  if (!uri) {
    const error = new Error('Database is not configured. Set MONGODB_URI in Vercel Environment Variables.');
    error.statusCode = 503;
    throw error;
  }
  if (!clientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000, maxPoolSize: 5 });
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }
  return clientPromise.then((client) => client.db(dbName));
}

module.exports = { getDatabase };
