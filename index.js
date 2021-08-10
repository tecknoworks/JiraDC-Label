const express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const Label = require('./models/label')

const port = 8088

var mongoDB = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/label', async (req, res) => {
    let newLabel = req.body
    var addLabel=new Label({name:newLabel.name})
    await Label.create(addLabel)
    res.send(newLabel)
})

app.get('/label', async (req, res) =>{
    const record= await Label.find({})
    res.json(record)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })