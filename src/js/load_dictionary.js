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
    // main_checkbox
    var main_checkbox = document.createElement('input')
    main_checkbox.type = "checkbox"
    main_checkbox.id = id_prefix + '_main_checkbox'
    main_checkbox.onchange = main_checkbox_onchange
    var header_column = document.createElement('th')
    header_column.appendChild(main_checkbox)
    header_row.appendChild(header_column)

    // Other headers
    const table_headers = ['Word', 'Transcription', 'Translate', 'edit']
    table_headers.forEach(element => {
        var header_column = document.createElement('th')
        header_column.innerText = element
        header_column.classList.add('table_header_column')
        header_row.appendChild(header_column)
    })
    table.appendChild(header_row)

    // Filling table by words
    word_list.forEach(function(word, i) {
        var word_row = document.createElement('tr')

        // Word checkbox
        var word_column = document.createElement('th')
        var word_checkbox = document.createElement('input')
        word_checkbox.type = "checkbox"
        word_checkbox.id = id_prefix + "_word_checkbox" + String(i)
        word_checkbox.onchange = word_checkbox_onchange
        word_checkbox.classList.add(id_prefix + "_word_checkbox")
        word_column.appendChild(word_checkbox)
        word_row.appendChild(word_column)

        // Word column
        var word_column = document.createElement('th')
        word_column.innerText = word.word
        word_row.appendChild(word_column)
        
        // Transcription column
        var word_column = document.createElement('th')
        word_column.innerText = word.transcription
        word_row.appendChild(word_column)

        // Translate column
        var word_column = document.createElement('th')
        word_column.innerText = word.translate
        word_row.appendChild(word_column)

        // edit_button
        var edit_button = document.createElement('a')
        edit_button.onclick = edit_word_button_onclick
        edit_button.innerText = "Edit"
        edit_button.id = id_prefix + "edit_button_" + String(i)
        word_row.appendChild(edit_button)

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
            display_table(document.body, json.new_words, new_words_id_prefix)
        }

        if (json.old_words.length != 0){
            document.body.appendChild(old_words_p)
            display_table(document.body, json.old_words, old_words_id_prefix)
        }
    });