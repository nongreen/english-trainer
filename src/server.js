const express = require('express');
const fs = require('fs')
const app = express();

const path_to_word_json = 'json/word.json'

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

  let jsonFile = fs.readFileSync(path_to_word_json)
  let json = JSON.parse(jsonFile)
  json.new_words[json.new_words.length] = {
    'word': word,
    'transcription': transcription,
    'translate': translate
  }
  let stringify_json = JSON.stringify(json)
  fs.writeFileSync(path_to_word_json, stringify_json)
  res.redirect('/dictionary')
})
app.post('/dictionary/edit', (req, res) => {
  const word_id = req.body.element_id
  const word_prefix = req.body.element_prefix
  const word = req.body.word 
  const translate = req.body.translate
  const transcription = req.body.transcription

  // Load json file
  let jsonFile = fs.readFileSync(path_to_word_json)
  let json = JSON.parse(jsonFile)

  // Check word_prefix and edit word by word_id
  if (word_prefix === "new_words"){
    json.new_words[word_id] = {
      'word': word,
      'transcription': transcription,
      'translate': translate
    }
  }
  if (word_prefix === "old_words"){
    json.old_words[word_id] = {
      'word': word,
      'transcription': transcription,
      'translate': translate
    }
  }

  let stringify_json = JSON.stringify(json)
  fs.writeFileSync(path_to_word_json, stringify_json)
  res.redirect('/dictionary')
})