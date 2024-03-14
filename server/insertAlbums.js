var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:8000/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var myobj = [
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
    { title: '', artist: '', cover: ''},
  ];
  dbo.collection("albums").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});