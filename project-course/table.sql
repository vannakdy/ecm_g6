
-- create payment_mehtod
CREATE TABLE `payement_methode` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `code` varchar(120) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
);

INSERT INTO `payement_methode` (`id`, `name`, `code`, `image`, `is_active`) VALUES
(1, 'Cash On Delivery', 'cod', NULL, 1),
(2, 'ABA Bank', 'aba', NULL, 1),
(3, 'ACLEDA Bank', 'ac', NULL, 1),
(4, 'Wing', 'wing', NULL, 1),
(5, 'Chip Mong', 'chm', NULL, 1),
(6, 'True Money ', 'trm', NULL, 1),
(7, 'True Maney', 'tm', 'image-1699780413152-236089979', 1);

-- create order_status
CREATE TABLE `order_status` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `message` text NOT NULL,
  `sort_order` int(11) DEFAULT 0
)
INSERT INTO `order_status` (`id`, `name`, `message`, `sort_order`) VALUES
(1, 'Pending', ' Your order has been placed successfully!.', 1),
(2, 'Packed', 'Your order has been packed.', 2),
(3, 'Shipped', 'Your order has been shipped!', 3),
(4, 'Delivered', 'Your order is complete.', 4),
(5, 'Canceled', 'order has been canceled.', 5),
(6, 'Store pick up', 'Your order is ready for store pickup!', 6),
(7, 'Phone denied', 'Denied Phone denied.', 7),
(8, 'Cancel', 'Your  has been Canceled.', 8);

CREATE TABLE `province` (
  `province_id` int(11)  PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `description` text NOT NULL,
  `date_modified` datetime NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
);

INSERT INTO `province` (`province_id`, `name`, `description`, `date_modified`, `date_added`) VALUES
(1, 'Phnom Penh', 'Delivery in Phnom Penh', '2019-11-05 14:44:42', '2019-08-03 03:00:22'),
(2, 'Oddar Meancheay (Kerry)', 'Oddar Meancheay', '2019-11-07 14:09:32', '2019-10-24 10:11:46'),
(3, 'Oddar Meancheay (Other )', 'Oddar Meancheay', '2019-11-07 14:09:16', '2019-10-24 10:20:02'),
(4, 'Battambang', 'Battambang', '0000-00-00 00:00:00', '2019-11-07 07:05:05'),
(5, 'Kampong Cham', 'Kampong Cham', '0000-00-00 00:00:00', '2019-11-07 07:05:22'),
(6, 'Kampong Chhnang', 'Kampong Chhnang', '0000-00-00 00:00:00', '2019-11-07 07:05:38'),
(7, 'Kampong Som', 'Kampong Som', '0000-00-00 00:00:00', '2019-11-07 07:05:54'),
(8, 'Kampong Speu', 'Kampong Speu', '0000-00-00 00:00:00', '2019-11-07 07:06:07'),
(9, 'Kampong Thom', 'Kampong Thom', '0000-00-00 00:00:00', '2019-11-07 07:06:19'),
(10, 'Kampot', 'Kampot', '0000-00-00 00:00:00', '2019-11-07 07:06:31'),
(11, 'Kandal', 'Kandal', '0000-00-00 00:00:00', '2019-11-07 07:06:44'),
(12, 'Kaoh Kong', 'Kaoh Kong', '0000-00-00 00:00:00', '2019-11-07 07:06:58'),
(13, 'Keb', 'Keb', '0000-00-00 00:00:00', '2019-11-07 07:07:10'),
(14, 'Kratie', 'Kratie', '0000-00-00 00:00:00', '2019-11-07 07:07:21'),
(15, 'Mondul Kiri', 'Mondul Kiri', '0000-00-00 00:00:00', '2019-11-07 07:07:33'),
(16, 'Pailin', 'Pailin', '0000-00-00 00:00:00', '2019-11-07 07:09:47'),
(17, 'Preah Seihanu', 'Preah Seihanu (Kompong Som or Sihanoukville)', '0000-00-00 00:00:00', '2019-11-07 07:10:22'),
(18, 'Preah Vihear', 'Preah Vihear', '0000-00-00 00:00:00', '2019-11-07 07:10:36'),
(19, 'Prey Veng', 'Prey Veng', '0000-00-00 00:00:00', '2019-11-07 07:10:54'),
(20, 'Pursat', 'Pursat', '0000-00-00 00:00:00', '2019-11-07 07:11:11'),
(21, 'Ratanak Kiri', 'Ratanak Kiri', '0000-00-00 00:00:00', '2019-11-07 07:11:27'),
(22, 'Siemreap', 'Siemreap', '0000-00-00 00:00:00', '2019-11-07 07:11:40'),
(23, 'Stung Treng', 'Stung Treng', '0000-00-00 00:00:00', '2019-11-07 07:11:53'),
(24, 'Svay Rieng', 'Svay Rieng', '0000-00-00 00:00:00', '2019-11-07 07:12:08'),
(25, 'Takeo', 'Takeo', '0000-00-00 00:00:00', '2019-11-07 07:12:25'),
(26, 'Banteay Meanchey', 'Banteay Meanchey', '0000-00-00 00:00:00', '2019-11-07 07:12:34');


-- product 
CREATE TABLE `product` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT, -- PK
  `category_id` int(11) NOT NULL, -- FK(category)
  `name` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(6,2) DEFAULT 0,
  `quantity` int(6) DEFAULT 0,
  `image` varchar(120) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);

-- add FK  category_id in table product
ALTER TABLE product ADD  FOREIGN KEY (category_id) 
REFERENCES category (Id)

CREATE TABLE `product_image` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT, -- PK
  `product_id` int(11) NOT NULL, -- FK= product(di)
  `image` varchar(120) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);

-- Add FK in table product_image
ALTER TABLE product_image ADD FOREIGN KEY (product_id)
REFERENCES product (id);


CREATE TABLE `customer` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `gender` tinyint(1) DEFAULT 1,
  `email` varchar(120),
  `tel` varchar(18) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);


CREATE TABLE `customer_address` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, -- FK customer(id)
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `tel` varchar(18) NOT NULL,
  `address` text NOT NULL,
  `is_default` tinyint(1) DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);
-- Add FK customer_id in table customer_address
ALTER TABLE customer_address ADD FOREIGN KEY (customer_id)
REFERENCES customer (id);

CREATE TABLE `cart` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, -- FK customer(id)
  `product_id` int(11) NOT NULL, -- FK product(id)
  `quantity` int(11) DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);

-- Add FK customer_id in table customer_address
ALTER TABLE cart ADD FOREIGN KEY (customer_id)
REFERENCES customer (id);

ALTER TABLE cart ADD FOREIGN KEY (product_id)
REFERENCES product (id);

CREATE TABLE `wishlish` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);
-- add FK
ALTER TABLE wishlish ADD FOREIGN KEY (customer_id)
REFERENCES customer (id);

ALTER TABLE wishlish ADD FOREIGN KEY (product_id)
REFERENCES product (id);



CREATE TABLE `order` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL, -- OPTION (FK can null)
  `user_id` int(11) NOT NULL, -- FK
  `order_status_id` int(11) NOT NULL, -- FK
  `payment_method_id` int(11) NOT NULL, -- FK
  `total` decimal(6,2) DEFAULT 0,
  `note` text DEFAULT NULL,
  `is_paid` tinyint(1) DEFAULT 0,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
);
-- add fk
ALTER TABLE `order` ADD FOREIGN KEY (customer_id)
REFERENCES customer (id);

ALTER TABLE `order` ADD FOREIGN KEY (user_id)
REFERENCES employee (Id);

ALTER TABLE `order` ADD FOREIGN KEY (order_status_id)
REFERENCES order_status (id);

ALTER TABLE `order` ADD FOREIGN KEY (payment_method_id)
REFERENCES payement_methode (id);


CREATE TABLE `order_details` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,-- FK order(id)
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 0,
  `price` decimal(6,2) DEFAULT 0,
  `discount` decimal(6,2) DEFAULT 0,
  `discount_price` decimal(6,2) DEFAULT 0,
  `total` decimal(6,2) DEFAULT 0
);