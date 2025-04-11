let messageElement = null;

const addSupplier = async function (supplierDetails) {
    console.log("i am here! fetch")

    try {
        const response = await fetch('http://localhost:3000/supplier', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(supplierDetails)
        });
        console.log("in fetch after server!");
        const result = await response.json();
        console.log("result from fetch" + result.Supplier_Id);
        return result;
        // return await response.json();
    } catch (error) {
        console.log("fetch error");
        messageElement.textContent = "An error occurred. Please try again.";
    }
}

document.getElementById("signUpForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const companyName = document.getElementById("companyName").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const verify = document.getElementById("vertify").value;
    messageElement = document.getElementById("message");
    if (password !== verify) {
        messageElement.textContent = "Passwords do not match";
        return;
    }

    let supplierDetails = {
        Company_Name: companyName,
        Phone: phone,
        Supplier_Name: name,
        Supplier_Password: password
    };


    addSupplier(supplierDetails).then(result => {
        let supplierId = result[0][0].Supplier_ID
            supplierDetails.Supplier_Id = supplierId;
            localStorage.setItem("supplier", JSON.stringify(supplierDetails));
            window.open('../../html/supplier/insertProduct.html', '_self');

    });

}

)








