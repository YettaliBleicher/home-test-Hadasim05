import {getSuppliers, getSupplierById, addSupplier} from '../service/supplier.js'

export class Supplier {
    getAll = async (req, res) => {

        try {
            let suppliers = await getSuppliers();
            res.send(suppliers);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    getById = async (req, res) => {

        try {
            const supplierId = req.params.supplierId;
            let supplier = await getSupplierById(supplierId);
            res.send(supplier);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {

        try {
            let newSupplier = req.body;
            let suppliers = await addSupplier(newSupplier);
            res.send(suppliers);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    }

   
}
