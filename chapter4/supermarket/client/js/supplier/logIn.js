let allSuppliers = null;

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");
    console.log(phone+" - "+ password);


    const supplierDetails = {
        phone: phone,
        supplierPassword: password
    };

    console.log("supplierDetails---"+ JSON.stringify(supplierDetails));

    const getSuppliers = async function () {
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

    allSuppliers = await getSuppliers();
    console.log("all suppliers---"+ JSON.stringify(allSuppliers[0]));
    let suppliers = allSuppliers[0];

    const supplier = suppliers.find(item => item.Phone === supplierDetails.phone && item.Supplier_Password === supplierDetails.supplierPassword);
    if (!supplier) {
        messageElement.textContent = "עדיין לא בצעת רישום";
        return;
    }
    console.log("log++++"+supplier);
    localStorage.setItem("supplier", JSON.stringify(supplier));
    window.open('../../html/supplier/orders.html', '_self');
    

});













// let allUsers = null;

// document.getElementById("loginForm").addEventListener("submit", async function(event) {
//     event.preventDefault();

//     const nameEmail = document.getElementById("nameEmail").value;
//     const password = document.getElementById("password").value;
//     const messageElement = document.getElementById("message");

//     const userDetails = {
//         email: email,
//         userPassword: password
//     };

//     const getUsers = async function () {
//         try {
//             const users = await fetch('http://localhost:3000/user', {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });
//             return await users.json();
//         } catch (error) {
//             messageElement.textContent = "An error occurred. Please try again.";
//         }
//     };

//     allUsers = await getUsers();

//     const user = allUsers.find(item => item.email===userDetails.email&&item.password===userDetails.password);
//     if(!user)
//     {
//         messageElement.textContent = "עדיין לא בצעת רישום";
//         return;
//     }


//     // if (name === adminDetails.name && password === adminDetails.password && email === adminDetails.email) {
//     //     messageElement.textContent = "Welcome Admin!";
//     //     // Here you can navigate to another page
//     //     window.location.href = "/adminDashboard"; // Replace with your admin page URL
//     // } else {
//     //     try {
//     //         const response = await fetch("/api/login", {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "application/json"
//     //             },
//     //             body: JSON.stringify({ name, email, password })
//     //         });
//     //         const data = await response.json();
//     //         messageElement.textContent = data.message;
//     //     } catch (error) {
//     //         messageElement.textContent = "An error occurred. Please try again.";
//     //     }
//     // }
// });