-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2022 at 06:28 AM
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
  `mobileNumber` int(10) NOT NULL,
  `alternateNumber` int(10) NOT NULL,
  `landLine` int(10) NOT NULL,
  `city` varchar(225) NOT NULL,
  `routeId` int(10) NOT NULL,
  `address` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `creditLimit` float NOT NULL,
  `status` int(1) NOT NULL,
  `added_at` date NOT NULL,
  `added_by` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `businessName`, `customerName`, `mobileNumber`, `alternateNumber`, `landLine`, `city`, `routeId`, `address`, `email`, `creditLimit`, `status`, `added_at`, `added_by`) VALUES
(5, 'Lifecare Pharmacy', 'Lakshitha Madushanka', 773907288, 773907288, 2147483647, 'Middeniya', 19, 'No. 47 Mihidugama Sewanagala', 'lakshitha@gmail.com', 5000, 1, '2022-03-23', 1),
(9, 'Afex Pharmacy', 'Anil Madushanka', 773937288, 721913533, 322224291, 'Embilipitiya', 18, 'No. 47 Mihidugama Sewanagala', 'lakshitha@gmail.com', 5000, 1, '2022-03-23', 1);

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
(7, '001', 'test', 'test', 12, 20, 'Botel', 1),
(8, '002', 'Mix Fruits 190ml', 'Best Product', 12, 49, 'Botel', 1);

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
  `discount` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productssale`
--

INSERT INTO `productssale` (`id`, `saleId`, `product_id`, `qty`, `freeIssue`, `unitPrice`, `discount`, `total`) VALUES
(119, 67, 7, 2, 2, 20, 0, 40),
(120, 67, 8, 1, 0, 49, 0, 49),
(121, 68, 7, 12, 1, 20, 0, 240),
(122, 68, 8, 12, 1, 49, 0, 588);

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
(18, '0003', 'Embilipitiya Route', '[\"Sewanagala\",\"Kiribbanara\",\"Embilipitiya\",\"Sooriyawawa\"]'),
(19, '0004', 'Middeniya Route', '[\"pasdsa\",\"middeniya\"]');

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
  `salesSatatus` int(1) NOT NULL,
  `totalQty` float NOT NULL,
  `totalPrice` float NOT NULL,
  `totalDiscount` float NOT NULL,
  `grandTotal` float NOT NULL,
  `paidAmount` float NOT NULL,
  `salesNote` text NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `customerId`, `userId`, `routeId`, `paymentStatus`, `salesSatatus`, `totalQty`, `totalPrice`, `totalDiscount`, `grandTotal`, `paidAmount`, `salesNote`, `createdAt`) VALUES
(67, 5, 1, 19, 1, 1, 5, 89, 0, 89, 89, 'test', '2022-03-27 00:00:00'),
(68, 5, 1, 19, 2, 1, 26, 828, 0, 828, 0, 'test', '2022-03-27 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `routeId` int(10) DEFAULT NULL,
  `stock` int(10) NOT NULL,
  `added_at` date NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `productId`, `routeId`, `stock`, `added_at`, `status`) VALUES
(25, 8, 0, 100, '2021-03-22', 1),
(26, 7, 0, 182, '2021-03-22', 1),
(27, 7, 19, 33, '2022-03-24', 1),
(28, 8, 19, 121, '2022-03-24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stocktransfer`
--

CREATE TABLE `stocktransfer` (
  `id` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `routeId` int(10) NOT NULL,
  `stock` int(10) NOT NULL,
  `date` date NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocktransfer`
--

INSERT INTO `stocktransfer` (`id`, `productId`, `routeId`, `stock`, `date`, `status`) VALUES
(14, 7, 19, 88, '2022-03-24', 1),
(15, 8, 19, 170, '2022-03-24', 1);

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
(1, 'Kuburu Gamage Lakshitha Madushanka', 'Lakshitha Madushanka', 761913533, 'lakshitha@gmail.com', 'No 47 Mihidugama Sewanagala', '$2b$10$Nc1iAtC1VocRpc1PbZRifetzpnmb32oP6Im6oCHPyMOVBVqd0nZgC', 0, NULL);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `productssale`
--
ALTER TABLE `productssale`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `stocktransfer`
--
ALTER TABLE `stocktransfer`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
