const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  // Connect to MongoDB
  const client = new MongoClient('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  // Access a sample collection
  const collection = client.db('mydb').collection('mycollection');

  // Insert a document
  await collection.insertOne({ message: 'Hello, MongoDB!' });

  // Retrieve documents
  const result = await collection.find({}).toArray();

  res.json(result);

  // Close the connection
  await client.close();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
