// import { title } from "process";

let board = document.createElement('div');
let body = document.querySelector('#body');
body.append(board);
let supplierOrder;

function createOrder(order){
    console.log(JSON.stringify(order));
    let orderBoard = document.createElement('div');
    orderBoard.className = 'orderBoard';
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
    let products = document.createElement('button');
    products.textContent = 'לצפיה במוצרים';
    products.addEventListener('click',() => show(order.Order_Id))
    container.append(products);
    let ok = document.createElement('button');
    ok.textContent = 'לאישור הזמנה';
    ok.addEventListener('click', () => okOrder(order.Order_Id))
    ok.id = `ok-${order.Order_Id}`
    container.append(ok);
    console.log("----------------------------------------------------------------")
    console.log("order"+JSON.stringify(order));
    //insert values
    console.log(order.Order_Id+" "+ order.Order_Date+" "+order.Status_Id);
    num.textContent = order.Order_Id;
    date.textContent = order.Order_Date.substring(0, 10);
    status.textContent = order.Status_Id;

    board.append(orderBoard);
}

const okOrder = async function(orderId){
    console.log("i am in fetch");
    try {
        const order = await fetch(`http://localhost:3000/order/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const result = await order.json();
        console.log("sssssssssssssssssssssssssssss")
        if (result.success) {
            console.log("!!!!!!!!!!!!!!0");
            const statusLabel = document.getElementById(`status-${orderId}`);
            if (statusLabel) {
                statusLabel.textContent = "2"; // או "מאושר", או כל טקסט אחר שמתאים
            }
        }

        const okButton = document.getElementById(`ok-${orderId}`);
        if (okButton) {
            okButton.remove();
        } 
        return
        // return await order.json();
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again.";
    }
}

const getOrdersSupplier = async function (supplierId) {
    console.log("i am in fetch");
    try {
        const suppliers = await fetch(`http://localhost:3000/order/${supplierId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await suppliers.json();
    } catch (error) {
        messageElement.textContent = "An error occurred. Please try again.";
    }
};

const supplier = localStorage.getItem("supplier");
// המרת המחרוזת לאובייקט
const supplierData = JSON.parse(supplier);

// גישה ל-Supplier_Id
const supplierId = supplierData.Supplier_Id;

getOrdersSupplier(supplierId).then(supplierOrders => {
    // if(supplierOrder == null)
    //     console.log("no orders");
    // else    
        for (const order of supplierOrders[0]) {
            createOrder(order);
        }
});

function show(orderId){
    localStorage.setItem("orderId", orderId);
    window.open('../../html/supplier/productsInOrder.html', '_self');

    // window.location.href = "../../html/supplier/productsInOrder.html";
}


