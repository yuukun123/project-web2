-- Chèn dữ liệu vào bảng CATEGORY (tránh chèn trùng lặp)
INSERT INTO CATEGORY (category_name) VALUES
('Mousse'),
('Croissant'),
('Drink')
ON DUPLICATE KEY UPDATE category_name = VALUES(category_name);

-- Chèn dữ liệu vào bảng SIZE (tránh chèn trùng lặp)
INSERT INTO SIZE (size_name) VALUES 
('L'), 
('10cm'),
('16cm')
ON DUPLICATE KEY UPDATE size_name = VALUES(size_name);

-- Chèn dữ liệu vào bảng PRODUCT (Không cần chỉ định product_id)
INSERT INTO PRODUCT (product_name, price, category_id, size_id, status, description, image) VALUES
-- Mousse
('Avocado Mousse', 510000, 1, 3, 'Available', 'A creamy avocado mousse with a smooth texture.', './Img/Mousse/Avocado_Mousse.jpg'),
('Blueberry Mousse', 510000, 1, 3, 'Available', 'Delicious blueberry mousse with a tangy flavor.', './Img/Mousse/Blueberry_Mousse.jpg'),
('Corn Mousse', 520000, 1, 3, 'Available', 'Sweet and savory corn mousse, rich in taste.', './Img/Mousse/Corn_Mousse.jpg'),
('Longan Mousse', 530000, 1, 3, 'Available', 'Exotic longan mousse with a soft, airy texture.', './Img/Mousse/Longan_Mousse.jpg'),
('Mango Mousse', 540000, 1, 3, 'Available', 'Refreshing mango mousse with tropical sweetness.', './Img/Mousse/Mango_Mousse.jpg'),
('Melon Mousse', 550000, 1, 3, 'Available', 'Juicy melon mousse with a light, creamy finish.', './Img/Mousse/Melon_Mousse.jpg'),

-- Croissant
('Avocado Croissant', 110000, 2, 2, 'Available', 'Flaky croissant with creamy avocado filling.', './Img/Croissant/Avocado_Croissant.jpg'),
('Choco Mallow Croissant', 110000, 2, 2, 'Available', 'Chocolate croissant with marshmallow filling.', './Img/Croissant/Choco_Mallow_Croissant.png'),
('Dinosaur Almond Croissant', 120000, 2, 2, 'Available', 'Almond croissant with a crunchy texture.', './Img/Croissant/Dinosaur_Almond_Croissant.png'),
('Honey Almond Croissant', 130000, 2, 2, 'Available', 'Sweet honey croissant with almond slices.', './Img/Croissant/Honey_Almond_Croissant.png'),
('Matcha Croissant', 140000, 2, 2, 'Available', 'Flaky croissant infused with matcha flavor.', './Img/Croissant/Matcha_Croissant.jpg'),
('Plain Croissant', 150000, 2, 2, 'Available', 'Classic French croissant with a crispy texture.', './Img/Croissant/Plain_Croissant.png'),

-- Drink
('Choco Mallow', 55000, 3, 1, 'Available', 'A delicious chocolate drink with marshmallow.', './Img/Drink/Choco_Mallow.png'),
('Lemon Tea', 60000, 3, 1, 'Available', 'Refreshing lemon tea with a hint of honey.', './Img/Drink/Lemon_Tea.png'),
('Lychee Tea', 70000, 3, 1, 'Available', 'Fruity lychee tea with a floral aroma.', './Img/Drink/Lychee_Tea.png'),
('Matcha Latte', 75000, 3, 1, 'Available', 'Smooth latte with rich matcha flavor.', './Img/Drink/Matcha_Latte.png'),
('Matcha Mallow', 80000, 3, 1, 'Available', 'Matcha drink topped with fluffy marshmallow.', './Img/Drink/Matcha_Mallow.png'),
('Matcha Misu', 85000, 3, 1, 'Available', 'Matcha tiramisu-inspired drink.', './Img/Drink/Matcha_Misu.png');


-- Chèn dữ liệu vào bảng USERS (tránh lỗi trùng email)
INSERT INTO USERS (user_name, phone, email, address, password, role) VALUES
('NguyenVanA', '0901234567', 'nguyenvana@example.com', '123 Le Loi, HCM', 'hashed_password_1', 'customer'),
('TranThiB', '0912345678', 'tranthib@example.com', '456 Nguyen Hue, HCM', 'hashed_password_2', 'customer'),
('LeVanC', '0923456789', 'levanc@example.com', '789 Tran Hung Dao, HCM', 'hashed_password_3', 'admin')
ON DUPLICATE KEY UPDATE phone = VALUES(phone), address = VALUES(address), password = VALUES(password);

-- Chèn dữ liệu vào bảng ORDERS (Tự động sinh order_id)
INSERT INTO ORDERS (user_id, total_cost, status, notes) VALUES
(1, 1050000, 'Pending', 'Giao hàng giờ hành chính'),
(2, 520000, 'Completed', 'Giao gấp trong ngày'),
(1, 750000, 'Processing', 'Giao vào buổi chiều');

-- Chèn dữ liệu vào bảng ORDER_DETAIL (Dựa theo ORDER_ID đã có)
INSERT INTO ORDER_DETAIL (order_id, product_id, quantity, price) VALUES
(1, 3, 2, 520000),
(1, 5, 1, 540000),
(2, 2, 1, 520000),
(3, 6, 1, 750000);

-- Chèn dữ liệu vào bảng CART (tránh lỗi trùng dữ liệu)
INSERT INTO CART (user_id, product_id, quantity) VALUES
(1, 4, 1),
(2, 1, 2),
(3, 5, 1)
ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
