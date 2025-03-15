use webdata;

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
('Avocado Mousse', 510000, 1, 3, 'Available', 'A creamy avocado mousse with a smooth texture.', 'public/assets/Img/Mousse/Avocado_Mousse.jpg'),
('Blueberry Mousse', 510000, 1, 3, 'Available', 'Delicious blueberry mousse with a tangy flavor.', 'public/assets/Img/Mousse/Blueberry_Mousse.jpg'),
('Corn Mousse', 520000, 1, 3, 'Available', 'Sweet and savory corn mousse, rich in taste.', 'public/assets/Img/Mousse/Corn_Mousse.jpg'),
('Longan Mousse', 530000, 1, 3, 'Available', 'Exotic longan mousse with a soft, airy texture.', 'public/assets/Img/Mousse/Longan_Mousse.jpg'),
('Mango Mousse', 540000, 1, 3, 'Available', 'Refreshing mango mousse with tropical sweetness.', 'public/assets/Img/Mousse/Mango_Mousse.jpg'),
('Melon Mousse', 550000, 1, 3, 'Available', 'Juicy melon mousse with a light, creamy finish.', 'public/assets/Img/Mousse/Melon_Mousse.jpg'),

-- Croissant
('Avocado Croissant', 110000, 2, 2, 'Available', 'Flaky croissant with creamy avocado filling.', 'public/assets/Img/Croissant/Avocado_Croissant.jpg'),
('Choco Mallow Croissant', 110000, 2, 2, 'Available', 'Chocolate croissant with marshmallow filling.', 'public/assets/Img/Croissant/Choco_Mallow_Croissant.png'),
('Dinosaur Almond Croissant', 120000, 2, 2, 'Available', 'Almond croissant with a crunchy texture.', 'public/assets/Img/Croissant/Dinosaur_Almond_Croissant.png'),
('Honey Almond Croissant', 130000, 2, 2, 'Available', 'Sweet honey croissant with almond slices.', 'public/assets/Img/Croissant/Honey_Almond_Croissant.png'),
('Matcha Croissant', 140000, 2, 2, 'Available', 'Flaky croissant infused with matcha flavor.', 'public/assets/Img/Croissant/Matcha_Croissant.jpg'),
('Plain Croissant', 150000, 2, 2, 'Available', 'Classic French croissant with a crispy texture.', 'public/assets/Img/Croissant/Plain_Croissant.png'),

-- Drink
('Choco Mallow', 55000, 3, 1, 'Available', 'A delicious chocolate drink with marshmallow.', 'public/assets/Img/Drink/Choco_Mallow.png'),
('Lemon Tea', 60000, 3, 1, 'Available', 'Refreshing lemon tea with a hint of honey.', 'public/assets/Img/Drink/Lemon_Tea.png'),
('Lychee Tea', 70000, 3, 1, 'Available', 'Fruity lychee tea with a floral aroma.', 'public/assets/Img/Drink/Lychee_Tea.png'),
('Matcha Latte', 75000, 3, 1, 'Available', 'Smooth latte with rich matcha flavor.', 'public/assets/Img/Drink/Matcha_Latte.png'),
('Matcha Mallow', 80000, 3, 1, 'Available', 'Matcha drink topped with fluffy marshmallow.', 'public/assets/Img/Drink/Matcha_Mallow.png'),
('Matcha Misu', 85000, 3, 1, 'Available', 'Matcha tiramisu-inspired drink.', 'public/assets/Img/Drink/Matcha_Misu.png');


-- Chèn dữ liệu vào bảng USERS (tránh lỗi trùng email)
INSERT INTO USERS (user_name, phone, email, city, district, ward, street, password, role) VALUES
('NguyenVanA', '0901234567', 'nguyenvana@example.com', 'Ho Chi Minh', 'District 1', 'Ben Nghe', '123 Le Loi', 'hashed_password_1', 'customer'),
('TranThiB', '0912345678', 'tranthib@example.com', 'Ho Chi Minh', 'District 3', 'Vo Thi Sau', '456 Nguyen Hue', 'hashed_password_2', 'customer'),
('LeVanC', '0923456789', 'levanc@example.com', 'Ha Noi', 'Ba Dinh', 'Kim Ma', '789 Tran Hung Dao', 'hashed_password_3', 'admin')
ON DUPLICATE KEY UPDATE phone = VALUES(phone), city = VALUES(city), district = VALUES(district), ward = VALUES(ward), street = VALUES(street), password = VALUES(password);

-- Chèn thêm dữ liệu vào bảng ORDERS
INSERT INTO ORDERS (user_id, total_cost, status, notes) VALUES
(2, 1300000, 'Pending', 'Giao hàng sau 18h'),
(3, 850000, 'Completed', 'Chỉ giao vào cuối tuần'),
(1, 450000, 'Processing', 'Giao buổi sáng sớm');

-- Chèn thêm dữ liệu vào bảng ORDER_DETAIL
INSERT INTO ORDER_DETAIL (order_id, product_id, quantity, price) VALUES
(1, 7, 2, 110000),
(2, 10, 1, 130000),
(3, 15, 2, 60000);

-- Chèn thêm dữ liệu vào bảng CART (tránh lỗi trùng dữ liệu)
INSERT INTO CART (user_id, product_id, quantity) VALUES
(1, 12, 1),
(2, 8, 3),
(3, 9, 2)
ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);

