import {getProductByOrderId, addProductsInOtder} from '../service/productInOrder.js'

export class ProductInOrder {
    getById = async (req, res) => {

        try {
            console.log("controller orderID " + orderId);
            const orderId = req.params.orderId;
            let products = await getProductByOrderId(orderId);
            res.send(products);

        } catch (error) {
            console.error('there was an error:', error.message);
            res.status(500).send(error.message);
        }
    };

    add = async (req, res) => {

        try {
            let newProduct = req.body;
            let products = await addProductsInOtder(newProduct);
            res.send(products);

        } catch (error) {
            console.log('there was an error:', error.message);
            res.status(500).send(error.message);

        }
    }
}