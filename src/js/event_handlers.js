// append_word_button_onclick deletes button "append_word_button", creates form to create word
function append_word_button_onclick(){
    const block = document.getElementById('append_word')

    button = document.getElementById('append_word_button')
    button.remove()

    var form = document.createElement('form')
    form.method = 'POST'
    form.action = '/dictionary/append'
    form.autocomplete = "off"
    form.id = "append_word_form"

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
    cancel_button.onclick = append_word_cancel_button_onclick

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

// edit_word_button_onclick deletes button "append_word_button", creates form to edit word
// load fields values from json
function edit_word_button_onclick(event){
    const block = document.getElementById('append_word')

    button = document.getElementById('append_word_button')
    if (button != null){
        button.remove()
    }

    var form = document.getElementById('append_word_form')
    if (form != null){
        form.remove()
        delete form
    }
    var message = document.getElementById('error_message')
    if (message != null) {
        message.remove()
    }
    var form = document.createElement('form')
    form.method = 'POST'
    form.action = '/dictionary/edit'
    form.autocomplete = "off"
    form.id = "append_word_form"

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
    var apply_button = document.createElement('button')
    apply_button.type = 'submit'
    apply_button.innerText = 'Apply'

    // cancel_button
    var cancel_button = document.createElement('button')
    cancel_button.innerText = 'Cancel'
    cancel_button.onclick = edit_word_cancel_button_onclick

    form.appendChild(word_label)
    form.appendChild(word_input)
    form.appendChild(transcription_label)
    form.appendChild(transcription_input)
    form.appendChild(translate_label)
    form.appendChild(translate_input)
    form.appendChild(apply_button)
    form.appendChild(cancel_button)

    // Load word values from json in fields
    var edit_button_id = event.target.id
    var edit_button_prefix = getEditButtonPrefix(edit_button_id)
    var edit_button_element_id = getEditButtonElementID(edit_button_id)

    if (edit_button_prefix != "" & edit_button_element_id != null){
        block.appendChild(form)
        element_id_input = document.createElement("input")
        element_id_input.type = "hidden"
        element_id_input.name = "element_id"
        element_id_input.value = edit_button_element_id 
        form.appendChild(element_id_input)

        element_prefix_input = document.createElement("input")
        element_prefix_input.type = "hidden"
        element_prefix_input.name = "element_prefix"
        element_prefix_input.value = edit_button_prefix 
        form.appendChild(element_prefix_input)

        fetch(name_of_word_json)
            .then((response) => response.json())
            .then((json) => {
                var word_list
                if (edit_button_prefix === new_words_id_prefix){
                    word_list = json.new_words
                }
                if (edit_button_prefix === old_words_id_prefix){
                    word_list = json.old_words
                }

                var word = word_list[edit_button_element_id]

                word_input.value = word.word
                transcription_input.value = word.transcription
                translate_input.value = word.translate
            })
    } else {
        let message = document.createElement("p")
        message.innerText("Cannot load information about word")
        message.id = "error_message"
    }
}

// append_word_cancel_button_onclick deletes form and creates button "append_word_button"
function append_word_cancel_button_onclick(){
    const form = document.getElementById("append_word_form")
    const block = document.getElementById('append_word')

    form.remove()
    block.appendChild(append_word_button)
}

// append_word_cancel_button_onclick deletes form and creates button "append_word_button"
function edit_word_cancel_button_onclick(){
    const form = document.getElementById("append_word_form")
    const block = document.getElementById('append_word')

    form.remove()
    block.appendChild(append_word_button)
}

// main_checkbox_onchange syncs main checkbox with child checkboxes and appends or deletes 'delete_button'
// if it's need
function main_checkbox_onchange(event){
    var main_checkbox = event.target
    var main_checkbox_prefix = getCheckBoxPrefix(main_checkbox.id) 
    if (main_checkbox_prefix === null) return

    var child_checkboxes = document.getElementsByClassName(main_checkbox_prefix + '_word_checkbox')
    for (var i = 0; i < child_checkboxes.length; i++){
        var checkbox = child_checkboxes.item(i)
        checkbox.checked = main_checkbox.checked
    }

    // Check having delete button and appending or deleting it
    var delete_button = document.getElementById("delete_word_button")
    var haveCheckedCheckboxes = checkCheckedCheckboxes("new_words") | checkCheckedCheckboxes("old_words")
    if (haveCheckedCheckboxes & delete_button === null){
        delete_button = createDeleteButton()
        append_word_block = document.getElementById("append_word")
        document.body.insertBefore(delete_button, append_word_block)
        return
    }
    if (!haveCheckedCheckboxes & delete_button != null){
        delete_button.remove()
        return
    }
}

// word_checkbox_onchange appends or deletes 'delete_button' if it's need
function word_checkbox_onchange(event){
    var word_checkbox_id = event.target.id
    var word_checkbox_prefix = getCheckBoxPrefix(word_checkbox_id)
    var delete_button = document.getElementById("delete_word_button")
    var haveCheckedCheckboxes = checkCheckedCheckboxes("new_words") | checkCheckedCheckboxes("old_words")
    if (haveCheckedCheckboxes & delete_button === null) {
        delete_button = createDeleteButton()
        append_word_block = document.getElementById("append_word")
        document.body.insertBefore(delete_button, append_word_block)
        return
    }
    if (!haveCheckedCheckboxes & delete_button != null) {
        delete_button.remove()
        return
    }
}

// delete_button_onclick gets deleting words list and send POST request to server on delete
function delete_button_onclick(){
    var deleting_new_words = getDeletingWords('new_words')
    var deleting_old_words = getDeletingWords('old_words')
    var json = {
        deleting_new_words: deleting_new_words,
        deleting_old_words: deleting_old_words
    }
    fetch('/dictionary/delete', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    }).then(() => {
        location.reload()
    })
}

// checkCheckedCheckboxes checks list of checkboxes on checked state and returns true if
// even one is true, and false if anyone haven't checked state
function checkCheckedCheckboxes(class_prefix){
    var checkboxes = document.getElementsByClassName(class_prefix + '_word_checkbox')
    for (var i = 0; i < checkboxes.length; i++){
        if (checkboxes.item(i).checked) return true
    }
    return false
}

// getDeletingWords get all checkboxes with current class_prefix and return its ID
function getDeletingWords(class_prefix){
    var checkboxes = document.getElementsByClassName(class_prefix + '_word_checkbox')
    var deletingWords = []

    for (var i = 0; i < checkboxes.length; i++){
        var checkbox = checkboxes.item(i)
        if (checkbox.checked){
            var wordID = getCheckBoxElementID(checkbox.id)
            deletingWords.push(wordID)
        }
    }

    return deletingWords
}

// getMainCheckBoxPrefix analyzes main_checkbox_id(string) and returns prefix of word(string)
function getCheckBoxPrefix(main_checkbox_id){
    if (main_checkbox_id.includes(new_words_id_prefix)){
        return new_words_id_prefix
    }
    if (main_checkbox_id.includes(old_words_id_prefix)){
        return old_words_id_prefix
    }
    return ""
}

// getCheckBoxElementID analyzes check_box_id(string) and returns id of word(int)
function getCheckBoxElementID(check_box_id){
    re = /\d+$/
    result = re.exec(check_box_id)
    if (result.length == 1){
        return parseInt(result[0])
    }
    return null
}

// getEditButtonPrefix analyzes edit_button_id(string) and returns prefix of word(string)
function getEditButtonPrefix(edit_button_id){
    if (edit_button_id.includes(new_words_id_prefix)){
        return new_words_id_prefix
    }
    if (edit_button_id.includes(old_words_id_prefix)){
        return old_words_id_prefix
    }
    return ""
}

// getEditButtonPrefix analyzes edit_button_id(string) and returns id of word(int)
function getEditButtonElementID(edit_button_id){
    re = /\d+$/
    result = re.exec(edit_button_id)
    if (result.length == 1){
        return parseInt(result[0])
    }
    return null
}

// createDeleteButton creates, prepares and returns delete_button
function createDeleteButton(){
    var delete_button = document.createElement('button')
    delete_button.id = 'delete_word_button'
    delete_button.type = 'button'
    delete_button.innerText = 'Delete selected words'
    delete_button.onclick = delete_button_onclick
    return delete_button
}