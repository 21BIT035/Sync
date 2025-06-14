use zaapko_prod;
drop table sales_order;
drop table sales_order_item;

describe sales_order_item;
describe sales_order;
CREATE TABLE `sales_order` (
  `entity_id` INT PRIMARY KEY,
  `status` VARCHAR(50),
  `increment_id` VARCHAR(50),
  `grand_total` DECIMAL(20, 2),
  `customer_email` VARCHAR(100),
  `customer_firstname` VARCHAR(100),
  `customer_lastname` VARCHAR(100),
   `createdBy` INT,
   `updatedBy` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
use zaapko_prod;

ALTER TABLE `sales_order`
MODIFY `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
MODIFY `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `sales_order_item`
MODIFY `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
MODIFY `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE `sales_order_item` (
  `sku` VARCHAR(100),
  `name` VARCHAR(255),
  `order_id` INT,
  `weight` DECIMAL(20, 2),
  `qty_ordered` INT,
  `price` DECIMAL(20, 2),
  `price_incl_tax` DECIMAL(20, 2),
  `base_price` DECIMAL(20, 2),
  `base_cost` DECIMAL(20, 2),
  `original_price` DECIMAL(20, 2),
  `base_original_price` DECIMAL(20, 2),
  `createdBy` INT,
   `updatedBy` INT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
   `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `sales_order_item`
  MODIFY `weight` DECIMAL(20,2),
  MODIFY `price` DECIMAL(20,2),
  MODIFY `price_incl_tax` DECIMAL(20,2),
  MODIFY `base_price` DECIMAL(20,2),
  MODIFY `base_cost` DECIMAL(20,2),
  MODIFY `original_price` DECIMAL(20,2),
  MODIFY `base_original_price` DECIMAL(20,2),
  ADD `createdBy` INT,
  ADD `updatedBy` INT;


select * from sales_order;


ALTER TABLE `sales_order`
DROP COLUMN `created_a`,
DROP COLUMN `updated_a`;
