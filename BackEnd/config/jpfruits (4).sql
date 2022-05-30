-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2022 at 09:20 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jpfruits`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(10) NOT NULL,
  `businessName` varchar(225) DEFAULT NULL,
  `customerName` varchar(225) DEFAULT NULL,
  `mobileNumber` varchar(10) NOT NULL,
  `alternateNumber` varchar(10) NOT NULL,
  `landLine` varchar(10) NOT NULL,
  `city` varchar(225) NOT NULL,
  `routeId` int(10) NOT NULL,
  `address` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `creditLimit` float NOT NULL,
  `status` int(1) NOT NULL,
  `added_at` varchar(200) NOT NULL,
  `added_by` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `businessName`, `customerName`, `mobileNumber`, `alternateNumber`, `landLine`, `city`, `routeId`, `address`, `email`, `creditLimit`, `status`, `added_at`, `added_by`) VALUES
(16, 'Denagama Stors', 'Madura', '0770542871', '0761913533', '0474104972', 'Danduma', 25, '32/ Danduma Junction, Sewanagala', 'madura@gmail.com', 5000, 1, '25/04/2022', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `productCode` varchar(50) NOT NULL,
  `productName` varchar(225) NOT NULL,
  `productDescription` text NOT NULL,
  `cost` double NOT NULL,
  `sale` double NOT NULL,
  `unit` varchar(150) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productCode`, `productName`, `productDescription`, `cost`, `sale`, `unit`, `status`) VALUES
(11, '0001', 'Mix Fruits 190ml', '', 32, 60, 'ml', 1),
(12, '002', 'Mix Fruits 500ml', '', 70, 150, 'ml', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productssale`
--

CREATE TABLE `productssale` (
  `id` int(10) NOT NULL,
  `saleId` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `freeIssue` int(2) NOT NULL,
  `unitPrice` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productssale`
--

INSERT INTO `productssale` (`id`, `saleId`, `product_id`, `qty`, `freeIssue`, `unitPrice`, `total`) VALUES
(151, 95, 12, 20, 0, 150, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(3) NOT NULL,
  `routeNumber` varchar(10) NOT NULL,
  `routeName` varchar(225) NOT NULL,
  `cities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `routeNumber`, `routeName`, `cities`) VALUES
(25, '0001', 'Embilipitiya', '[\"Danduma\",\"Morakatiya\",\"Kiribbanwewa\",\"Sooriyawewa\",\"Embilipitiya\",\"Middeniya\",\"Hambanthota\",\"Thanamalwila\"]');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(10) NOT NULL,
  `customerId` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `routeId` int(10) NOT NULL,
  `paymentStatus` int(1) NOT NULL,
  `Account` varchar(225) DEFAULT NULL,
  `chequeNumber` varchar(50) DEFAULT NULL,
  `salesSatatus` int(1) NOT NULL,
  `totalQty` float NOT NULL,
  `totalPrice` float NOT NULL,
  `grandTotal` float NOT NULL,
  `paidAmount` float NOT NULL,
  `salesNote` text NOT NULL,
  `createdAt` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `customerId`, `userId`, `routeId`, `paymentStatus`, `Account`, `chequeNumber`, `salesSatatus`, `totalQty`, `totalPrice`, `grandTotal`, `paidAmount`, `salesNote`, `createdAt`) VALUES
(95, 16, 1, 25, 1, '', NULL, 1, 20, 3000, 3000, 3000, '', '26/04/2022');

-- --------------------------------------------------------

--
-- Table structure for table `stockreturn`
--

CREATE TABLE `stockreturn` (
  `id` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `routeId` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `reason` tinyint(1) NOT NULL,
  `note` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` varchar(120) NOT NULL,
  `updated_at` varchar(120) DEFAULT NULL,
  `deleted_at` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stockreturn`
--

INSERT INTO `stockreturn` (`id`, `productId`, `routeId`, `qty`, `reason`, `note`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 12, 23, 100, 0, 'test', 1, '09/05/2022, 11:44:30', '09/05/2022, 11:46:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` double NOT NULL,
  `recieved` double DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` varchar(120) DEFAULT NULL,
  `updated_at` varchar(120) DEFAULT NULL,
  `deleted_at` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `product_id`, `qty`, `recieved`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(26, 12, 0, 350, 1, '05/05/2022, 09:10:31', '14/05/2022, 08:39:11', NULL),
(27, 12, 100, 500, 1, '05/05/2022, 09:10:31', '07/05/2022, 15:37:49', NULL),
(28, 12, 400, 400, 1, '13/05/2022, 10:34:30', '13/05/2022, 10:35:08', '13/05/2022, 10:35:13'),
(29, 11, 350, 500, 1, '13/05/2022, 10:44:46', '14/05/2022, 08:51:53', NULL),
(30, 11, 250, NULL, 2, '25/05/2022, 15:09:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stocktransfer`
--

CREATE TABLE `stocktransfer` (
  `id` int(10) NOT NULL,
  `routeId` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `recieved` int(10) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` varchar(120) NOT NULL,
  `updated_at` varchar(120) DEFAULT NULL,
  `deleted_at` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocktransfer`
--

INSERT INTO `stocktransfer` (`id`, `routeId`, `productId`, `qty`, `recieved`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 23, 12, 0, 2, 2, '09/05/2022, 11:40:41', '09/05/2022, 11:46:58', NULL),
(6, 23, 12, 100, 2, 2, '14/05/2022, 08:38:19', NULL, NULL),
(7, 23, 12, 50, 2, 2, '14/05/2022, 08:39:11', NULL, NULL),
(8, 23, 11, 150, 2, 2, '14/05/2022, 08:51:53', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `fullName` varchar(225) NOT NULL,
  `shortName` varchar(225) NOT NULL,
  `mobileNumber` int(10) NOT NULL,
  `email` varchar(225) NOT NULL,
  `address` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `userRole` int(3) NOT NULL,
  `route` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `shortName`, `mobileNumber`, `email`, `address`, `password`, `userRole`, `route`) VALUES
(1, 'Kuburu Gamage Lakshitha Madushanka', 'Lakshitha Madushanka', 761913533, 'lakshitha@gmail.com', 'No 47 Mihidugama Sewanagala', '$2b$10$Nc1iAtC1VocRpc1PbZRifetzpnmb32oP6Im6oCHPyMOVBVqd0nZgC', 0, 0),
(25, 'Gamage chamath Dilshan', 'G Chamath Dilshan', 715856985, 'chamathdilshan@gmail.com', '432/ Mihidugama Sewanagala', '$2b$10$sQJp/z3ckQJDGxw96I3EreN/DDffYBj22sJWBt5eNO55WUi5QkV.u', 2, 25),
(26, 'Kuburu Gamage Diluka Sandakalum', 'K G Diluka Sandakalum', 779586958, 'dilukasadakalum@gmail.com', 'No. 47 mihiduga', '$2b$10$In1XVYCZhFRZUQ.nf2SGP.thyFQ9hu6SB1DHvuyjzlRs/9yWaEXRy', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wastage_stock`
--

CREATE TABLE `wastage_stock` (
  `id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `reason` tinyint(1) NOT NULL,
  `note` text DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` varchar(120) NOT NULL,
  `updated_at` varchar(120) DEFAULT NULL,
  `deleted_at` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wastage_stock`
--

INSERT INTO `wastage_stock` (`id`, `product_id`, `qty`, `reason`, `note`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 12, 250, 1, 'test', 0, '05/05/2022, 09:40:06', '05/05/2022, 09:40:06', NULL),
(3, 12, 100, 1, 'test', 0, '05/05/2022, 13:04:37', '05/05/2022, 13:04:37', NULL),
(4, 12, 100, 1, 'test', 2, '05/05/2022, 13:05:56', '05/05/2022, 13:05:56', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productssale`
--
ALTER TABLE `productssale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales to productSale` (`saleId`),
  ADD KEY `product to productSale` (`product_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer to sales` (`customerId`);

--
-- Indexes for table `stockreturn`
--
ALTER TABLE `stockreturn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stocktransfer`
--
ALTER TABLE `stocktransfer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wastage_stock`
--
ALTER TABLE `wastage_stock`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `productssale`
--
ALTER TABLE `productssale`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `stockreturn`
--
ALTER TABLE `stockreturn`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `stocktransfer`
--
ALTER TABLE `stocktransfer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `wastage_stock`
--
ALTER TABLE `wastage_stock`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productssale`
--
ALTER TABLE `productssale`
  ADD CONSTRAINT `product to productSale` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales to productSale` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `customer to sales` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
