
// let board = document.createElement('div');
// let body = document.querySelector('#body');
// let main = document.querySelector('#main');
// body.append(board);
// let addButton = document.createElement('button');
// addButton.textContent = 'להוספת סחורה';
// addButton.id = 'add'
// addButton.addEventListener('click', addProductBoard);
// main.append(addButton);

// function addProductBoard(){
//     // console.log(JSON.stringify(product));
//     let productsBoard = document.createElement('div');
//     productsBoard.className = 'productsBoard';
//     let container = document.createElement('div');
//     container.className = 'container';
//     productsBoard.append(container)
//     let productName = document.createElement('label');
//     productName.className = 'title';
//     productName.textContent = 'שם מוצר';
//     container.append(productName);
//     let name = document.createElement('input');
//     name.className = 'inputString';
//     container.append(name);
//     let productMinQuantity = document.createElement('label');
//     productMinQuantity.textContent = 'כמות מינימלית להזמנה';
//     productMinQuantity.className = 'title';
//     container.append(productMinQuantity);
//     let minQuantity = document.createElement('input');
//     minQuantity.type='number';
//     minQuantity.className = 'inputNum';
//     container.append(minQuantity);
//     let productPrice = document.createElement('label');
//     productPrice.className = 'title';
//     productPrice.textContent = 'מחיר';
//     container.append(productPrice);
//     let price = document.createElement('input');
//     price.type = 'number';
//     price.step = '0.1';
//     price.className = 'inputNum';
//     container.append(price);

//     //insert values
//     // console.log(product.Product_Id+" "+ product.Product_Name+" "+product.Price+" "+product.Amount);
//     // num.textContent = product.Product_Id;
//     // name.textContent = product.Product_Name;
//     // price.textContent = product.Price;
//     // amount.textContent = product.Amount;


//     board.append(productsBoard);
// }

let board = document.createElement('div');
board.id = 'productBoard';
let body = document.querySelector('#body');
let main = document.querySelector('#main');
let buttons = document.querySelector('#buttons')
body.append(board);

// כפתור הוספת מוצר
let addButton = document.createElement('button');
addButton.textContent = 'להוספת סחורה';
addButton.id = 'add';
addButton.addEventListener('click', addProductBoard);
buttons.append(addButton);

// כפתור שמירה כולל
let saveAllButton = document.createElement('button');
saveAllButton.textContent = 'שמור את כל המוצרים';
saveAllButton.id = 'saveAll';
saveAllButton.addEventListener('click', saveAllProducts);
buttons.append(saveAllButton);

// פונקציית הוספת טופס מוצר
function addProductBoard(){
    let productsBoard = document.createElement('div');
    productsBoard.className = 'productsBoard';

    let container = document.createElement('div');
    container.className = 'container';

    // שם מוצר
    let productName = document.createElement('label');
    productName.className = 'title';
    productName.textContent = 'שם מוצר';
    container.append(productName);
    let name = document.createElement('input');
    name.className = 'inputString';
    name.name = 'name'; // מזהה
    container.append(name);

    // כמות מינימלית
    let productMinQuantity = document.createElement('label');
    productMinQuantity.textContent = 'כמות מינימלית להזמנה';
    productMinQuantity.className = 'title';
    container.append(productMinQuantity);
    let minQuantity = document.createElement('input');
    minQuantity.type = 'number';
    minQuantity.className = 'inputNum';
    minQuantity.name = 'minQuantity';
    container.append(minQuantity);

    // מחיר
    let productPrice = document.createElement('label');
    productPrice.className = 'title';
    productPrice.textContent = 'מחיר';
    container.append(productPrice);
    let price = document.createElement('input');
    price.type = 'number';
    price.step = '0.1';
    price.className = 'inputNum';
    price.name = 'price';
    container.append(price);

    productsBoard.append(container);
    board.append(productsBoard);
}

// פונקציית שמירת כל המוצרים
function saveAllProducts() {
    const allProductBoards = document.querySelectorAll('.productsBoard');
    const products = [];

    allProductBoards.forEach(board => {
        const Product_Name = board.querySelector('input[name="name"]').value.trim();
        const Min_Quantity = parseInt(board.querySelector('input[name="minQuantity"]').value);
        const Price = parseFloat(board.querySelector('input[name="price"]').value);
        const Supplier_Id = supplierId

        if (Product_Name && !isNaN(Min_Quantity) && !isNaN(Price)) {
            products.push({Supplier_Id, Product_Name, Min_Quantity, Price });
        }
    });

    if (products.length > 0) {
        for(let product of products)
            addProduct(product);

        window.open('../../html/supplier/orders.html', '_self');

    } else {
        alert('לא הוזנו נתונים תקינים');
    }
}

const addProduct = async function (productDetails) {
    console.log("i am here! fetch")

    try {
        const response = await fetch('http://localhost:3000/product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productDetails)
        });
        console.log("in fetch after server!");
        const result = await response.json();
        console.log("result from fetch" + result);
        return result;
    } catch (error) {
        console.log("fetch error");
        messageElement.textContent = "An error occurred. Please try again.";
    }
}

const supplier = localStorage.getItem("supplier");
// המרת המחרוזת לאובייקט
const supplierData = JSON.parse(supplier);

// גישה ל-Supplier_Id
const supplierId = supplierData.Supplier_Id;

console.log("!@@@"+supplierId); // 22

// console.log("!!!!!!!!!!!!!!!!!"+JSON.stringify(supplier));
// console.log("!!!!!!!!!!!!!!!!!"+supplier[0]);

// console.log("!!!!!!!!!!!!!!!!!"+supplier.Supplier_Id);

