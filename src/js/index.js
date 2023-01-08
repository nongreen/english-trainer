fetch('word.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
    });
alert("All works well");