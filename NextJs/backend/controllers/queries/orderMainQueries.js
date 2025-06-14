const Model = require('../../models/zappko_crm/index');
const tbl_order_main = Model.tbl_order_main

const statusMap = {
  pending: 0,
  processing: 1,
  complete: 2,
  canceled: 3,
  holded: 4,
  closed: 5,
};

module.exports = class OrderMainQueries{
    constructor(body) {
        this.body=body;
    }   
async get(){
    const whereClause = {}
    if(this.body.fromDate){
        whereClause.created_at=this.body.fromDate
    }
    return tbl_order_main.findAll({where:whereClause});
}
async create(){
    const order=this.body;
     const statusInt = statusMap[order.status?.toLowerCase()] ?? 0;
        return tbl_order_main.create({
          zaapko_order_id: order.zaapko_order_id,
          zapko_entity_id: order.zapko_entity_id,
          order_status: statusInt,
          order_grand_total: order.order_grand_total,
          vat_amount:11,
          order_customer_email: order.order_customer_email,
          order_customer_firstname: order.order_customer_firstname,
          order_customer_lastname: order.order_customer_lastname,
          is_po_created:1,
          is_invoice_generated:1,
          created_by: order.created_by || 1,
          modified_by: order.modified_by || 1,
          createdAt: order.created_at,
          modifiedAt: order.modified_at
    })
}
async update(){
    const order=this.body;
    return tbl_order_main.update(
        
        {
        zaapko_order_id: order.increment_id,
          zapko_entity_id: order.entity_id,
          order_status: order.status,
          order_grand_total: order.grand_total,
          order_customer_email: order.customer_email,
          order_customer_firstname: order.customer_firstname,
          order_customer_lastname: order.customer_lastname,
          is_po_created: false,
          is_invoice_generated: false,
          createdBy: order.createdBy || 1,
          updatedBy: order.updatedBy || 1,
          created_at: order.created_at,
          updated_at: order.updated_at
    },{where:{crm_entity_id:order.crm_entity_id}})
}
async delete(){
    return tbl_order_main.destroy({where:{crm_entity_id:this.body.crm_entity_id}})
}
}