const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://dbIGTI:bootcampIGTI@cluster0.i0ege.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db('grades').collection('student');
  // perform actions on the collection object
  const documents = await collection.find().toArray();
  console.log(documents);
  const databaseslist = await client.db().admin().listDatabases();
  console.log('Databases: ');
  databaseslist.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
  client.close();
});
