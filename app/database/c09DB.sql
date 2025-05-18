-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2025 at 09:38 PM
-- Server version: 8.0.42-0ubuntu0.22.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c09DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `user_name`, `product_id`, `quantity`, `added_at`) VALUES
(53, 'hicyclone21', 4, 1, '2025-04-23 08:02:40'),
(235, 'Kao', 1, 1, '2025-05-10 04:52:16'),
(236, 'Kao', 2, 1, '2025-05-10 04:52:20'),
(237, 'Kao', 5, 1, '2025-05-10 04:52:24'),
(239, 'Cow', 8, 1, '2025-05-13 04:18:44'),
(243, 'qqq', 2, 1, '2025-05-16 05:42:10'),
(245, 'cus2', 2, 8, '2025-05-17 09:37:34'),
(247, 'cus2', 3, 4, '2025-05-18 10:19:35'),
(248, 'cus2', 4, 4, '2025-05-18 10:19:41');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `description`) VALUES
(1, 'Mousse', NULL),
(2, 'Croissant', NULL),
(3, 'Drink', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `delivery_date` date DEFAULT NULL,
  `delivery_time` time DEFAULT NULL,
  `total_cost` decimal(20,2) NOT NULL,
  `status` enum('Pending','Processing','Completed','Cancelled') DEFAULT 'Pending',
  `payment_method` enum('COD','Momo','Credit Card','VNPay') DEFAULT 'COD',
  `user_name` varchar(255) NOT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `recipient_phone` varchar(20) NOT NULL,
  `notes` text,
  `shipping_city` varchar(100) NOT NULL,
  `shipping_district` varchar(100) NOT NULL,
  `shipping_ward` varchar(100) NOT NULL,
  `shipping_street` varchar(255) NOT NULL
) ;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `delivery_date`, `delivery_time`, `total_cost`, `status`, `payment_method`, `user_name`, `recipient_name`, `recipient_phone`, `notes`, `shipping_city`, `shipping_district`, `shipping_ward`, `shipping_street`) VALUES
(1, '2025-04-18 13:37:37', '2025-04-19', '13:38:08', 1015000.00, 'Completed', 'COD', 'Haovoanh2005', 'Hào Võ Anh', '0868137377', 'Giao trong ngày', 'Thành phố Hồ Chí Minh', 'Quận 8', 'Phường Rạch Ông', '39 Cao Lỗ'),
(2, '2025-04-18 14:25:17', '2025-04-19', '14:26:59', 520000.00, 'Completed', 'COD', 'arvent', 'Nguyễn Thanh Bình', '0932088515', 'ko ăn cức', 'Thành phố Hồ Chí Minh', 'Huyện Hóc Môn', 'Xã Thới Tam Thôn', 'Nguyễn Thị Ngâu'),
(4, '2025-04-20 22:04:34', '2025-04-20', '13:59:25', 695000.00, 'Completed', 'COD', 'gem', 'Minh Bùi', '0762690423', '', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng'),
(5, '2025-04-21 10:30:08', '2025-04-24', '10:35:41', 840000.00, 'Completed', 'COD', 'Haovoanh2005', '', '', 'good luck !', 'Thành phố Hồ Chí Minh', 'Quận 8', 'Phường Rạch Ông', '39 Cao Lỗ'),
(6, '2025-04-23 14:53:19', '2025-04-24', NULL, 510000.00, 'Pending', 'COD', 'hicyclone21', 'VO HOANG BAO', '0999999999', 'con cac', 'Tỉnh Lâm Đồng', 'Huyện Lâm Hà', 'Xã Tân Thanh', '123'),
(7, '2025-04-23 14:57:27', '2025-04-26', NULL, 2210000.00, 'Pending', 'COD', 'hicyclone21', 'hihi hihi', '0999999999', '', 'Tỉnh Lâm Đồng', 'Huyện Lâm Hà', 'Xã Tân Thanh', '123'),
(8, '2025-04-23 14:59:46', '2025-04-30', NULL, 530000.00, 'Processing', 'COD', 'hicyclone21', 'hihi hihi', '0999999999', 'web mua ở đâu đó ní', 'Tỉnh Lâm Đồng', 'Huyện Lâm Hà', 'Xã Tân Thanh', '123'),
(10, '2025-04-23 15:33:47', '2025-04-23', NULL, 510000.00, 'Processing', 'COD', 'yuu', 'Dương Phong', '0898157233', '', 'Tỉnh Hà Giang', 'Huyện Hoàng Su Phì', 'Xã Ngàm Đăng Vài', 'Quận 11'),
(11, '2025-04-23 18:53:15', '2025-04-23', NULL, 2070000.00, 'Pending', 'COD', 'yuu', 'Dương Phong', '0898157233', '', 'Tỉnh Hà Giang', 'Huyện Hoàng Su Phì', 'Xã Ngàm Đăng Vài', 'Quận 11'),
(12, '2025-04-25 13:06:18', '2025-04-30', NULL, 2610000.00, 'Processing', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', '', '22', '202', 'Xã Nam Sơn', '123 abc'),
(13, '2025-04-25 13:07:19', '2025-05-15', NULL, 610000.00, 'Processing', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', '', '22', '202', 'Xã Nam Sơn', '123 abc'),
(14, '2025-04-25 13:08:08', '2025-05-10', NULL, 410000.00, 'Pending', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', '', '22', '202', 'Xã Nam Sơn', '123 abc'),
(15, '2025-04-25 13:49:59', '2025-04-26', NULL, 700000.00, 'Processing', 'COD', 'cus4', 'Nguyễn Thị D', '0856321987', '', '25', '235', 'Xã Nhật Tiến', '98 av'),
(16, '2025-04-26 13:34:13', '2025-04-26', NULL, 1020000.00, 'Processing', 'COD', 'luka', 'ka lu', '0988123123', '', 'Tỉnh Tuyên Quang', 'Huyện Chiêm Hóa', 'Xã Kiên Đài', 'Vinh phuc'),
(17, '2025-04-27 18:54:22', '2025-05-10', NULL, 1345000.00, 'Cancelled', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', '', '22', '202', 'Xã Nam Sơn', '123 abc'),
(18, '2025-04-27 18:55:20', '2025-04-30', NULL, 530000.00, 'Processing', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', 'giao nhanh ', '22', '202', 'Xã Nam Sơn', '123 abc'),
(19, '2025-04-27 18:57:04', '2025-04-27', NULL, 5610000.00, 'Pending', 'COD', 'cus2', 'võ anh hào', '1234567890', '', 'Tỉnh Hà Giang', 'Huyện Bắc Mê', 'Xã Đường Hồng', 'Quận 11'),
(20, '2025-04-28 14:22:34', '2025-04-30', NULL, 51000000.00, 'Cancelled', 'COD', 'cus2', 'Nguyễn Thị B', '0912987654', '', 'Tỉnh Hà Giang', 'Huyện Yên Minh', 'Xã Phú Lũng', '235 vbc'),
(21, '2025-04-28 14:23:52', '2025-05-14', NULL, 125000.00, 'Processing', 'COD', 'cus2', 'Nguyễn Thanh Bình ', '0998157233', '', 'Tỉnh Lai Châu', 'Huyện Than Uyên', 'Xã Tà Hừa', 'Quận 11'),
(22, '2025-04-28 15:11:51', '2025-05-29', '10:18:15', 4265000.00, 'Completed', 'COD', 'cus3', 'Nguyễn Thị C', '0703456789', 'sggragrageargergergerg', 'Tỉnh Lào Cai', 'Huyện Bảo Yên', 'Xã Vĩnh Yên', '56 bc'),
(23, '2025-04-28 15:13:40', '2025-04-28', NULL, 385000.00, 'Cancelled', 'COD', 'cus4', 'Nguyễn Thị D', '0856321987', 'ok', 'Tỉnh Bắc Kạn', 'Huyện Ngân Sơn', 'Xã Bằng Vân', '98 av'),
(24, '2025-04-28 18:43:29', '2025-04-30', NULL, 695000.00, 'Processing', 'COD', 'cus5', 'Nguyễn Thị E', '0908070133', 'Giao gấp', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Cầu Ông Lãnh', '24 Hai Bà Trưng'),
(25, '2025-04-28 18:46:16', '2025-04-28', '10:18:10', 190000.00, 'Completed', 'COD', 'cus5', 'Nguyễn Thị E', '0961852741', 'Giao vào buổi chiều', 'Thành phố Hồ Chí Minh', 'Quận 8', 'Phường 4', '39 Cao Lỗ'),
(26, '2025-04-28 18:47:57', '2025-04-29', NULL, 830000.00, 'Cancelled', 'COD', 'cus6', 'Nguyễn Thị F', '0327468135', 'Giao vào buổi tối', 'Tỉnh Hoà Bình', 'Huyện Cao Phong', 'Xã Thung Nai', '123 adv'),
(27, '2025-04-28 18:49:04', '2025-04-29', NULL, 745000.00, 'Processing', 'COD', 'cus6', 'Nguyễn Thị F', '0327468135', 'Giao gấp vào buổi sáng', 'Tỉnh Hoà Bình', 'Huyện Kim Bôi', 'Xã Kim Bôi', '123 abc '),
(28, '2025-04-29 10:12:49', '2025-06-12', '10:18:06', 19340000.00, 'Completed', 'COD', 'cus4', 'võ anh hào', '0998157233', 'ok', 'Tỉnh Yên Bái', 'Huyện Trạm Tấu', 'Xã Làng Nhì', 'Quận 11'),
(29, '2025-04-29 10:13:52', '2025-05-13', NULL, 1745000.00, 'Cancelled', 'COD', 'cus5', '', '', 'ok', 'Tỉnh Lào Cai', 'Huyện Bắc Hà', 'Xã Tả Củ Tỷ', '56 hz'),
(30, '2025-04-29 10:14:51', '2025-05-27', '10:18:02', 3860000.00, 'Completed', 'COD', 'cus6', 'Nguyễn Thị F', '0327468135', 'ok', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Yên Thuận', '34 a'),
(31, '2025-04-29 10:23:42', '2025-05-21', NULL, 1150000.00, 'Pending', 'COD', 'cus7', 'G Nguyễn Thị', '0798246810', 'ok', 'Tỉnh Bắc Kạn', 'Huyện Bạch Thông', 'Xã Đôn Phong', '34 bg'),
(32, '2025-04-29 10:24:49', '2025-05-21', NULL, 2700000.00, 'Pending', 'COD', 'cus8', 'Bùi Minh Ngọc ', '0988157233', 'ok', 'Tỉnh Sơn La', 'Huyện Mai Sơn', 'Xã Nà Pó', 'Quận 1'),
(33, '2025-04-30 23:36:06', '2025-05-20', NULL, 6375000.00, 'Pending', 'COD', 'cus9', 'Nguyễn Thị K', '0886975310', 'ok', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(34, '2025-04-30 23:36:34', '2025-05-01', NULL, 540000.00, 'Pending', 'COD', 'cus9', '', '', 'ok', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(35, '2025-04-30 23:37:20', '2025-05-06', NULL, 2790000.00, 'Pending', 'COD', 'cus2', 'Nguyễn Thị B', '0912987654', 'ok', 'Tỉnh Hà Giang', 'Huyện Yên Minh', 'Xã Phú Lũng', '235 vbc'),
(36, '2025-04-30 23:38:09', '2025-05-07', NULL, 420000.00, 'Pending', 'COD', 'cus3', 'Nguyễn Thị C', '0703456789', 'ok', 'Tỉnh Lào Cai', 'Huyện Bảo Yên', 'Xã Vĩnh Yên', '56 bc'),
(37, '2025-05-01 00:57:24', '2025-05-07', NULL, 720000.00, 'Pending', 'COD', 'cus8', 'H Nguyễn Thị', '0909135246', 'khong lấy vãi', 'Tỉnh Lào Cai', 'Huyện Bảo Thắng', 'Xã Bản Cầm', '45 hg'),
(38, '2025-05-01 14:38:59', '2025-05-15', NULL, 935000.00, 'Pending', 'COD', 'gem', 'Minh Bùi', '0762690423', '', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng'),
(41, '2025-05-02 10:53:27', '2025-05-02', NULL, 750000.00, 'Pending', 'COD', 'cus9', 'Nguyễn Thị K', '0886975310', 'bé yêu', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(43, '2025-05-02 11:12:42', '2025-05-02', NULL, 820000.00, 'Pending', 'COD', 'Gooahtby', 'Nhien Vu', '0898675716', 'Chúc em tháng 5 vui vẻ', 'Thành phố Hồ Chí Minh', 'Quận 7', 'Phường Tân Quy', '37 Cao Lo'),
(44, '2025-05-02 11:22:02', '2025-05-02', NULL, 190000.00, 'Pending', 'COD', 'Gooahtby', 'Nhien Vu', '0898675716', '', 'Thành phố Hồ Chí Minh', 'Quận 7', 'Phường Tân Quy', '37 Cao Lo'),
(45, '2025-05-02 11:58:41', '2025-05-02', NULL, 760000.00, 'Pending', 'COD', 'gem', 'Minh Bùi', '0762690423', '', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng'),
(46, '2025-05-02 12:00:07', '2025-05-05', NULL, 240000.00, 'Pending', 'COD', 'gem', 'Minh Bùi', '0762690423', 'Nice day !', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng'),
(47, '2025-05-03 11:42:26', '2025-05-03', '11:49:37', 200000.00, 'Completed', 'COD', 'Gooahtby', 'Nha Vu', '0908762345', 'Best Wishes', 'Thành phố Hồ Chí Minh', 'Quận 4', 'Phường 4', '50 Hoang Dieu'),
(48, '2025-05-03 21:44:38', '2025-05-08', NULL, 815000.00, 'Pending', 'COD', 'cus9', 'Nguyễn Thị K', '0886975310', 'khẩn !', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(49, '2025-05-03 21:46:11', '2025-05-16', NULL, 705000.00, 'Pending', 'COD', 'cus8', 'H Nguyễn Thị', '0909135246', '', 'Tỉnh Lào Cai', 'Huyện Bảo Thắng', 'Xã Bản Cầm', '45 hg'),
(50, '2025-05-03 21:47:17', '2025-05-03', NULL, 440000.00, 'Pending', 'COD', 'cus7', 'G Nguyễn Thị', '0798246810', 'ngay và luôn', 'Tỉnh Bắc Kạn', 'Huyện Bạch Thông', 'Xã Đôn Phong', '34 bg'),
(51, '2025-05-03 21:49:00', '2025-05-19', NULL, 810000.00, 'Processing', 'COD', 'cus9', 'Nguyễn Thị K', '0886975310', '', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(52, '2025-05-04 12:40:19', '2025-05-04', NULL, 1480000.00, 'Pending', 'COD', 'gem', 'Minh Bùi', '0762690423', 'Happy New Year ', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng'),
(53, '2025-05-04 14:06:28', '2025-05-30', NULL, 7310000.00, 'Pending', 'COD', 'cus5', 'Nguyễn Thị E', '0961852741', 'ok', 'Tỉnh Lào Cai', 'Huyện Bắc Hà', 'Xã Tả Củ Tỷ', '56 hz'),
(54, '2025-05-04 14:06:43', '2025-05-20', NULL, 4230000.00, 'Pending', 'COD', 'cus4', 'Nguyễn Thị D', '0856321987', 'Happi Birthday nha em iu', 'Tỉnh Bắc Kạn', 'Huyện Ngân Sơn', 'Xã Bằng Vân', '98 av'),
(55, '2025-05-04 14:07:32', '2025-05-05', NULL, 750000.00, 'Pending', 'COD', 'cus6', 'Nguyễn Thị F', '0327468135', 'giao gấp !', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Yên Thuận', '34 a'),
(56, '2025-05-04 14:08:35', '2025-06-03', NULL, 1140000.00, 'Pending', 'COD', 'cus1', 'võ anh hào', '0998157233', 'ok', 'Tỉnh Hoà Bình', 'Huyện Mai Châu', 'Xã Thành Sơn', 'Quận 10'),
(57, '2025-05-04 14:09:30', '2025-05-04', NULL, 475000.00, 'Pending', 'COD', 'cus6', 'Võ Anh Hào', '0868137376', 'giao chiều', 'Tỉnh Thái Nguyên', 'Huyện Phú Lương', 'Xã Yên Lạc', '56 Xuân Diệu'),
(58, '2025-05-04 14:11:02', '2025-05-18', NULL, 1135000.00, 'Pending', 'COD', 'cus9', 'Nguyễn Thanh Bình', '0909040751', 'Happy Graduation!', 'Thành phố Hồ Chí Minh', 'Huyện Hóc Môn', 'Xã Thới Tam Thôn', '43/5b Nguyễn Thị Ngâu. Thới Tam Thôn, Hóc Môn, TP.HCM'),
(59, '2025-05-04 14:11:08', '2025-06-17', NULL, 5140000.00, 'Pending', 'COD', 'cus2', 'Nguyễn Anh Hào', '09', 'ok', 'Tỉnh Bắc Kạn', 'Huyện Ngân Sơn', 'Xã Bằng Vân', 'quận hóc môn'),
(60, '2025-05-04 14:11:56', '2025-05-13', NULL, 540000.00, 'Pending', 'COD', 'cus9', 'Nguyễn Thị K', '0886975310', 'Happy Aniversary', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn'),
(61, '2025-05-04 14:12:16', '2025-06-04', NULL, 3300000.00, 'Pending', 'COD', 'cus3', 'Nguyễn Thị C', '0703456789', 'ok', 'Tỉnh Lào Cai', 'Huyện Bảo Yên', 'Xã Vĩnh Yên', '56 bc'),
(62, '2025-05-04 14:14:54', '2025-05-10', NULL, 510000.00, 'Pending', 'COD', 'cus1', 'Nguyễn Thanh B', '0932088517', 'Chúc mừng em nhé', 'Thành phố Hồ Chí Minh', 'Huyện Hóc Môn', 'Xã Bà Điểm', 'Nguyễn Thị Ngâu'),
(65, '2025-05-09 09:56:13', '2025-05-09', '10:19:00', 510001.00, 'Completed', 'COD', 'conchuot', 'Con con chuột', '0989789789', 'Ăn đi mập thì thôi', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Cô Giang', '272 an dương vương'),
(66, '2025-05-09 10:37:39', '2025-05-09', NULL, 1090000.00, 'Pending', 'COD', 'cus1', 'Nguyễn Thị A', '0384123456', '', 'Tỉnh Lào Cai', 'Huyện Si Ma Cai', 'Xã Bản Mế', '123 abc'),
(67, '2025-05-09 11:41:02', '2025-05-23', NULL, 5555555.00, 'Pending', 'COD', 'yuu123', 'gvjyfgjghjhg', '0987878787', 'tfhtfjh', 'Tỉnh Lạng Sơn', 'Huyện Hữu Lũng', 'Xã Đồng Tân', 'jghjghjhgj'),
(68, '2025-05-13 11:15:49', '2025-05-13', NULL, 510000.00, 'Processing', 'COD', 'Cow', 'Loan', '000000000', '', 'Thành phố Hồ Chí Minh', 'Quận 5', 'Phường 2', 'A.009, 273 An Duong Vuong'),
(69, '2025-05-15 20:51:56', '2025-05-16', NULL, 1680000.00, 'Cancelled', 'COD', 'kai', '', '', '', 'Tỉnh Quảng Ninh', 'Thị xã Quảng Yên', 'Phường Yên Hải', 'sds'),
(70, '2025-05-17 19:18:40', '2025-05-18', '19:11:00', 1020000.00, 'Pending', 'COD', 'arvent', 'BìnhNguyễn Thanh', '0932088515', '', 'Thành phố Hồ Chí Minh', 'Huyện Hóc Môn', 'Xã Thới Tam Thôn', 'Nguyễn Thị Ngâu');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `note` text
) ;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_id`, `product_id`, `quantity`, `price`, `note`) VALUES
(1, 3, 1, 520000.00, ''),
(1, 11, 3, 140000.00, ''),
(1, 16, 1, 75000.00, ''),
(2, 3, 1, 520000.00, ''),
(4, 1, 1, 510000.00, ''),
(4, 7, 1, 110000.00, ''),
(4, 16, 1, 75000.00, ''),
(5, 2, 1, 510000.00, ''),
(5, 7, 1, 110000.00, ''),
(5, 15, 1, 70000.00, ''),
(5, 16, 2, 75000.00, ''),
(6, 2, 1, 510000.00, ''),
(7, 2, 2, 510000.00, ''),
(7, 4, 1, 530000.00, ''),
(7, 6, 1, 550000.00, ''),
(7, 7, 1, 110000.00, ''),
(8, 4, 1, 530000.00, ''),
(10, 1, 1, 510000.00, ''),
(11, 1, 1, 510000.00, ''),
(11, 2, 1, 510000.00, ''),
(11, 3, 1, 520000.00, ''),
(11, 4, 1, 530000.00, ''),
(12, 1, 1, 510000.00, ''),
(12, 2, 1, 510000.00, ''),
(12, 3, 1, 520000.00, ''),
(12, 4, 1, 530000.00, ''),
(12, 5, 1, 540000.00, ''),
(13, 7, 1, 110000.00, ''),
(13, 8, 1, 110000.00, ''),
(13, 9, 1, 120000.00, ''),
(13, 10, 1, 130000.00, ''),
(13, 11, 1, 140000.00, ''),
(14, 12, 1, 150000.00, ''),
(14, 13, 1, 55000.00, ''),
(14, 14, 1, 60000.00, ''),
(14, 15, 1, 70000.00, ''),
(14, 16, 1, 75000.00, ''),
(15, 1, 1, 510000.00, ''),
(15, 28, 1, 120000.00, ''),
(16, 1, 1, 510000.00, ''),
(16, 2, 1, 510000.00, ''),
(17, 18, 1, 85000.00, ''),
(17, 24, 1, 380000.00, ''),
(17, 25, 1, 380000.00, ''),
(17, 26, 1, 380000.00, ''),
(17, 28, 1, 120000.00, ''),
(18, 7, 1, 110000.00, ''),
(18, 8, 1, 110000.00, ''),
(18, 31, 1, 180000.00, ''),
(19, 1, 1, 510000.00, ''),
(19, 2, 10, 510000.00, ''),
(20, 1, 100, 510000.00, ''),
(21, 34, 1, 65000.00, ''),
(22, 18, 1, 85000.00, 'ok'),
(22, 24, 1, 380000.00, 'ok'),
(22, 27, 1, 3800000.00, 'ok'),
(23, 30, 1, 180000.00, 'ok'),
(24, 1, 1, 510000.00, 'Happy birthday'),
(24, 8, 1, 110000.00, 'Hâm nóng'),
(24, 16, 1, 75000.00, 'ít ngọt'),
(25, 28, 1, 120000.00, 'Hâm nóng '),
(26, 4, 1, 530000.00, 'Happy graduation'),
(26, 29, 2, 150000.00, 'Nhiều sốt'),
(27, 6, 1, 550000.00, 'i love you'),
(27, 34, 3, 65000.00, 'đá vừa'),
(28, 18, 4, 85000.00, 'ok'),
(28, 27, 5, 3800000.00, 'ok'),
(29, 30, 4, 180000.00, 'okok'),
(29, 31, 3, 180000.00, 'ok'),
(29, 34, 4, 65000.00, 'ok'),
(30, 1, 3, 510000.00, 'ok'),
(30, 3, 3, 520000.00, 'ok'),
(30, 6, 1, 550000.00, 'ok'),
(30, 8, 2, 110000.00, 'ok'),
(31, 2, 1, 510000.00, 'ok'),
(31, 4, 1, 530000.00, 'ok'),
(31, 7, 1, 110000.00, 'ok'),
(32, 5, 5, 540000.00, 'ok'),
(33, 1, 5, 510000.00, 'okok'),
(33, 3, 5, 520000.00, 'ok'),
(33, 8, 5, 110000.00, 'ok'),
(34, 5, 1, 540000.00, 'ok'),
(35, 1, 5, 510000.00, 'ok'),
(35, 14, 4, 60000.00, 'ok'),
(37, 5, 1, 540000.00, ''),
(37, 7, 1, 110000.00, ''),
(37, 15, 1, 70000.00, ''),
(38, 1, 1, 510000.00, ''),
(38, 8, 1, 110000.00, ''),
(38, 16, 2, 75000.00, ''),
(38, 17, 1, 80000.00, ''),
(38, 18, 1, 85000.00, ''),
(41, 2, 1, 510000.00, 'Chúc mừng sinh nhật nha !'),
(41, 14, 1, 60000.00, 'không chanh'),
(41, 31, 1, 180000.00, 'không xoài'),
(43, 2, 1, 510000.00, ''),
(43, 9, 1, 120000.00, 'ngoài giòn trong mềm nhé'),
(43, 10, 1, 130000.00, 'ngoài giòn trong mềm nhé'),
(43, 14, 1, 60000.00, 'không đường và ít đá'),
(44, 13, 1, 55000.00, 'ít đường'),
(44, 34, 1, 65000.00, 'ngọt và xay còn đá'),
(45, 24, 1, 380000.00, ''),
(45, 26, 1, 380000.00, ''),
(46, 9, 1, 120000.00, ''),
(48, 1, 1, 510000.00, 'hpbd'),
(48, 8, 1, 110000.00, ''),
(48, 16, 1, 75000.00, 'low sugar'),
(48, 28, 1, 120000.00, 'low sugar'),
(49, 6, 1, 550000.00, 'happy'),
(49, 18, 1, 85000.00, ''),
(50, 25, 1, 380000.00, 'happy'),
(51, 13, 1, 55000.00, ''),
(51, 26, 1, 380000.00, ''),
(51, 28, 1, 120000.00, ''),
(51, 30, 1, 180000.00, ''),
(52, 2, 1, 510000.00, ''),
(52, 3, 1, 520000.00, ''),
(52, 8, 1, 110000.00, 'Giòn bên ngoài mềm bên trong nha'),
(52, 16, 1, 75000.00, '50% đường '),
(52, 18, 1, 85000.00, '30% đường'),
(52, 31, 1, 180000.00, ''),
(53, 1, 4, 510000.00, 'okok'),
(53, 3, 4, 520000.00, 'ok'),
(53, 6, 5, 550000.00, 'ok'),
(53, 8, 4, 110000.00, 'ok'),
(54, 27, 1, 3800000.00, ''),
(54, 31, 2, 180000.00, ''),
(55, 2, 1, 510000.00, 'hpbd'),
(55, 9, 1, 120000.00, ''),
(55, 28, 1, 120000.00, ''),
(56, 1, 1, 510000.00, 'ok'),
(56, 30, 1, 180000.00, ''),
(56, 31, 1, 180000.00, 'ok'),
(56, 34, 1, 65000.00, 'ok'),
(57, 14, 1, 60000.00, ''),
(57, 18, 1, 85000.00, ''),
(57, 29, 1, 150000.00, ''),
(57, 31, 1, 180000.00, ''),
(58, 4, 2, 530000.00, 'không bỏ LongAn'),
(58, 16, 1, 75000.00, ''),
(59, 17, 1, 80000.00, ''),
(59, 18, 1, 85000.00, ''),
(59, 24, 1, 380000.00, ''),
(59, 26, 1, 380000.00, ''),
(59, 27, 1, 3800000.00, ''),
(59, 28, 1, 120000.00, ''),
(59, 29, 1, 150000.00, ''),
(60, 5, 1, 540000.00, 'ít xoài giúp em'),
(61, 6, 6, 550000.00, 'ok'),
(62, 2, 1, 510000.00, ''),
(65, 2, 1, 510000.00, ''),
(66, 1, 1, 510000.00, ''),
(66, 3, 1, 520000.00, ''),
(68, 1, 1, 510000.00, 'Double cream, triple avocado please'),
(69, 1, 1, 510000.00, ''),
(69, 2, 2, 510000.00, ''),
(69, 29, 1, 150000.00, ''),
(70, 1, 1, 510000.00, ''),
(70, 2, 1, 510000.00, '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb3 NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `status` enum('Available','Out of Stock','Discontinued','Hidden') CHARACTER SET utf8mb3 DEFAULT 'Available',
  `ingredients` text CHARACTER SET utf8mb3,
  `storage_instructions` text CHARACTER SET utf8mb3,
  `image` varchar(255) CHARACTER SET utf8mb3 DEFAULT NULL,
  `expiration_date` date DEFAULT NULL
) ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `price`, `category_id`, `size_id`, `status`, `ingredients`, `storage_instructions`, `image`, `expiration_date`) VALUES
(1, 'Avocado Mousse', 510000.00, 1, 3, 'Available', 'Fresh avocado, heavy cream, condensed milk, gelatin, vanilla extract, and a touch of lemon juice for enhanced flavor.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Avocado_Mousse.jpg', '2025-04-21'),
(2, 'Blueberry Mousse', 510000.00, 1, 3, 'Available', 'Fresh blueberries, heavy cream, cream cheese, sugar, gelatin, and lemon zest for a refreshing taste.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Blueberry_Mousse.jpg', '2025-12-31'),
(3, 'Corn Mousse', 520000.00, 1, 3, 'Available', 'Sweet corn puree, heavy cream, condensed milk, vanilla essence, gelatin, and a pinch of sea salt.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Corn_Mousse.jpg', '2025-12-31'),
(4, 'Longan Mousse', 530000.00, 1, 3, 'Available', 'Fresh longan pulp, coconut milk, heavy cream, gelatin, sugar, and pandan extract for a tropical twist.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Longan_Mousse.jpg', '2025-12-31'),
(5, 'Mango Mousse', 540000.00, 1, 3, 'Available', 'Ripe mango puree, heavy cream, condensed milk, gelatin, and lime zest to enhance the natural sweetness.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Mango_Mousse.jpg', '2025-12-31'),
(6, 'Melon Mousse', 550000.00, 1, 3, 'Available', 'Fresh melon puree, heavy cream, yogurt, sugar, gelatin, and honey for a light, creamy texture.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/Melon_Mousse.jpg', '2025-12-31'),
(7, 'Avocado Croissant', 110000.00, 2, 2, 'Available', 'Flaky butter croissant filled with fresh avocado slices, cream cheese, and a hint of honey.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Avocado_Croissant.jpg', '2025-06-30'),
(8, 'Choco Mallow Croissant', 110000.00, 2, 2, 'Available', 'Crispy croissant stuffed with melted dark chocolate and fluffy marshmallows, sprinkled with cocoa powder.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Choco_Mallow_Croissant.png', '2025-06-30'),
(9, 'Dinosaur Almond Croissant', 120000.00, 2, 2, 'Available', 'Butter croissant coated with almond cream, sliced almonds, and powdered sugar, giving it a crunchy bite.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Dinosaur_Almond_Croissant.png', '2025-06-30'),
(10, 'Honey Almond Croissant', 130000.00, 2, 2, 'Available', 'Golden-brown croissant glazed with organic honey and topped with roasted almond flakes.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Honey_Almond_Croissant.png', '2025-06-30'),
(11, 'Matcha Croissant', 140000.00, 2, 2, 'Available', 'Classic croissant infused with premium matcha powder, filled with matcha cream, and lightly dusted with icing sugar.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Matcha_Croissant.jpg', '2025-06-30'),
(12, 'Plain Croissant', 150000.00, 2, 2, 'Available', 'Traditional French-style croissant with a crispy exterior and soft, buttery layers inside.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/Plain_Croissant.png', '2025-06-30'),
(13, 'Choco Mallow', 55000.00, 3, 1, 'Available', 'Rich hot chocolate made with Belgian cocoa, fresh milk, and topped with soft marshmallows.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Choco_Mallow.png', '2025-09-30'),
(14, 'Lemon Tea', 60000.00, 3, 1, 'Hidden', 'Refreshing black tea brewed with fresh lemon slices, organic honey, and a hint of mint.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Lemon_Tea.png', '2025-09-30'),
(15, 'Lychee Tea', 70000.00, 3, 1, 'Available', 'Fragrant lychee-infused green tea with floral undertones, served with lychee pulp.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Lychee_Tea.png', '2025-09-30'),
(16, 'Matcha Latte', 75000.00, 3, 1, 'Available', 'Creamy matcha latte made with high-grade Japanese matcha, steamed milk, and light vanilla syrup.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Latte.png', '2025-09-30'),
(17, 'Matcha Mallow', 80000.00, 3, 1, 'Available', 'Rich matcha drink blended with oat milk, topped with whipped cream and toasted marshmallows.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Mallow.png', '2025-09-30'),
(18, 'Matcha Misu', 85000.00, 3, 1, 'Hidden', 'Tiramisu-inspired matcha drink layered with mascarpone cream and cocoa dust.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Matcha_Misu.png', '2025-09-30'),
(24, 'Blue Berry Mousse', 380000.00, 1, 3, 'Available', 'A cake made with fresh cream, plenty of eggs, and cream cheese, topped with blueberry cream. It\'s surrounded by a soft blueberry-flavored sponge cake layer.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/product_website_10_67915c7ecf8446bbb47d4e5b82be4b14_master.jpg', '2025-04-26'),
(25, 'Caramel Chocolate Mousse', 380000.00, 1, 3, 'Available', 'A cake made from eggs, topped with caramel and chocolate. It\'s surrounded by a layer of sponge cake for decoration.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/product_website_31_8fcd777ce35d42388d34552141bb9ba5_master.jpg', '2025-04-26'),
(26, 'Hawaii Mousse', 380000.00, 1, 3, 'Available', 'A cake made with fresh cream and plenty of eggs, topped with coconut caramel. It\'s surrounded by a soft caramel-flavored sponge cake layer.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/product_website_34_ccbbd0917c8b4ffe9cd51cb50eee41ec_master.jpg', '2025-04-25'),
(27, 'Cherry Cheese Mousse', 3800000.00, 1, 3, 'Available', 'A cake made with fresh cream, plenty of eggs, and cream cheese, topped with cherry cream. It\'s surrounded by a colorful and eye-catching layer of sponge cake.', 'Keep refrigerated at 4°C.', 'public/assets/Img/Mousse/product_website_11_56c6557f87d34cfaa4bc25344c37bc3b_master.jpg', '2025-04-26'),
(28, 'Taro Cream Croissant', 120000.00, 2, 2, 'Available', 'To celebrate the Chinese New Year, our special and widely popular pastry - taro cream filled spelt croissants. All organic ingredients.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/shinfuni-06 (1).jpg', '2025-04-26'),
(29, 'Lemon Meringue Croissant', 150000.00, 2, 2, 'Available', 'Sweet and sour lemon filling combined with a light, spongy meringue layer on top of the cake. A refreshing and unique flavor.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/lemon-meringue-croissant-165288-2 (1).jpg', '2025-05-01'),
(30, 'Pistachio Raspberry Croissant', 180000.00, 2, 2, 'Available', 'Rich pistachio cream filling combined with slightly sour raspberry jam. Topped with crispy roasted pistachios.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/pistachio-raspberry-croissant-5131.jpg', '2025-04-26'),
(31, 'Mango Sticky Rice Croissant', 180000.00, 2, 2, 'Available', 'Inspired by Thai cuisine, croissant filled with sweet ripe mango and sticky rice, covered with coconut milk sauce.', 'Store in a cool, dry place.', 'public/assets/Img/Croissant/IMG_4576-1024x1014.jpg', '2025-04-26'),
(34, 'Strawberry Yogurt Fizz', 65000.00, 3, 1, 'Available', 'Strawberry yogurt combined with light soda, slightly sour - slightly sweet, with fruit topping.', 'Keep refrigerated after opening.', 'public/assets/Img/Drink/Strawberry-milkshake-frappuccino-featured.jpg', '2025-04-25');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int NOT NULL,
  `size_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size_name`) VALUES
(2, '10cm'),
(3, '16cm'),
(1, 'L');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `street` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') DEFAULT 'customer',
  `status` enum('active','locked') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_name`, `first_name`, `last_name`, `phone`, `email`, `city`, `district`, `ward`, `street`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES
('Ad', 'Ac', 'Ab', '0910281028', 'conmeo@gmail.com', 'Tỉnh Cao Bằng', 'Thành phố Cao Bằng', 'Phường Tân Giang', 'Abc', '$2y$10$WFKh6u7GgmMGSPfHrJKulucyWnOOG6212wO8PUR/pRwy3I1ux0ws2', 'customer', 'active', '2025-05-10 04:49:20', '2025-05-10 04:49:20'),
('admin', 'Le', 'Van C', '0923456789', 'levanc@example.com', 'Hà Nội', 'Ba Đình', 'Kim Mã', '789 Trần Hưng Đạo', '$2y$10$0QZVDBb/jOeoCdhAdB4JB.Sbjc.DSuksus.QtCPiXh0oEnOFOQCc2', 'admin', 'active', '2025-04-18 05:24:23', '2025-05-09 03:16:57'),
('admin2', 'Dương', 'Nhiên Phong', '0837192468', 'admin2@gmail.com', 'Tỉnh Bắc Kạn', 'Huyện Ngân Sơn', 'Xã Cốc Đán', '76 abc', '$2y$10$.RkyK6rltsgThT.7NegIq.ePjLTJnzzEzRlIY40LH3iUIvgeUEUzu', 'admin', 'active', '2025-04-25 05:37:34', '2025-04-28 05:46:39'),
('arvent', 'Bình', 'Nguyễn Thanh', '0932088515', 'thanhbinh2881982@gmail.com', 'Thành phố Hồ Chí Minh', 'Huyện Hóc Môn', 'Xã Thới Tam Thôn', 'Nguyễn Thị Ngâu', '$2y$10$d5K9DgKVPMQMnCNkgVpHhOgZLtRKKEf0rcE.FcRn/joLYSH/tizH.', 'customer', 'active', '2025-04-18 07:24:23', '2025-04-18 07:24:23'),
('ArventerB', 'Bình', 'Nguyễn Thanh', '0932088518', 'thanhbinh28819822@gmail.com', 'Tỉnh Lào Cai', 'Huyện Bắc Hà', 'Xã Hoàng Thu Phố', 'Abf', '$2y$10$UehBdfe3hWfmX1kSQ.fixOxRsk4laeO8.twDU1UPh1gZwcNzBzmNK', 'customer', 'active', '2025-05-17 12:28:33', '2025-05-17 12:29:16'),
('conchuot', 'Con', 'con chuột', '0989789789', 'conchuot@gmail.com', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Cô Giang', '272 an dương vương', '$2y$10$f0VxHjBhGpfK/axewccWWOyPIwyWnMnG96lZizxifQLdya6waKzkS', 'customer', 'active', '2025-05-09 02:45:58', '2025-05-09 02:45:58'),
('conheo123', 'Heo', 'Con', '0987654321', 'conheo@gmail.com', 'Tỉnh Hoà Bình', 'Huyện Lương Sơn', 'Xã Nhuận Trạch', '3889 bqjuejiwf kwejiewj', '$2y$10$u6acM4ydN3WJGUIjS6MnauSM/U.xKMJDxelm8KL6KY954oc34yn0u', 'admin', 'active', '2025-05-09 03:04:48', '2025-05-09 03:04:48'),
('conmeo', 'con meo', 'con meo', '0915107907', 'conmeo@hmail.com', 'Tỉnh Hà Giang', 'Huyện Đồng Văn', 'Xã Lũng Cú', '272 an dương vương', '$2y$10$L92A/QFtopqUEndoJ6MXreGShubbOWupfilxXX9NNQDkFRqQ4RX9O', 'customer', 'active', '2025-05-15 06:39:41', '2025-05-15 06:39:41'),
('Cow', 'Cow', 'Cow', '0999111999', 'cow@gmai.com', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Nguyễn Thái Bình', 'ADV', '$2y$10$eNULWxUv7cEdXO8N14qen.CE8MlIK3SuRzuItzHH5LN0ajod3sLUu', 'customer', 'active', '2025-05-13 04:12:22', '2025-05-13 04:12:22'),
('cus1', 'Nguyễn', 'Thị A', '0384123456', 'nta@gmail.com', 'Tỉnh Lào Cai', 'Huyện Si Ma Cai', 'Xã Bản Mế', '123 abc', '$2y$10$Q.NpaKlXIaLnVr2Qkk..9.hV3NFy0lY/.fPAzHJR4xMvk8rAFQjS6', 'customer', 'active', '2025-04-25 05:33:33', '2025-05-04 07:07:23'),
('cus2', 'Nguyễn', 'Thị B', '0912987654', 'ntb@gmail.com', 'Tỉnh Hà Giang', 'Huyện Yên Minh', 'Xã Phú Lũng', '235 vbc', '$2y$10$d61ne28lOnj5u.7K9cR.i.ABTpvII1YK9.gb2jqyVVrwO1wxZD2gO', 'customer', 'active', '2025-04-25 05:35:10', '2025-04-28 07:22:18'),
('cus3', 'Nguyễn', 'Thị C', '0703456789', 'NguyenthiC@gmail.com', 'Tỉnh Lào Cai', 'Huyện Bảo Yên', 'Xã Vĩnh Yên', '56 bc', '$2y$10$YeDcP1V3TT/YSdj2tFn7V.P.QFnUcIVTvInv6Z7JTbGNMTHQrmPzK', 'customer', 'active', '2025-04-25 05:40:16', '2025-04-28 05:46:48'),
('cus4', 'Nguyễn', 'Thị D', '0856321987', 'NguyenthiD@gmail.com', 'Tỉnh Bắc Kạn', 'Huyện Ngân Sơn', 'Xã Bằng Vân', '98 av', '$2y$10$UkGerhM3HPceiBxAvJYdgO37IG1myhgiHyeMkaZ0kvdhNo.V9UfNK', 'customer', 'active', '2025-04-25 05:41:09', '2025-04-28 08:13:07'),
('cus5', 'Nguyễn', 'Thị E', '0961852741', 'NguyenthiE@gmail.com', 'Tỉnh Lào Cai', 'Huyện Bắc Hà', 'Xã Tả Củ Tỷ', '56 hz', '$2y$10$gj3mHJPx4qXihM1W0Kh0..tCtwXGLKwuCnI1gZJu8qDDZ2fFCAr/2', 'customer', 'active', '2025-04-25 05:42:30', '2025-04-28 05:47:06'),
('cus6', 'Nguyễn', 'Thị F', '0327468135', 'NguyenthiF@gmail.com', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Yên Thuận', '34 a', '$2y$10$BD6GOQ/r1IhXGRx0BafD5.1J9usJJckIEHTDje8Ne13JtRZ4SpQf6', 'customer', 'active', '2025-04-25 05:43:45', '2025-04-28 05:47:15'),
('cus7', 'G', 'Nguyễn Thị', '0798246810', 'NguyenthiG@gmail.com', 'Tỉnh Bắc Kạn', 'Huyện Bạch Thông', 'Xã Đôn Phong', '34 bg', '$2y$10$EJLOJ56pNjcRvhXLBXjJ5eQe0GEaQqOCideUpzGv/Vj4gkZO9ooGu', 'customer', 'active', '2025-04-25 05:46:32', '2025-04-28 05:47:25'),
('cus8', 'H', 'Nguyễn Thị', '0909135246', 'NguyenthiH@gmail.com', 'Tỉnh Lào Cai', 'Huyện Bảo Thắng', 'Xã Bản Cầm', '45 hg', '$2y$10$r0yzyrfLiS/OGImEX0WQIun9Ci3ozlum3Xb1IAMZUxOe6G24x5EXu', 'customer', 'active', '2025-04-25 05:47:30', '2025-04-28 05:47:35'),
('cus9', 'Nguyễn', 'Thị K', '0886975310', 'NguyenthiK@gmail.com', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '98 bn', '$2y$10$N/jmupCPzea3KfyulvonnuSj8lq5eTp4U8f5WYQG7xasazMoDwtM2', 'customer', 'active', '2025-04-25 05:49:50', '2025-04-28 05:47:46'),
('gem', 'Minh', 'Bùi', '0762690423', 'buingoc1552005@gmail.com', 'Thành phố Hồ Chí Minh', 'Quận 1', 'Phường Bến Thành', '95/12 Lê Thị Riêng', '$2y$10$XlWF4CNaBr5EcqyEriN3JOjxeMyqysqTpe6yfCqxnEjmA9gLCqOWm', 'customer', 'active', '2025-04-20 15:01:25', '2025-04-20 15:01:25'),
('Gooahtby', 'Nhien', 'Vu', '0898675716', 'vunhien@gmail.com', 'Thành phố Hồ Chí Minh', 'Quận 7', 'Phường Tân Quy', '37 Cao Lo', '$2y$10$eBqB0b4rAzYEDvwH6fk/hu/uTY9QaZf.tJdikJFpbkFKBAEwi4vQi', 'customer', 'active', '2025-05-01 07:41:16', '2025-05-01 07:41:16'),
('Haovoanh2005', 'Hào', 'Võ Anh', '0868137377', 'haovoanh2005@gmail.com', 'Thành phố Hồ Chí Minh', 'Quận 8', 'Phường Rạch Ông', '39 Cao Lỗ', '$2y$10$smNQ.HpnvlB8/0I0.saZd.0FVMmTcPPIsteXfb3VKIJJYRA9k46yK', 'customer', 'locked', '2025-04-18 06:34:53', '2025-04-25 05:50:59'),
('hello', 'hello', 'hello', '0931779067', 'hello@gmail.com', 'Tỉnh Sơn La', 'Huyện Mộc Châu', 'Xã Qui Hướng', 'hello', '$2y$10$FSSnaRCMefw9G6WkPKyCgOEefVIobbv7cfHXXQ0Z6AqD84riA12iS', 'customer', 'active', '2025-05-07 15:32:29', '2025-05-07 15:32:29'),
('hicyclone21', 'hihi', 'hihi', '0999999999', 'hicyclone@gmail.com', 'Tỉnh Lâm Đồng', 'Huyện Lâm Hà', 'Xã Tân Thanh', '123', '$2y$10$Xv.O1BBh4pMyyb/iadplheCsCaNUKcC1t663R9R10VYuOxmYCX4Xy', 'customer', 'active', '2025-04-23 07:50:24', '2025-04-23 07:50:24'),
('https://c09.nhahodau.net/pay', 'VÕ', 'HÀO', '0908070115', 'hakobe2005@gmail.com', 'Tỉnh Hoà Bình', 'Huyện Mai Châu', 'Xã Săm Khóe', 'Nam', '$2y$10$GHxQv9Pa5bNCvnD2IraNOO/jK56yNkoI2gD9CQVi77BypT9muu2OK', 'customer', 'active', '2025-05-09 01:48:17', '2025-05-09 01:48:17'),
('https://c09.nhahodau.net/register', 'VÕ', 'HÀO', '0905070113', 'haovoanh@gmail.com', 'Tỉnh Lào Cai', 'Huyện Bát Xát', 'Xã Bản Xèo', 'Nam', '$2y$10$bjUr3bU.XV4Z4pteLrLy2eDL4Oy9jM2fpr7iJTpaLXHSU7ojHOjgC', 'customer', 'active', '2025-05-09 01:56:56', '2025-05-09 01:56:56'),
('kai', 's', 's', '0923241242', 'con0@gmail.com', 'Tỉnh Quảng Ninh', 'Thị xã Quảng Yên', 'Phường Yên Hải', 'sds', '$2y$10$la65kcvUzJ7wlgqkPnByquS3xg1l6pIfK8cyfzb/NmH36mmbbWSum', 'customer', 'active', '2025-05-15 13:49:43', '2025-05-15 13:49:43'),
('Kao', 'J', 'H', '0912367897', 'meocon@gmail.com', 'Tỉnh Hà Giang', 'Huyện Mèo Vạc', 'Xã Xín Cái', 'Yr', '$2y$10$bFOcoz0srnCqcO.FNLTtyuY.o69cZ/xZ86nT9RhgRP0ADHR2qlFje', 'customer', 'active', '2025-05-10 04:51:54', '2025-05-10 04:51:54'),
('luka', 'ka', 'lu', '0988123123', 'abc@gmail.com', 'Tỉnh Tuyên Quang', 'Huyện Chiêm Hóa', 'Xã Kiên Đài', 'Vinh phuc', '$2y$10$pRODEhhgOIi2L8ceSaXPzexd4mKexPbvxZs0CrOvUBI1fQx0OURF.', 'customer', 'active', '2025-04-26 06:31:53', '2025-04-26 06:31:53'),
('min', 'min', 'min', '0978181191', '2323@gmail.com', 'Thành phố Hà Nội', 'Quận Nam Từ Liêm', 'Phường Phú Đô', 'sds', '$2y$10$Ifzh3JyLAdEZzwjj.QPhNeIeRw5s2R8nQjPHcRUu943LwQpabbZje', 'customer', 'active', '2025-05-05 14:48:25', '2025-05-05 14:48:25'),
('qqq', 'qq', 'qqq', '0900900000', 'qqq@qqq.qqq', 'Tỉnh Hà Tĩnh', 'Huyện Cẩm Xuyên', 'Xã Cẩm Nhượng', 'aaa', '$2y$10$O1cmkFfDeH5wQ3hs8vHzrOBN5IEGKsoDc4yPrCupdjUDmbQrpOdiS', 'customer', 'active', '2025-05-16 05:38:02', '2025-05-16 05:38:02'),
('voanhhao', 'Hào', 'Võ Anh', '0908070113', 'haokobe2005@gmail.com', 'Tỉnh Tuyên Quang', 'Huyện Hàm Yên', 'Xã Bạch Xa', '123 abc', '$2y$10$GTSknlG4FwOh45rnwEhZWucGzKVgBDMX9bKhPNdKxdyVxbJyYWu0q', 'admin', 'active', '2025-04-18 06:40:36', '2025-05-04 07:14:01'),
('yuu', 'Dương', 'Phong', '0898157233', 'yuu@gmail.com', 'Tỉnh Hà Giang', 'Huyện Hoàng Su Phì', 'Xã Ngàm Đăng Vài', 'Quận 11', '$2y$10$TQiuPXRFbvtttiVGpFK.Ke3CDnHckDJLzLCFLBSlLlEuVlspvAwfy', 'customer', 'active', '2025-04-22 16:08:16', '2025-04-22 16:08:16'),
('yuu123', 'ghj', 'hgj', '0987878787', 'yuu12122@gmail.com', 'Tỉnh Lạng Sơn', 'Huyện Hữu Lũng', 'Xã Đồng Tân', 'jghjghjhgj', '$2y$10$ssRqJm5sVzuOUy4.oHxftuPD2NOs1dj2BngnZBlK0vpvk86O5SAOC', 'customer', 'active', '2025-05-09 04:39:51', '2025-05-09 04:39:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_name` (`user_name`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_name` (`user_name`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`),
  ADD UNIQUE KEY `size_name` (`size_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`user_name`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`user_name`) ON DELETE CASCADE;

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`size_id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
