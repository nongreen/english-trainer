// display_table creates and displays table in parent
// takes parent, json and id_prefix.
// id_prefix must be like 'prefix'
function display_table(parent, word_list, id_prefix=''){
    if (id_prefix === ''){
        id_prefix = 'undefined'
    }

    var table = document.createElement('table')
    table.id = id_prefix + 'table'

    var header_row = document.createElement('tr')
    header_row.classList.add('table_header_row')
    header_row.id = id_prefix + '_table_header_row'

    // Filling of header row
    const table_headers = ['Word', 'Transcription', 'Translate']
    table_headers.forEach(element => {
        var header_column = document.createElement('th')
        header_column.innerText = element
        header_column.classList.add('table_header_column')
        header_row.appendChild(header_column)
    })
    table.appendChild(header_row)

    // Filling table by words
    word_list.forEach(word => {
        word_row = document.createElement('tr')

        word_column = document.createElement('th')
        word_column.innerText = word.word
        word_row.appendChild(word_column)
        
        word_column = document.createElement('th')
        word_column.innerText = word.transcription
        word_row.appendChild(word_column)

        word_column = document.createElement('th')
        word_column.innerText = word.translate
        word_row.appendChild(word_column)

        table.appendChild(word_row)
    })
    parent.appendChild(table)
}

fetch('word.json')
    .then((response) => response.json())
    .then((json) => {
        new_words_p = document.createElement('p')
        new_words_p.innerText = 'New words'

        old_words_p = document.createElement('p')
        old_words_p.innerText = 'Old words'

        if (json.new_words.length != 0){
            document.body.appendChild(new_words_p)
            display_table(document.body, json.new_words, 'new_words')
        }

        if (json.old_words.length != 0){
            document.body.appendChild(old_words_p)
            display_table(document.body, json.old_words, 'old_words')
        }
    });