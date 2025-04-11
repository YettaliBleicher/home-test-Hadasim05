import connectToDatabase from './database.js';
import { getQuery, insertQuery, updateQuery, deleteQuery, getOutsideQuery } from './query.js'


const getSuppliers = async () => {
    try {
        let suppliers = await getQuery("Suppliers");
        return suppliers;
    } catch (err) {
        console.error('Query failed! Error:', err);
        return [];
    } finally {

    }
};

const getSupplierById = async (supplierId) => {
    try {
        const query = `
        SELECT * FROM Suppliers WHERE Supplier_Id = '${supplierId}';
    `;
        let result = await getOutsideQuery(query);
        console.log(result)
        return result

    } catch (error) {
        console.error('Error executing query:', error);
        return null; // או לזרוק שגיאה לפי הצורך
    }
};
const addSupplier = async (newSupplier) => {
    try {
        let nameValues = "";
        let values = "";
        for (const key in newSupplier) {
            nameValues += key + ',';
            if (typeof newSupplier[key] === "string")
                values += `'${newSupplier[key]}',`;
            else
                values += newSupplier[key] + ',';
        }
        nameValues = nameValues.slice(0, -1);
        values = values.slice(0, -1);
        console.log("------"+nameValues);
        console.log("******"+values);

        let supplier = await insertQuery("Suppliers", nameValues, values, 'Supplier_ID');
        console.log("++++++"+JSON.stringify(supplier))
        return supplier;
    } catch (err) {
        console.error('Query Error:', err);
        return { "error": "err" };
    }
};



export {getSuppliers, getSupplierById, addSupplier}