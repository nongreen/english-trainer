const new_words_id_prefix = 'new_words'
const old_words_id_prefix = 'old_words'
const name_of_word_json = 'word.json'

var append_word_button = document.getElementById('append_word_button')
append_word_button.onclick = append_word_button_onclick
append_word_button.innerText = 'Append word'