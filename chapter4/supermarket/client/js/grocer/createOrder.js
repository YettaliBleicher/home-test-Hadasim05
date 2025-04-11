let board = document.createElement('div');
let body = document.querySelector('#body');
body.append(board);
let total = document.createElement('div');
total.className = 'total'
let products;
let totalSum = document.createElement('label');
totalSum.name = 'totalSum';

// צור כפתור חזרה
let backButton = document.createElement('button');
backButton.className = 'back-button';

// הוסף את הכפתור לדף
body.append(backButton);

// הוסף מאזין לאירוע כדי לחזור לעמוד הקודם כשנלחץ
backButton.addEventListener('click', () => {
    window.history.back();  // מחזיר לעמוד הקודם בהיסטוריה
});

//פונקציה להצגת המוצר בדף
function showProducts(product){
    let productsBoard = document.createElement('div');
    productsBoard.className = 'productsBoard';
    let container = document.createElement('div');
    container.className = 'container';
    productsBoard.append(container)

    let productNum = document.createElement('label');
    productNum.className = 'title';
    productNum.textContent = 'קוד מוצר';
    container.append(productNum);
    let num = document.createElement('label');
    num.className = 'value';
    num.name = 'num';
    num.textContent = product.Product_Id;
    container.append(num);

    let productName = document.createElement('label');
    productName.textContent = 'שם המוצר';
    productName.className = 'title';
    container.append(productName);
    let name = document.createElement('label');
    name.className = 'value';
    name.textContent = product.Product_Name;
    container.append(name);

    let productPrice = document.createElement('label');
    productPrice.className = 'title';
    productPrice.textContent = 'מחיר';
    container.append(productPrice);
    let price = document.createElement('label');
    price.className = 'value';
    price.textContent = product.Price;
    container.append(price);

    let productAmount = document.createElement('label');
    productAmount.className = 'title';
    productAmount.textContent = 'כמות שהוזמנה';
    container.append(productAmount);
    let amount = document.createElement('input');
    amount.type = 'number';
    amount.min = product.Min_Quantity;
    amount.value = product.Min_Quantity;
    amount.id = 'inputNum';
    amount.name = 'amount';
    amount.addEventListener('input', () => {
        console.log(parseInt(amount.value) * parseFloat(price.textContent));
        sum.textContent = parseInt(amount.value) * parseFloat(price.textContent);
        updateTotalSum(); 
    })
    container.append(amount);

    let sum = document.createElement('label');
    sum.className = 'sum';
    sum.textContent = product.Price * parseInt(amount.value);
    container.append(sum);
    productsBoard.append(container);
    board.append(productsBoard);
}

//פונקציה לקבלת המוצרים לפי ספק מהשרת
const getProductsBySupplierId = async function (supplierId) {
    try {
        const products = await fetch(`http://localhost:3000/productsBySupplier/${supplierId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
        return await products.json();
    } catch (error) {
        // messageElement.textContent = "An error occurred. Please try again.";
    }
};

    const supplierId = localStorage.getItem("supplierId");
 
    console.log("client supplierId " + supplierId);
    getProductsBySupplierId(supplierId).then(products => {
        for (const product of products[0]) {
            showProducts(product);
        }
        totalSum.id = 'totalSum';
        updateTotalSum();
        total.append(totalSum);
    });

//פונקציה לחישוב מחיר כללי
function updateTotalSum() {
    const allSums = document.querySelectorAll('.sum');
    let total = 0;
    allSums.forEach(label => {
        total += parseFloat(label.textContent);
    });
    totalSum.textContent = 'סה"כ להזמנה: ' + total.toFixed(2) + ' ₪';
}

let buttonOk = document.createElement('button');
buttonOk.id = 'ok';
buttonOk.addEventListener('click', () => okOrder())
buttonOk.textContent = 'לאישור הזמנה';
total.append(buttonOk);
body.append(total);
const okOrder = async function(){
    addOrder(orderDetails).then( result => {saveAllProducts(result)})
}

const orderDetails = {
    Supplier_Id: supplierId,
    Order_Date: new Date().toISOString(),
    Status_Id: 1,
    Total_Price: parseFloat(totalSum.textContent.replace(/[^\d.]/g, ''))
};

//הוספת הזמנה
const addOrder = async function (orderDetails) {
    // console.log("i am here! fetch")

    try {
        const response = await fetch('http://localhost:3000/order', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        });
        // console.log("in fetch after server!");
        const result = await response.json();
        // console.log("result from fetch" + result.Supplier_Id);
        return result;
        // return await response.json();
    } catch (error) {
        // console.log("fetch error");
        messageElement.textContent = "An error occurred. Please try again.";
    }
}

//הוספת מוצר
const addProduct = async function (productDetails) {
    // console.log("i am here! fetch")

    try {
        const response = await fetch('http://localhost:3000/productInOrder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productDetails)
        });
        // console.log("in fetch after server!");
        const result = await response.json();
        // console.log("result from fetch" + result);
        return result;
        // return await response.json();
    } catch (error) {
        // console.log("fetch error");
        messageElement.textContent = "An error occurred. Please try again.";
    }
}


function saveAllProducts(orderId) {
    const allProductBoards = document.querySelectorAll('.productsBoard');
    const products = [];

    allProductBoards.forEach(board => {
        const Product_Id = parseInt(board.querySelector('label[name="num"]').textContent);
        const Order_Id = orderId;
        const Amount = parseInt(board.querySelector('input[name="amount"]').value);

        if (!isNaN(Product_Id) && !isNaN(Order_Id) && !isNaN(Amount)) {
            products.push({Product_Id, Order_Id, Amount});
        }
    });

    if (products.length > 0) {
        for(let product of products)
            addProduct(product);
 
        window.open('../../html/grocer/existingOrders.html', '_self');

    } else {
        alert('לא הוזנו נתונים תקינים');
    }
}




