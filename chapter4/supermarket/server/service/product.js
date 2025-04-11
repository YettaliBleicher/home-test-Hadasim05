import connectToDatabase from './database.js';
import { getQuery, insertQuery, updateQuery, deleteQuery, getOutsideQuery } from './query.js'


const getProducts = async () => {
    try {
        let products = await getQuery("Products");
        return products;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } finally {

    }
};

const getProductById = async (productId) => {
    try {
        const query = `
        SELECT * FROM Products WHERE Product_Id = '${productId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};

const getProductByOrderId = async (orderId) => {
    try {
        const query = `
        SELECT P.Product_Id, P.Product_Name, P.Price, PO.Amount 
        FROM ProductInOrder as PO
        JOIN Products as P 
        ON p.Product_Id = PO.Product_Id
        WHERE PO.Order_Id = '${orderId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};

const getProductBySupplierId = async (supplierId) => {
    try {
        const query = `SELECT * FROM Products WHERE Supplier_Id = '${supplierId}';`;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};

const addProducts = async (newProducts) => {
    try {
        let nameValues = "";
        let values = "";
        for (const key in newProducts) {
            nameValues += key + ',';
            if (typeof newProducts[key] === "string")
                values += `'${newProducts[key]}',`;
            else
                values += newProducts[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);

        let product = await insertQuery("Products", nameValues, values);
        return product;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};

export {getProducts, getProductById, getProductByOrderId,getProductBySupplierId, addProducts}
