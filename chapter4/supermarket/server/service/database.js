import sql from 'mssql';

const config = {
    user: 'yetta',
    password: 'yetta1461',
    server: 'DESKTOP-FVA15IL',
    database: 'Supermarket',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const connectToDatabase = async () => {
    try {
        let pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error('Dataabase connection failed! Error:', err);
        throw err;
    }
};

export default connectToDatabase;
