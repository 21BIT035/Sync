USE zaapko_crm;
desc tbl_order_main;
drop table tbl_order_main;
CREATE TABLE IF NOT EXISTS tbl_order_main (
  crm_entity_id INT AUTO_INCREMENT PRIMARY KEY,
  zapko_entity_id INT UNIQUE,
  order_status VARCHAR(50),
  zaapko_order_id VARCHAR(100),
  order_grand_total DECIMAL(20,2),
  order_customer_email VARCHAR(255),
  order_customer_firstname VARCHAR(100),
  order_customer_lastname VARCHAR(100),
  is_po_created BOOLEAN DEFAULT FALSE,
  is_invoice_generated BOOLEAN DEFAULT FALSE,
  createdBy INT,
  updatedBy INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE tbl_order_main
ADD created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE tbl_order_main
MODIFY createdBy INT,
MODIFY modifiedBy INT;

describe tbl_order_main;

ALTER TABLE tbl_order_main
DROP COLUMN createdAt,
DROP COLUMN modifiedAt;  

SELECT * from tbl_order_main;