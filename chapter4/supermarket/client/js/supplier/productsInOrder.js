let board = document.createElement('div');
let body = document.querySelector('#body');
body.append(board);
let products;

let backButton = document.createElement('button');
backButton.className = 'back-button';

body.append(backButton);

backButton.addEventListener('click', () => {
    window.history.back(); 
});


function showProducts(product){
    console.log(JSON.stringify(product));
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
    container.append(num);
    let productName = document.createElement('label');
    productName.textContent = 'שם המוצר';
    productName.className = 'title';
    container.append(productName);
    let name = document.createElement('label');
    name.className = 'value';
    container.append(name);
    let productPrice = document.createElement('label');
    productPrice.className = 'title';
    productPrice.textContent = 'מחיר';
    container.append(productPrice);
    let price = document.createElement('label');
    price.className = 'value';
    container.append(price);
    let productAmount = document.createElement('label');
    productAmount.className = 'title';
    productAmount.textContent = 'כמות שהוזמנה';
    container.append(productAmount);
    let amount = document.createElement('label');
    amount.className = 'value';
    container.append(amount);

    //insert values
    console.log(product.Product_Id+" "+ product.Product_Name+" "+product.Price+" "+product.Amount);
    num.textContent = product.Product_Id;
    name.textContent = product.Product_Name;
    price.textContent = product.Price;
    amount.textContent = product.Amount;


    board.append(productsBoard);
}

const getProductsInOrder = async function (orderId) {
    try {
        const products = await fetch(`http://localhost:3000/products/${orderId}`, {
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

window.addEventListener("DOMContentLoaded", () => {
    const orderId = localStorage.getItem("orderId");
    console.log("client orderID " + orderId);
    getProductsInOrder(orderId).then(products => {
        for (const product of products[0]) {
            showProducts(product);
        }
    });
});
