const express = require('express');
const fs = require('fs')
const app = express();

app.listen(8080, () => {
  console.log('Application started and Listening on port 8080');
});

app.use(express.static('js'))
app.use(express.static('json'))
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html')
});
app.get('/dictionary', (req, res) => {
  res.sendFile(__dirname + '/html/dictionary.html')
});
app.post('/dictionary/append', (req, res) => {
  const word = req.body.word 
  const translate = req.body.translate
  const transcription = req.body.transcription

  let jsonFile = fs.readFileSync('json/word.json')
  let json = JSON.parse(jsonFile)
  json.new_words[json.new_words.length] = {
    'word': word,
    'transcription': transcription,
    'translate': translate
  }
  let stringify_json = JSON.stringify(json)
  fs.writeFileSync('json/word.json', stringify_json)
  res.redirect('/dictionary')
})