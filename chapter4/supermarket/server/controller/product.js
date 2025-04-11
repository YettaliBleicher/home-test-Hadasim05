import {getProducts, getProductById, getProductByOrderId, getProductBySupplierId, addProducts} from '../service/product.js'

export class Product {
    getAll = async (req, res) => {

        try {
            let products = await getProducts();
            res.send(products);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    getById = async (req, res) => {

        try {
            const productId = req.params.productId;
            let product = await getProductById(productId);
            res.send(product);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    getByOrderId = async (req, res) => {

        try {
            const orderId = req.params.orderId;
            console.log("controller----"+orderId);
            let products = await getProductByOrderId(orderId);
            res.send(products);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    getBySupplierId = async (req, res) => {

        try {
            const supplierId = req.params.supplierId;
            // console.log("controller----"+supplierId);
            let products = await getProductBySupplierId(supplierId);
            res.send(products);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {

        try {
            let newProduct = req.body;
            let products = await addProducts(newProduct);
            res.send(products);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    }
}