const { dbA, dbB} =require('../config/db.js')

const getOrders =async()=>{
        const [rows]= await dbA.query(
        `select entity_id  ,status, increment_id, grand_total, customer_email, customer_firstname, customer_lastname, created_at, updated_at 
FROM sales_order AS sales_order`
            );
            return rows;
    };

const getOrderItems =async()=>{
        const [rows]= await dbA.query(
        `select soi.sku,soi.name,soi.order_id, soi.weight  ,soi.qty_ordered, soi.price ,soi.price_incl_tax ,
soi.base_price ,soi.base_cost,soi.original_price ,soi.base_original_price,created_at, updated_at   
from sales_order_item soi`
            );
            return rows;
    };


module.exports ={
    getOrders,
    getOrderItems
};

