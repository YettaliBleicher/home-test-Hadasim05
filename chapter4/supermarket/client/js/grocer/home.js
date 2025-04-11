let body = document.querySelector('#body');
let board = document.createElement('div');
board.id = 'board';
//button to show existing order
let buttonOrder = document.createElement('button');
buttonOrder.textContent = 'לצפייה בהזמנות קיימות';
buttonOrder.addEventListener('click', existingOrders);
board.append(buttonOrder);
//button to create order
let buttonCreateOrder = document.createElement('button');
buttonCreateOrder.textContent = 'ליצירת הזמנה חדשה';
buttonCreateOrder.addEventListener('click', createOrders);
board.append(buttonCreateOrder);
//button to show history order
let buttonHistory = document.createElement('button');
buttonHistory.textContent = 'לצפייה בהיסטורית הזמנות'
buttonHistory.addEventListener('click', historyOrder);
board.append(buttonHistory);

body.append(board);


function existingOrders(){
    window.open('../../html/grocer/existingOrder.html', '_self');
}

function createOrders(){
    window.open('../../html/grocer/suppliers.html', '_self');
}

function historyOrder(){
    window.open('../../html/grocer/historyOrder.html', '_self');
}
