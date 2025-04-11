let board = document.createElement('div');
let body = document.querySelector('#body');
body.append(board);
let supplierOrder;

// צור כפתור חזרה
let backButton = document.createElement('button');
backButton.className = 'back-button';

// הוסף את הכפתור לדף
body.append(backButton);

// הוסף מאזין לאירוע כדי לחזור לעמוד הקודם כשנלחץ
backButton.addEventListener('click', () => {
    window.history.back();  // מחזיר לעמוד הקודם בהיסטוריה
});

function createOrder(order){
    // console.log(JSON.stringify(order));
    let orderBoard = document.createElement('div');
    orderBoard.className = 'orderBoard';
    orderBoard.id = `orderBoard-${order.Order_Id}`
    let container = document.createElement('div');
    container.className = 'container';
    orderBoard.append(container)
    let orderNum = document.createElement('label');
    orderNum.className = 'title';
    orderNum.textContent = 'מס הזמנה';
    container.append(orderNum);
    let num = document.createElement('label');
    num.className = 'value';
    container.append(num);
    let orderDate = document.createElement('label');
    orderDate.textContent = 'תאריך';
    orderDate.className = 'title';
    container.append(orderDate);
    let date = document.createElement('label');
    date.className = 'value';
    container.append(date);
    let orderStatus = document.createElement('label');
    orderStatus.className = 'title';
    orderStatus.textContent = 'מצב הזמנה';
    container.append(orderStatus);
    let status = document.createElement('label');
    status.className = 'value';
    status.id = `status-${order.Order_Id}`;
    container.append(status);
    let orderSum = document.createElement('label');
    orderSum.className = 'title';
    orderSum.textContent = 'סה"כ לתשלום';
    container.append(orderSum);
    let sum = document.createElement('label');
    sum.className = 'value';
    container.append(sum);
    let products = document.createElement('button');
    products.textContent = 'לצפיה במוצרים';
    products.addEventListener('click',() => show(order.Order_Id))
    container.append(products);
    if(order.Status_Id != 1)
    {
        let ok = document.createElement('button');
        ok.textContent = 'לאישור קבלת הזמנה';
        ok.addEventListener('click', () => okOrder(order.Order_Id, 3))
        container.append(ok);
    }
    // console.log("order"+JSON.stringify(order));
    //insert values
    console.log(order.Order_Id+" "+ order.Order_Date+" "+order.Status_Id);
    num.textContent = order.Order_Id;
    date.textContent = order.Order_Date.substring(0, 10);
    status.textContent = order.Status_Id;

    board.append(orderBoard);
}

const okOrder = async function(orderId, statusId){
    console.log("i am in fetch");
    try {
        const order = await fetch(`http://localhost:3000/order/${orderId}/${statusId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result = await order.json();
        if (result.success) {
            const statusLabel = document.getElementById(`status-${orderId}`);
            if (statusLabel) {
                statusLabel.textContent = "2";
            }
        }

        const orderBoard = document.getElementById(`orderBoard-${orderId}`);
        console.log("asdfghjkl  "+orderBoard);
        if (orderBoard) {
            console.log("------------------");
            orderBoard.remove();
        } 
        return
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again.";
    }
}

const getExistingOrders = async function (statuseId) {
    console.log("i am in fetch");
    try {
        const orders = await fetch(`http://localhost:3000/orders/${statuseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await orders.json();
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again.";
    }
};


getExistingOrders(1).then(Orders => {
        for (const order of Orders[0]) {
            createOrder(order);
        }
});

getExistingOrders(2).then(Orders => {
        for (const order of Orders[0]) {
            createOrder(order);
        }
});

function show(orderId){
    localStorage.setItem("orderId", orderId);
    window.open('../../html/supplier/productsInOrder.html', '_self');

}


