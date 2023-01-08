function append_word_button_expand(){
    const block = document.getElementById('append_word')

    button = document.getElementById('append_word_button')
    button.remove()

    var form = document.createElement('form')
    form.method = 'POST'
    form.action = '/dictionary/append'
    form.autocomplete = "off"

    // word_input
    var word_input = document.createElement('input')
    word_input.id = 'word_input'
    word_input.type = 'text'
    word_input.name = 'word'
    var word_label = document.createElement('label')
    word_label.htmlFor = 'word_input'
    word_label.innerText = 'Word:'

    // transcription_input
    var transcription_input = document.createElement('input')
    transcription_input.id = 'transcription_input'
    transcription_input.type = 'text'
    transcription_input.name = 'transcription'
    var transcription_label = document.createElement('label')
    transcription_label.htmlFor = 'transcription_input'
    transcription_label.innerText = 'Transcription:'

    // translate_input
    var translate_input = document.createElement('input')
    translate_input.id = 'translate_input'
    translate_input.type = 'text'
    translate_input.name = 'translate'
    var translate_label = document.createElement('label')
    translate_label.htmlFor = 'translate_input'
    translate_label.innerText = 'Translate:'

    // submit_button
    var submit_button = document.createElement('button')
    submit_button.type = 'submit'
    submit_button.innerText = 'Append'

    // cancel_button
    var cancel_button = document.createElement('button')
    cancel_button.innerText = 'Cancel'
    cancel_button.onclick = function(){
        form.remove()
        block.appendChild(button)
    }

    form.appendChild(word_label)
    form.appendChild(word_input)
    form.appendChild(transcription_label)
    form.appendChild(transcription_input)
    form.appendChild(translate_label)
    form.appendChild(translate_input)
    form.appendChild(submit_button)
    form.appendChild(cancel_button)

    block.appendChild(form)
}