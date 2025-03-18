-- Bảng USERS (thay USER để tránh lỗi)
CREATE TABLE USERS (
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng CATEGORY
CREATE TABLE CATEGORY (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Bảng SIZE
CREATE TABLE SIZE (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    size_name VARCHAR(50) UNIQUE NOT NULL
);

-- Bảng PRODUCT
CREATE TABLE PRODUCT (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    category_id INT,
    size_id INT,
    status ENUM('Available', 'Out of Stock', 'Discontinued') DEFAULT 'Available',
    description TEXT,
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id) ON DELETE SET NULL,
    FOREIGN KEY (size_id) REFERENCES SIZE(size_id) ON DELETE SET NULL
);

-- Bảng ORDERS
CREATE TABLE ORDERS (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_cost DECIMAL(10,2) NOT NULL CHECK (total_cost >= 0),
    status ENUM('Pending', 'Processing', 'Completed', 'Cancelled') DEFAULT 'Pending',
    user_id INT NOT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE
);

-- Bảng ORDER_DETAIL
CREATE TABLE ORDER_DETAIL (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES ORDERS(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
);

-- Bảng CART
CREATE TABLE CART (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES PRODUCT(product_id) ON DELETE CASCADE
);

ALTER TABLE products MODIFY price DECIMAL(15,2);
