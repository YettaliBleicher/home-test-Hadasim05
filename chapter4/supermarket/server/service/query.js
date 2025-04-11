import connectToDatabase from './database.js';
import sql from 'mssql';

const executeQuery = async (query) => {
    try {
        // console.log(query)
        let pool = await connectToDatabase();
        let result = await pool.request()
            .query(query);
        // console.log('Query result:', result);
        // console.log('Query result:', result.recordset); 
        return result.recordsets
    } catch (err) {
        console.error('Query failed! Error:', err);
    } finally {
        sql.close();
    }
};

const getQuery = async (table_name, limit, start, sort, whereIsActive = "") => {
    // console.log("in get query sort: " + sort);
    let query = `SELECT * FROM ${table_name} `;
    let result = await executeQuery(query)
    return result;
};

const getOutsideQuery = async (query) => {
    let result = await executeQuery(query)
    return result;
};

const getOutsideQueryNonReturn = async (query) => {
    let result = await executeQuery(query)
};


const insertQuery = async (table_name, valuesName, values, output) => {
    const query = `INSERT INTO [dbo].${table_name}(${valuesName}) OUTPUT INSERTED.${output} VALUES (${values})`
    const result = await executeQuery(query)
    return result;
};

const insertPartQuery = async (table_name, valuesName, values) => {
    const query = `INSERT INTO [dbo].${table_name}(${valuesName}) VALUES (${values})`
    const result = await executeQuery(query)
    return result;
};

const updateQuery = async (tableName, updateValues, namefiled, valueFiled) => {
    try {

        const query = `UPDATE ${tableName} SET ${updateValues} WHERE ${namefiled} = ${valueFiled}`;
        console.log(query);
        const result = await executeQuery(query)
        return { success: true };
    } catch (error) {
        console.error('Error executing update query:', error);
        throw error;
    }
};

const deleteQuery = async (tableName, nameFiled, valueFiled) => {
    try {
        const query = `DELETE FROM ${tableName} WHERE ${nameFiled} = ${valueFiled}`;
        // console.log(query);
        const result = await executeQuery(query);
        return { success: true };
    } catch (error) {
        console.error('Error executing delete query:', error);
        throw error;
    }
};

export {
    getQuery,getOutsideQuery, insertQuery,insertPartQuery, updateQuery, deleteQuery,getOutsideQueryNonReturn
}

