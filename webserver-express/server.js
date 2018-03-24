require('dotenv').config();

/*  DEPENDENCIES */
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*******************************
  Endpoint
*******************************/
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/service', function (req, res) {
  res.format({
      'application/json': function(){
        res.send(JSON.parse(fs.readFileSync('./public/data/service.json', 'utf8')));
      },
      'default': function(){
        res.status(400).send("Not found");
      }
  })
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
