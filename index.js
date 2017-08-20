var express = require('express')
var app = express()
var request = require('request');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  var json = {"handle":"akilud"}
  res.send(json)
})

app.get('/server',function(req,res){
  request.get({
    url: "https://api.digitalocean.com/v2/droplets?page=1&per_page=1",
    headers: {"Content-Type": "application/json", "Authorization": "Bearer beac5a87875b87fc30d325fc9d68d57f997029e7e5f9fa5dee4616d7332f6428"}
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (response.statusCode !== 200) {
      console.log('Status:', response.statusCode);
    } else{
      var drops = JSON.parse(data).droplets[0]
      res.send( JSON.stringify(drops, null, 10));
    }
});
})

app.listen(8001)
