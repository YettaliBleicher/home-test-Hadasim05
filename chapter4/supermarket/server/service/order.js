import connectToDatabase from './database.js';
import { getQuery, insertQuery, updateQuery, deleteQuery, getOutsideQuery } from './query.js'

const getOrdersBySupplier = async (supplierId) => {
    try {
        console.log("service");
        const query = `
        SELECT * FROM Orders WHERE Supplier_Id = '${supplierId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};

const getOrdersByStatusId = async (statusId) => {
    try {
        console.log("service");
        const query = `
        SELECT * FROM Orders WHERE Status_Id = '${statusId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null;
    }
};

const addOrder = async (newOrder) => {
    try {
        let nameValues = "";
        let values = "";
        for (const key in newOrder) {
            nameValues += key + ',';
            if (typeof newOrder[key] === "string")
                values += `'${newOrder[key]}',`;
            else
                values += newOrder[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);

        let supplier = await insertQuery("Orders", nameValues, values,'Order_Id');
        return supplier;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};


const updateOrder = async (orderId, statusId) => {
    try {
        // let statusId = 2;
        let updateU = `Status_Id = ${statusId}`;
        let order = await updateQuery("Orders", updateU, "Order_Id", orderId);
        return order;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};
export {getOrdersBySupplier, updateOrder, addOrder, getOrdersByStatusId}