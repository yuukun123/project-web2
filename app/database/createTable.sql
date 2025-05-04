-- Bảng users (Cập nhật)
CREATE TABLE users (
    user_name VARCHAR(255) PRIMARY KEY,
    first_name NVARCHAR(100) NOT NULL,
    last_name NVARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    ward VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    status ENUM('active', 'locked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng category (Cập nhật)
CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT NULL  -- Tạm thời để trống
);

-- Bảng size
CREATE TABLE size (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    size_name VARCHAR(50) UNIQUE NOT NULL
);

-- Bảng product (Cập nhật)
CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL CHECK (price > 0),
    category_id INT,
    size_id INT,
    status ENUM('Available', 'Out of Stock', 'Discontinued', 'Hidden') DEFAULT 'Available',
    ingredients TEXT,  -- Thành phần bánh
    expiration_date TEXT,  -- Hạn sử dụng
    storage_instructions TEXT,  -- Cách bảo quản
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL,
    FOREIGN KEY (size_id) REFERENCES size(size_id) ON DELETE SET NULL
);


-- Bảng orders (Cập nhật)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    delivery_time TIME,
    total_cost DECIMAL(20,2) NOT NULL CHECK (total_cost >= 0),
    status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
    payment_method ENUM('COD', 'Momo', 'Credit Card', 'VNPay') DEFAULT 'COD',
    user_name VARCHAR(255) NOT NULL,  -- Khóa ngoại thay vì user_id
    recipient_name VARCHAR(255) NOT NULL,  -- Tên người nhận
    recipient_phone VARCHAR(20) NOT NULL,  -- Số điện thoại người nhận
    notes TEXT,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_district VARCHAR(100) NOT NULL,
    shipping_ward VARCHAR(100) NOT NULL,
    shipping_street VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
);

-- Bảng order_detail (đã thêm cột note)
CREATE TABLE order_detail (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(15,2) NOT NULL CHECK (price > 0),
    note TEXT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);

-- Bảng cart
CREATE TABLE cart (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);
