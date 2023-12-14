-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:5306:5306
-- Generation Time: Dec 14, 2023 at 04:12 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_node_mysql_g6`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `Description`, `Status`, `CreateAt`) VALUES
(3, 'Macbooks-aa', 'Apple products-aa', 0, '2023-11-20 14:52:13'),
(4, 'Macbooks-aa', 'Apple products-aa', 0, '2023-11-20 14:52:13'),
(5, 'Asus', 'Microsoft product', 1, '2023-11-20 14:52:13'),
(6, 'Macbook', 'Apple product', 1, '2023-11-21 14:37:51'),
(7, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:30'),
(8, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:32'),
(9, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:33'),
(10, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:34'),
(11, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:36'),
(12, 'Macbook', 'Apple product', 1, '2023-11-21 14:38:37'),
(13, 'A', 'Des A', 0, '2023-11-21 14:42:09');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Id` int(11) NOT NULL,
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) NOT NULL,
  `Dob` date NOT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Tel` varchar(20) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `Salary` decimal(6,0) NOT NULL,
  `Role` varchar(120) DEFAULT NULL,
  `Image` varchar(120) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Id`, `Firstname`, `Lastname`, `Gender`, `Dob`, `Email`, `Tel`, `Password`, `Address`, `Salary`, `Role`, `Image`, `CreateAt`) VALUES
(1, 'Kolo', 'Mo', 1, '2000-01-01', 'kolo@gmail.com', '098887766', '$2b$10$LRh5TUkVdRNh2eYVNXW2eeEpdWc/GHmp6ZoZIwAOCIB5uuTv6aZai', '123, st202', 1000, 'Admin', 'upload_emp-1701270648901-960749238', '2023-11-29 15:10:49'),
(6, 'Jon', 'Sina', 1, '2000-01-01', 'sina@gmail.com', '098887767', '$2b$10$zl.OwpQhQoOyXC7346tJM.synXhXBWLAyutz3hk4RAmWGL/8J4XP.', '123, st202', 1001, 'Manager', 'upload_emp-1701788609421-883728390', '2023-12-05 15:03:29');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Code` varchar(256) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Id`, `Name`, `Code`, `Status`, `CreateAt`) VALUES
(1, 'Admin', 'admin', 0, '2023-11-23 14:34:30'),
(2, 'IT', 'it', 1, '2023-11-23 14:43:59'),
(3, 'Account', 'Account', 1, '2023-11-23 14:44:22'),
(5, 'Sell1', 'Sell1', 1, '2023-11-23 15:05:35'),
(6, 'Sell2', 'Sell2', 1, '2023-11-23 15:05:35'),
(7, 'Sell3', 'Sell3', 1, '2023-11-23 15:05:35'),
(8, 'A1', 'A1', 1, '2023-11-23 15:08:50'),
(9, 'A1', 'A1', 1, '2023-11-23 15:11:57'),
(10, 'A2', 'A2', 1, '2023-11-23 15:11:57'),
(11, 'A3', 'A3', 1, '2023-11-23 15:11:57'),
(12, 'B1', 'B1', 1, '2023-11-23 15:15:26'),
(13, 'B2', 'B2', 1, '2023-11-23 15:15:26'),
(14, 'B3', 'B3', 1, '2023-11-23 15:15:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UN_Employee_Tel` (`Tel`),
  ADD UNIQUE KEY `UN_Employee_Email` (`Email`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
