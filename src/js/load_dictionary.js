fetch('word.json')
    .then((response) => response.json())
    .then((json) => {
        var table = document.createElement('table')
        table.id = 'table'

        var header_row = document.createElement('tr')
        header_row.id = 'header_row'

        // Filling of header row
        const table_headers = ['Word', 'Transcription', 'Translate']
        table_headers.forEach(element => {
            var header_column = document.createElement('th')
            header_column.innerText = element
            header_row.appendChild(header_column)
        })
        table.appendChild(header_row)

        // Filling table by words
        json.old_words.forEach(word => {
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

        document.body.appendChild(table)
    });