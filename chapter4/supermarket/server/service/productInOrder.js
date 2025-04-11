import connectToDatabase from './database.js';
import { getQuery, insertQuery, updateQuery, deleteQuery, getOutsideQuery } from './query.js'


const getProductByOrderId = async (orderId) => {
    try {
        console.log("service orderID " + orderId);
        const query = `
        SELECT * FROM ProductsInOrder WHERE Order_Id = '${orderId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};

const addProductsInOtder = async (newProduct) => {
    try {
        let nameValues = "";
        let values = "";
        for (const key in newProduct) {
            nameValues += key + ',';
            if (typeof newProduct[key] === "string")
                values += `'${newProduct[key]}',`;
            else
                values += newProduct[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);

        let product = await insertQuery("ProductInOrder", nameValues, values);
        return product;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};


export {getProductByOrderId, addProductsInOtder}
