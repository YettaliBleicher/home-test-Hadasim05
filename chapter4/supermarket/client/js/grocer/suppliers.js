let body = document.querySelector('#body');
let board = document.createElement('div');
board.id = 'board';

// צור כפתור חזרה
let backButton = document.createElement('button');
backButton.className = 'back-button';

// הוסף את הכפתור לדף
body.append(backButton);

// הוסף מאזין לאירוע כדי לחזור לעמוד הקודם כשנלחץ
backButton.addEventListener('click', () => {
    window.history.back();  // מחזיר לעמוד הקודם בהיסטוריה
});

function createSupplier(supplier){
    let buttonSupplier = document.createElement('button');
    buttonSupplier.textContent = `חברה - ${supplier.Company_Name} (ספק: ${supplier.Supplier_Name})`;
    buttonSupplier.id = `buttonSupplier-${supplier.Supplier_Id}`;
    buttonSupplier.addEventListener('click', ()=> selectProduct(supplier.Supplier_Id));
    board.append(buttonSupplier);
}

const getSupplier = async function () {
    console.log("i am in fetch");
    try {
        const suppliers = await fetch('http://localhost:3000/supplier', {
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

getSupplier().then(suppliers => {
    console.log(JSON.stringify(suppliers))
    for (supplier of suppliers[0]) {
        createSupplier(supplier);
    }
});

body.append(board);


function selectProduct(supplierId){
    localStorage.setItem("supplierId", supplierId);
    window.open('../../html/grocer/createOrder.html', '_self');
}
