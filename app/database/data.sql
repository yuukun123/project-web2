
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

-- Insert data into product table
INSERT INTO product (product_name, price, category_id, size_id, status, ingredients, expiration_date, storage_instructions, image) VALUES
-- Mousse
('Avocado Mousse', 510000, 1, 3, 'Available', 'Fresh avocado, heavy cream, condensed milk, gelatin, vanilla extract, and a touch of lemon juice for enhanced flavor.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Avocado_Mousse.jpg'),
('Blueberry Mousse', 510000, 1, 3, 'Available', 'Fresh blueberries, heavy cream, cream cheese, sugar, gelatin, and lemon zest for a refreshing taste.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Blueberry_Mousse.jpg'),
('Corn Mousse', 520000, 1, 3, 'Available', 'Sweet corn puree, heavy cream, condensed milk, vanilla essence, gelatin, and a pinch of sea salt.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Corn_Mousse.jpg'),
('Longan Mousse', 530000, 1, 3, 'Available', 'Fresh longan pulp, coconut milk, heavy cream, gelatin, sugar, and pandan extract for a tropical twist.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Longan_Mousse.jpg'),
('Mango Mousse', 540000, 1, 3, 'Available', 'Ripe mango puree, heavy cream, condensed milk, gelatin, and lime zest to enhance the natural sweetness.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Mango_Mousse.jpg'),
('Melon Mousse', 550000, 1, 3, 'Available', 'Fresh melon puree, heavy cream, yogurt, sugar, gelatin, and honey for a light, creamy texture.', 'Best before 31-12-2025', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Melon_Mousse.jpg'),

-- Croissant
('Avocado Croissant', 110000, 2, 2, 'Available', 'Flaky butter croissant filled with fresh avocado slices, cream cheese, and a hint of honey.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Avocado_Croissant.jpg'),
('Choco Mallow Croissant', 110000, 2, 2, 'Available', 'Crispy croissant stuffed with melted dark chocolate and fluffy marshmallows, sprinkled with cocoa powder.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Choco_Mallow_Croissant.png'),
('Dinosaur Almond Croissant', 120000, 2, 2, 'Available', 'Butter croissant coated with almond cream, sliced almonds, and powdered sugar, giving it a crunchy bite.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Dinosaur_Almond_Croissant.png'),
('Honey Almond Croissant', 130000, 2, 2, 'Available', 'Golden-brown croissant glazed with organic honey and topped with roasted almond flakes.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Honey_Almond_Croissant.png'),
('Matcha Croissant', 140000, 2, 2, 'Available', 'Classic croissant infused with premium matcha powder, filled with matcha cream, and lightly dusted with icing sugar.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Matcha_Croissant.jpg'),
('Plain Croissant', 150000, 2, 2, 'Available', 'Traditional French-style croissant with a crispy exterior and soft, buttery layers inside.', 'Best before 30-06-2025', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Plain_Croissant.png'),

-- Drink
('Choco Mallow', 55000, 3, 1, 'Available', 'Rich hot chocolate made with Belgian cocoa, fresh milk, and topped with soft marshmallows.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Choco_Mallow.png'),
('Lemon Tea', 60000, 3, 1, 'Available', 'Refreshing black tea brewed with fresh lemon slices, organic honey, and a hint of mint.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Lemon_Tea.png'),
('Lychee Tea', 70000, 3, 1, 'Available', 'Fragrant lychee-infused green tea with floral undertones, served with lychee pulp.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Lychee_Tea.png'),
('Matcha Latte', 75000, 3, 1, 'Available', 'Creamy matcha latte made with high-grade Japanese matcha, steamed milk, and light vanilla syrup.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Latte.png'),
('Matcha Mallow', 80000, 3, 1, 'Available', 'Rich matcha drink blended with oat milk, topped with whipped cream and toasted marshmallows.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Mallow.png'),
('Matcha Misu', 85000, 3, 1, 'Available', 'Tiramisu-inspired matcha drink layered with mascarpone cream and cocoa dust.', 'Best before 30-09-2025', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Misu.png');


-- Thêm dữ liệu vào bảng users
INSERT INTO users (user_name, first_name, last_name, phone, email, city, district, ward, street, password, role, status) VALUES
('NguyenVanA', 'Nguyen', 'Van A', '0901234567', 'nguyenvana@example.com', 'Hồ Chí Minh', 'Quận 1', 'Bến Nghé', '123 Lê Lợi', 'hashed_password_1', 'customer', 'active'),
('TranThiB', 'Tran', 'Thi B', '0912345678', 'tranthib@example.com', 'Hồ Chí Minh', 'Quận 3', 'Võ Thị Sáu', '456 Nguyễn Huệ', 'hashed_password_2', 'customer', 'locked'),
('admin', 'Le', 'Van C', '0923456789', 'levanc@example.com', 'Hà Nội', 'Ba Đình', 'Kim Mã', '789 Trần Hưng Đạo', '123', 'admin', 'active')
ON DUPLICATE KEY UPDATE phone = VALUES(phone), city = VALUES(city), district = VALUES(district), ward = VALUES(ward), street = VALUES(street), password = VALUES(password), status = VALUES(status);


-- Thêm dữ liệu vào bảng orders (có ngày nhận và giờ nhận)
-- Thêm dữ liệu vào bảng orders với địa chỉ giao hàng khác
-- Thêm dữ liệu vào bảng orders (có payment_method)
-- Thêm dữ liệu vào bảng orders
INSERT INTO orders (user_name, recipient_name, recipient_phone, total_cost, status, notes, delivery_date, delivery_time, order_date, shipping_city, shipping_district, shipping_ward, shipping_street, payment_method) VALUES
('NguyenVanA', 'Nguyen Van A', '0901234567', 1300000, 'Pending', 'Giao hàng sau 18h', '2025-03-21', '18:30:00', NOW(), 'Hồ Chí Minh', 'Quận 7', 'Tân Phong', 'R4-20 Phú Mỹ Hưng', 'COD'),
('TranThiB', 'Tran Thi B', '0912345678', 450000, 'Processing', 'Giao buổi sáng sớm', '2025-03-20', '07:30:00', NOW(), 'Hồ Chí Minh', 'Quận 1', 'Đa Kao', '10 Nguyễn Bình Khiêm', 'MOMO'),
('NguyenVanA', 'Nguyen Van A', '0901234567', 950000, 'Cancelled', 'Thanh toán online', '2025-03-25', '14:00:00', NOW(), 'Hồ Chí Minh', 'Bình Thạnh', 'Phường 15', '22 Đinh Bộ Lĩnh', 'VNPay');


-- Thêm dữ liệu vào bảng order_detail
INSERT INTO order_detail (order_id, product_id, quantity, price, note) VALUES
(1, 1, 2, 110000, 'Không lấy sốt'),
(1, 3, 1, 55000, 'Ít đường'),
(2, 2, 1, 130000, 'Giao nóng, không bỏ tủ lạnh'),
(2, 4, 1, 540000, 'Trang trí thêm hoa quả'),
(3, 1, 1, 530000, 'Hộp quà kèm thiệp chúc mừng'),
(3, 5, 2, 140000, 'Gói riêng từng cái croissant');

-- Thêm dữ liệu vào bảng cart (tránh lỗi trùng dữ liệu)
INSERT INTO cart (user_name, product_id, quantity) VALUES
('NguyenVanA', 5, 1),
('TranThiB', 3, 3)
ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);

