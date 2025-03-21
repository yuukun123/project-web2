-- Bảng users
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,      -- Thành phố / Tỉnh
    district VARCHAR(100) NOT NULL,  -- Quận / Huyện
    ward VARCHAR(100) NOT NULL,      -- Phường / Xã
    street VARCHAR(255) NOT NULL,    -- Địa chỉ chi tiết (Số nhà, tên đường)
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    status ENUM('active', 'locked') DEFAULT 'active',  -- Thêm cột trạng thái
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng category
CREATE TABLE category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Bảng size
CREATE TABLE size (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    size_name VARCHAR(50) UNIQUE NOT NULL
);

-- Bảng product
CREATE TABLE product (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL CHECK (price > 0),
    category_id INT,
    size_id INT,
    status ENUM('Available', 'Out of Stock', 'Discontinued') DEFAULT 'Available',
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL,
    FOREIGN KEY (size_id) REFERENCES size(size_id) ON DELETE SET NULL
);

-- Bảng orders (có thêm payment_method và thông tin địa chỉ giao hàng)
CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    delivery_time TIME,
    total_cost DECIMAL(10,2) NOT NULL CHECK (total_cost >= 0),
    status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
    payment_method ENUM('COD', 'Momo', 'Credit Card', 'VNPay') DEFAULT 'COD',
    user_id INT NOT NULL,
    notes TEXT,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_district VARCHAR(100) NOT NULL,
    shipping_ward VARCHAR(100) NOT NULL,
    shipping_street VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
);
