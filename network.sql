-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2020 at 12:02 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `network`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `branch` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch`) VALUES
(1, 'Antipolo'),
(2, 'Bacolod'),
(3, 'Baguio'),
(4, 'Baler'),
(5, 'Baliuag'),
(6, 'Bataan'),
(7, 'Batangas'),
(8, 'Benguet'),
(9, 'Bohol'),
(10, 'Bukidnon'),
(11, 'Bulacan'),
(12, 'Butuan'),
(13, 'Cabanatuan'),
(14, 'Cagayan De Oro'),
(15, 'Cainta'),
(16, 'Calamba'),
(17, 'Capiz'),
(18, 'Cauayan'),
(19, 'Cavite'),
(20, 'Cebu'),
(21, 'Consolacion'),
(22, 'Dagupan'),
(23, 'Dau'),
(24, 'Davao'),
(25, 'Digos'),
(26, 'Digos City'),
(27, 'Digos Trike'),
(28, 'Dumaguete'),
(29, 'Gapan'),
(30, 'General Santos'),
(31, 'Harrison Plaza'),
(32, 'Head Office'),
(33, 'Ilocos Norte'),
(34, 'Iloilo'),
(35, 'Imus'),
(36, 'Intramuros'),
(37, 'Isabela'),
(38, 'Kabankalan'),
(39, 'Kidapawan'),
(40, 'Koronadal'),
(41, 'La Trinidad'),
(42, 'La Union'),
(43, 'Lagro'),
(44, 'Laguna'),
(45, 'Laoag'),
(46, 'Las Piñas'),
(47, 'Lipa'),
(48, 'Makati'),
(49, 'Malaybalay'),
(50, 'Malolos'),
(51, 'Mandaluyong'),
(52, 'Mandaue'),
(53, 'Manila'),
(54, 'Marikina'),
(55, 'MBL'),
(56, 'Meycauayan'),
(57, 'Muntinlupa'),
(58, 'Naga'),
(59, 'Negros Occidental'),
(60, 'Negros Oriental'),
(61, 'Nueva Ecija'),
(62, 'Olongapo'),
(63, 'Pampanga'),
(64, 'Parañaque'),
(65, 'Pasay'),
(66, 'Pasig'),
(67, 'POEA'),
(68, 'Quezon Avenue'),
(69, 'Quezon City'),
(70, 'Roxas'),
(71, 'San Fernando PA'),
(72, 'San Jose'),
(73, 'San Mateo'),
(74, 'San Pablo'),
(75, 'Santiago'),
(76, 'SC Koronadal'),
(77, 'SC Panabo'),
(78, 'SME Antipolo'),
(79, 'SME Marikina'),
(80, 'Tacloban'),
(81, 'Tagbilaran'),
(82, 'Tagum'),
(83, 'Talavera'),
(84, 'Tanay'),
(85, 'Tandang Sora'),
(86, 'Tarlac'),
(87, 'Tuguegarao'),
(88, 'Tuguegarao City'),
(89, 'Valencia'),
(90, 'Valenzuela');

-- --------------------------------------------------------

--
-- Table structure for table `downtime_record`
--

CREATE TABLE `downtime_record` (
  `id` int(11) NOT NULL,
  `ticket` varchar(10) NOT NULL,
  `branch` int(3) NOT NULL,
  `provider` varchar(20) NOT NULL,
  `started` datetime NOT NULL,
  `status` varchar(1000) NOT NULL,
  `resolve` tinyint(1) DEFAULT 0,
  `date_solved` datetime DEFAULT NULL,
  `down_time` varchar(200) DEFAULT NULL,
  `remarks` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `downtime_record`
--

INSERT INTO `downtime_record` (`id`, `ticket`, `branch`, `provider`, `started`, `status`, `resolve`, `date_solved`, `down_time`, `remarks`) VALUES
(1, '1', 1, '1', '2019-01-22 00:00:00', '1', 1, '2019-07-22 13:00:00', '6 month(s)  1 day(s)  13 hour(s)  ', '12112019 - modem not turning on\r\n12122019 - ongoing restoration, No ETR\r\n12132019 - ongoing restoration, No ETR\r\n12162019 - ongoing restoration, No ETR\r\n12/17/2019 - ongoing restoration, No ETR\r\n12/18/2019 - ongoing restoration, No ETR\r\n12/19/2019 - ongoing res'),
(2, '2', 1, '2', '2019-01-01 10:00:00', '1', 1, '2019-07-07 10:00:00', '6 month(s)  7 day(s)  ', '01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network'),
(3, '3', 1, '1', '2019-01-01 00:00:00', '1', 0, NULL, NULL, '01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network'),
(6, '4', 1, '3', '2019-03-01 10:10:00', '1', 0, NULL, NULL, NULL),
(7, '5', 1, '4', '2019-02-01 10:10:00', '1', 0, NULL, NULL, '12112019 - modem not turning on\n12122019 - ongoing restoration, No ETR\n12132019 - ongoing restoration, No ETR\n12162019 - ongoing restoration, No ETR\n12/17/2019 - ongoing restoration, No ETR\n12/18/2019 - ongoing restoration, No ETR\n12/19/2019 - ongoing restoration, No ETR\n12/27/2019 - ongoing restoration, No ETR'),
(8, '6', 1, '5', '2019-01-01 10:00:00', '1', 0, NULL, NULL, '01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network'),
(9, '7', 1, '6', '2019-01-01 10:00:00', '1', 0, NULL, NULL, '01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network'),
(10, '8', 1, '7', '2019-01-10 10:00:00', '1', 0, NULL, NULL, '01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network\n01/01/2020 - No Network');

-- --------------------------------------------------------

--
-- Table structure for table `provider`
--

CREATE TABLE `provider` (
  `id` int(11) NOT NULL,
  `provider` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provider`
--

INSERT INTO `provider` (`id`, `provider`) VALUES
(1, 'ETPI'),
(2, 'Globe'),
(3, 'ICT'),
(4, 'PLDT'),
(5, 'Radius'),
(6, 'Rise'),
(7, 'Sky Biz'),
(8, 'All Telco');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(1, 'Intermittent'),
(2, 'No Network'),
(3, 'Slow');

-- --------------------------------------------------------

--
-- Table structure for table `year_list`
--

CREATE TABLE `year_list` (
  `year` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `year_list`
--

INSERT INTO `year_list` (`year`) VALUES
('2019'),
('2020');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `downtime_record`
--
ALTER TABLE `downtime_record`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provider`
--
ALTER TABLE `provider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `downtime_record`
--
ALTER TABLE `downtime_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `provider`
--
ALTER TABLE `provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
