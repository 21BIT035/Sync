const Model = require('../../models/zappko_crm/index');
const tbl_order_items_dtls = Model.tbl_order_items_dtls

module.exports = class ItemMainQueries{
    constructor(body) {
        this.body=body;
    }
async get(){
    const whereClause = {}
    if(this.body.fromDate){
        whereClause.created_at=this.body.fromDate
    }
    return tbl_order_items_dtls.findAll({where:whereClause});
}
async create(){
    const item=this.body;

    return tbl_order_items_dtls.create({
          zaapko_order_id: item.zaapko_order_id,
          order_item_sku: item.order_item_sku,
          order_id: item.order_id,
          order_item_name: item.order_item_name,
          order_item_weight: item.order_item_weight,
          order_item_qty: item.order_item_qty,
          order_item_price: item.order_item_price,
          order_item_company: 11,
          order_logisitcs_company: 11,
          order_item_tax_percentage: 11,
          order_item_tax_value: 11,
          created_by: item.created_by || 1,
          modified_by: item.modified_by || 1,
          createdAt: item.createdAt,
          modifiedAt: item.modifiedAt
      });
}
async update(){
    const item=this.body;
    return tbl_order_items_dtls.update(
        
        {
          zaapko_order_id: item.order_id,
          order_item_sku: item.sku,
          order_id: item.order_id,
          order_item_name: item.name,
          order_item_weight: item.weight,
          order_item_qty: item.qty_ordered,
          order_item_price: item.price,
          order_item_company: null,
          order_logisitcs_company: null,
          order_item_tax_percentage: 0,
          order_item_tax_value: 0,
          createdBy: item.createdBy || 1,
          updatedBy: item.updatedBy || 1,
          created_at: item.created_at,
          updated_at: item.updated_at
    },{where:{zaapko_order_id:item.zaapko_order_id}})
}
async delete(){
    return tbl_order_items_dtls.destroy({where:{zaapko_order_id:this.body.zaapko_order_id}})
}
}