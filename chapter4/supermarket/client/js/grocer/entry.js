let body = document.querySelector('#body');
let board = document.createElement('div')
board.id = 'board';
let label = document.createElement('label');
label.textContent = 'הכנס סיסמה';
label.id = 'passwordLabel';
board.append(label);
let inputPassword = document.createElement('input');
inputPassword.id = 'inputPassword';
inputPassword.type = 'password';
board.append(inputPassword);
let buttonOk = document.createElement('button');
buttonOk.id = 'inputPassword'
buttonOk.addEventListener('click',()=> ok());
buttonOk.textContent = 'אישור';
board.append(buttonOk);
let message = document.createElement('label')
message.id = 'message';
board.append(message);
body.append(board);


const ok = async function () {
    let inputPassword = document.querySelector('#inputPassword').value;
    let message = document.querySelector('#message');
    console.log("-----------------1")
    await fetch('http://localhost:3000/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: inputPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.open('../../html/grocer/home.html', '_self');
        } else {
            message.textContent = 'סיסמה שגויה';
            message.style.color = 'red';
        }
    })
    .catch(error => {
        message.textContent = 'אירעה שגיאה, נסה שוב מאוחר יותר';
        message.style.color = 'red';
    });
}
