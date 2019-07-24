const numberInput = document.getElementById('number'),
    textInput = document.getElementById('msg'),
    button = document.getElementById('button'),
    response = document.querySelector('.response');

let send = () => {
    const number = numberInput.value;
    const text = textInput.value;

    fetch('/', {
        method: 'post',
        headers: {
            'Content-type': 'application.json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

button.addEventListener('click', send, false);
