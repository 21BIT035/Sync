use zaapko_crm;
desc tbl_order_items_dtls;
drop table tbl_order_items_dtls;

CREATE TABLE IF NOT EXISTS tbl_order_items_dtls (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  zaapko_order_id INT,
  order_item_sku VARCHAR(100),
  order_item_name VARCHAR(255),
  order_item_weight DECIMAL(10,2),
  order_item_qty INT,
  order_item_price DECIMAL(20,2),
  order_item_company VARCHAR(100),
  order_logisitcs_company VARCHAR(100),
  order_item_tax_percentage DECIMAL(20,2),
  order_item_tax_value DECIMAL(20,2),
  createdBy INT,
  updatedBy INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (zaapko_order_id, order_item_sku)
);
ALTER TABLE tbl_order_items_dtls
MODIFY createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
MODIFY modifiedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
MODIFY createdBy INT,
MODIFY modifiedBy INT;

ALTER TABLE tbl_order_items_dtls
ADD updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE tbl_order_items_dtls
DROP COLUMN createdAt,
DROP COLUMN modifiedAt,
DROP column modified_at; 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;


select * from tbl_order_items_dtls;