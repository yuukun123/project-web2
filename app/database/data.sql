USE webdata;

-- Thêm dữ liệu vào bảng category (tránh trùng lặp)
INSERT INTO category (category_name) VALUES
('Mousse'),
('Croissant'),
('Drink')
ON DUPLICATE KEY UPDATE category_name = VALUES(category_name);

-- Thêm dữ liệu vào bảng size (tránh trùng lặp)
INSERT INTO size (size_name) VALUES 
('L'), 
('10cm'),
('16cm')
ON DUPLICATE KEY UPDATE size_name = VALUES(size_name);

-- Thêm dữ liệu vào bảng product
INSERT INTO product (product_name, price, category_id, size_id, status, description, image) VALUES
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

-- Thêm dữ liệu vào bảng users
INSERT INTO users (user_name, phone, email, city, district, ward, street, password, role) VALUES
('NguyenVanA', '0901234567', 'nguyenvana@example.com', 'Ho Chi Minh', 'District 1', 'Ben Nghe', '123 Le Loi', 'hashed_password_1', 'customer'),
('TranThiB', '0912345678', 'tranthib@example.com', 'Ho Chi Minh', 'District 3', 'Vo Thi Sau', '456 Nguyen Hue', 'hashed_password_2', 'customer'),
('LeVanC', '0923456789', 'levanc@example.com', 'Ha Noi', 'Ba Dinh', 'Kim Ma', '789 Tran Hung Dao', 'hashed_password_3', 'admin')
ON DUPLICATE KEY UPDATE phone = VALUES(phone), city = VALUES(city), district = VALUES(district), ward = VALUES(ward), street = VALUES(street), password = VALUES(password);

-- Thêm dữ liệu vào bảng orders (có ngày nhận và giờ nhận)
-- Thêm dữ liệu vào bảng orders với địa chỉ giao hàng khác
-- Thêm dữ liệu vào bảng orders (có payment_method)
INSERT INTO orders (user_id, total_cost, status, notes, delivery_date, delivery_time, order_date, shipping_city, shipping_district, shipping_ward, shipping_street, payment_method) VALUES
(2, 1300000, 'Pending', 'Giao hàng sau 18h', '2025-03-21', '18:30:00', NOW(), 'Ho Chi Minh', 'District 7', 'Tan Phong', 'R4-20 Phu My Hung', 'COD'),
(3, 850000, 'Completed', 'Chỉ giao vào cuối tuần', '2025-03-22', '10:00:00', NOW(), 'Ha Noi', 'Hoan Kiem', 'Hang Bac', '35 Hang Bac', 'Momo'),
(1, 450000, 'Processing', 'Giao buổi sáng sớm', '2025-03-20', '07:30:00', NOW(), 'Ho Chi Minh', 'District 1', 'Da Kao', '10 Nguyen Binh Khiem', 'Credit Card (Visa, Master, American Express, JCB)'),
(1, 950000, 'Cancelled', 'Thanh toán online', '2025-03-25', '14:00:00', NOW(), 'Ho Chi Minh', 'Binh Thanh', 'Ward 15', '22 Dinh Bo Linh', 'VNPay');



-- Thêm dữ liệu vào bảng order_detail
-- Thêm dữ liệu vào bảng order_detail (có thêm note cho từng sản phẩm)
INSERT INTO order_detail (order_id, product_id, quantity, price, note) VALUES
(1, 7, 2, 110000, 'Không lấy sốt'),
(1, 14, 1, 55000, 'Ít đường'),
(2, 10, 1, 130000, 'Giao nóng, không bỏ tủ lạnh'),
(2, 5, 1, 540000, 'Trang trí thêm hoa quả'),
(3, 15, 2, 60000, 'Thêm đá viên'),
(3, 18, 1, 75000, 'Không dùng ống hút nhựa'),
(4, 4, 1, 530000, 'Hộp quà kèm thiệp chúc mừng'),
(4, 11, 2, 140000, 'Gói riêng từng cái croissant');


-- Thêm dữ liệu vào bảng cart (tránh lỗi trùng dữ liệu)
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 12, 1),
(2, 8, 3),
(3, 9, 2)
ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
