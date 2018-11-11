const {MongoClient} = require('mongodb');
const express = require('express');

const PORT = 8080;
const CONNECTION_STRING = 'mongodb+srv://tensor:w1lY2oYqHlaS3auL@super-cluster-2018-1yyuq.azure.mongodb.net/test?retryWrites=true';

express()
  .use(express.static('./client/dist'))
  .get('/api/read-db', async (req, res) => {
    let client;
    try {
      client = await MongoClient.connect(CONNECTION_STRING, {
        useNewUrlParser: true
      });

      const collection = client.db('External').collection('Variables');
      res.send({result: await collection.find().toArray()});
      client.close();
    } catch(err) {
      console.log('Could not connect to database!');
      console.log(err);
      res.send({error: 'Не удалось получить данные!'});
    }
  })
  .listen(PORT, function() {
    console.log(`The server is running on port ${PORT}`);
  }).on('error', function(error) {
    console.log('Could not start server!');
    console.log(error);
  });