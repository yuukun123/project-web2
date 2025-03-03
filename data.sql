use webdata;

-- Chèn dữ liệu vào bảng CATEGORY
INSERT INTO CATEGORY (category_name) VALUES
('Mousse'),
('Croissant'),
('Drink');

-- Chèn dữ liệu vào bảng SIZE
INSERT INTO SIZE (size_name) VALUES 
('M'), 
('L'), 
('16cm');

-- Chèn dữ liệu vào bảng PRODUCT
INSERT INTO PRODUCT (product_id, product_name, price, category_id, size_id, status, description, image) VALUES
-- 🍰 Mousse (Size: 16cm)
(1, 'Avocado Mousse', 510000, 1, 3, 'Available', 'A creamy avocado mousse with a smooth texture.', './Img/Mousse/Avocado_Mousse.jpg'),
(2, 'Blueberry Mousse', 510000, 1, 3, 'Available', 'Delicious blueberry mousse with a tangy flavor.', './Img/Mousse/Blueberry_Mousse.jpg'),
(3, 'Corn Mousse', 520000, 1, 3, 'Available', 'Sweet and savory corn mousse, rich in taste.', './Img/Mousse/Corn_Mousse.jpg'),
(4, 'Longan Mousse', 530000, 1, 3, 'Available', 'Exotic longan mousse with a soft, airy texture.', './Img/Mousse/Longan_Mousse.jpg'),
(5, 'Mango Mousse', 540000, 1, 3, 'Available', 'Refreshing mango mousse with tropical sweetness.', './Img/Mousse/Mango_Mousse.jpg'),
(6, 'Melon Mousse', 550000, 1, 3, 'Available', 'Juicy melon mousse with a light, creamy finish.', './Img/Mousse/Melon_Mousse.jpg'),

-- 🥐 Croissant (Size: M)
(7, 'Avocado Croissant', 110000, 2, 1, 'Available', 'Flaky croissant with creamy avocado filling.', './Img/Croissant/Avocado_Croissant.jpg'),
(8, 'Choco Mallow Croissant', 110000, 2, 1, 'Available', 'Chocolate croissant filled with marshmallow.', './Img/Croissant/Choco_Mallow_Croissant.png'),
(9, 'Dinosaur Almond Croissant', 120000, 2, 1, 'Available', 'Crunchy almond croissant shaped like a dinosaur.', './Img/Croissant/Dinosaur_Almond_Croissant.png'),
(10, 'Honey Almond Croissant', 130000, 2, 1, 'Available', 'Sweet honey-glazed croissant with almond slices.', './Img/Croissant/Honey_Almond_Croissant.png'),
(11, 'Matcha Croissant', 140000, 2, 1, 'Available', 'Buttery croissant infused with premium matcha.', './Img/Croissant/Matcha_Croissant.jpg'),
(12, 'Plain Croissant', 150000, 2, 1, 'Available', 'Classic French croissant with a crispy texture.', './Img/Croissant/Plain_Croissant.png'),

-- 🥤 Drink (Size: L)
(13, 'Choco Mallow', 55000, 3, 2, 'Available', 'Chocolate drink topped with marshmallow.', './Img/Drink/Choco_Mallow.png'),
(14, 'Lemon Tea', 60000, 3, 2, 'Available', 'Refreshing lemon tea with a hint of honey.', './Img/Drink/Lemon_Tea.png'),
(15, 'Lychee Tea', 70000, 3, 2, 'Available', 'Sweet lychee-flavored iced tea.', './Img/Drink/Lychee_Tea.png'),
(16, 'Matcha Latte', 75000, 3, 2, 'Available', 'Smooth latte with rich matcha flavor.', './Img/Drink/Matcha_Latte.png'),
(17, 'Matcha Mallow', 80000, 3, 2, 'Available', 'Matcha drink topped with soft marshmallow.', './Img/Drink/Matcha_Mallow.png'),
(18, 'Matcha Misu', 85000, 3, 2, 'Available', 'A twist on tiramisu with matcha infusion.', './Img/Drink/Matcha_Misu.png');



-- Chèn dữ liệu vào bảng USER
INSERT INTO USER (user_name, phone, email, address, password, role) VALUES
('Nguyen Van A', '0901234567', 'nguyenvana@example.com', '123 Le Loi, HCM', 'hashed_password_1', 'customer'),
('Tran Thi B', '0912345678', 'tranthib@example.com', '456 Nguyen Hue, HCM', 'hashed_password_2', 'customer'),
('Le Van C', '0923456789', 'levanc@example.com', '789 Tran Hung Dao, HCM', 'hashed_password_3', 'admin');

-- Chèn dữ liệu vào bảng ORDERS
INSERT INTO ORDERS (user_id, total_cost, status, notes) VALUES
(1, 1050000, 'Pending', 'Giao hàng giờ hành chính'),
(2, 520000, 'Completed', 'Giao gấp trong ngày'),
(1, 750000, 'Processing', 'Giao vào buổi chiều');

-- Chèn dữ liệu vào bảng ORDER_DETAIL
INSERT INTO ORDER_DETAIL (order_id, product_id, quantity, price) VALUES
(1, 3, 2, 520000),  -- User 1 đặt 2 sản phẩm có ID 3, giá 520,000
(1, 5, 1, 540000),  -- User 1 đặt 1 sản phẩm có ID 5, giá 540,000
(2, 2, 1, 520000),  -- User 2 đặt 1 sản phẩm có ID 2, giá 520,000
(3, 6, 1, 750000);  -- User 1 đặt 1 sản phẩm có ID 6, giá 750,000

-- Chèn dữ liệu vào bảng CART
INSERT INTO CART (user_id, product_id, quantity) VALUES
(1, 4, 1),  -- User 1 có sản phẩm ID 4 trong giỏ
(2, 1, 2),  -- User 2 có 2 sản phẩm ID 1 trong giỏ
(3, 5, 1);  -- User 3 có sản phẩm ID 5 trong giỏ