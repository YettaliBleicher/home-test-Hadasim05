import {getOrdersBySupplier, updateOrder, getOrdersByStatusId, addOrder} from '../service/order.js'

export class Order {
getBySupplierId = async (req, res) => {

    try {
        console.log("controller");
        const supplierId = req.params.supplierId;
        console.log(supplierId);
        let orders = await getOrdersBySupplier(supplierId);
        console.log("after service")
        res.send(orders);

    } catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);
    }
};

getByStatusId = async (req, res) => {

    try {
        console.log("controller");
        const statusId = req.params.statusId;
        console.log(statusId);
        let orders = await getOrdersByStatusId(statusId);
        console.log("after service")
        res.send(orders);

    } catch (error) {
        console.error('there was an error:', error.message);
        res.status(500).send(error.message);
    }
};

add = async (req, res) => {

    try {
        let newOrder = req.body;
        let orders = await addOrder(newOrder);
        res.send(orders);

    } catch (error) {
        console.log('there was an error:', error.message);
        res.status(500).send(error.message);

    }
}

update = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const statusId = req.params.statusId;
        let updatedOrder = await updateOrder(orderId, statusId);
        console.log(updatedOrder)
        res.send(updatedOrder);
    } catch (error) {
        console.log('There was an error:', error.message);
        res.status(500).send(error.message);
    }
}

}