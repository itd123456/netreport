-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: network
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `branch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `branch` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Antipolo'),(2,'Bacolod'),(3,'Baguio'),(4,'Baler'),(5,'Baliuag'),(6,'Bataan'),(7,'Batangas'),(8,'Benguet'),(9,'Bohol'),(10,'Bukidnon'),(11,'Bulacan'),(12,'Butuan'),(13,'Cabanatuan'),(14,'Cagayan De Oro'),(15,'Cainta'),(16,'Calamba'),(17,'Capiz'),(18,'Cauayan'),(19,'Cavite'),(20,'Cebu'),(21,'Consolacion'),(22,'Dagupan'),(23,'Dau'),(24,'Davao'),(25,'Digos'),(26,'Digos City'),(27,'Digos Trike'),(28,'Dumaguete'),(29,'Gapan'),(30,'General Santos'),(31,'Harrison Plaza'),(32,'Head Office'),(33,'Ilocos Norte'),(34,'Iloilo'),(35,'Imus'),(36,'Intramuros'),(37,'Isabela'),(38,'Kabankalan'),(39,'Kidapawan'),(40,'Koronadal'),(41,'La Trinidad'),(42,'La Union'),(43,'Lagro'),(44,'Laguna'),(45,'Laoag'),(46,'Las Piñas'),(47,'Lipa'),(48,'Makati'),(49,'Malaybalay'),(50,'Malolos'),(51,'Mandaluyong'),(52,'Mandaue'),(53,'Manila'),(54,'Marikina'),(55,'MBL'),(56,'Meycauayan'),(57,'Muntinlupa'),(58,'Naga'),(59,'Negros Occidental'),(60,'Negros Oriental'),(61,'Nueva Ecija'),(62,'Olongapo'),(63,'Pampanga'),(64,'Parañaque'),(65,'Pasay'),(66,'Pasig'),(67,'POEA'),(68,'Quezon Avenue'),(69,'Quezon City'),(70,'Roxas'),(71,'San Fernando PA'),(72,'San Jose'),(73,'San Mateo'),(74,'San Pablo'),(75,'Santiago'),(76,'SC Koronadal'),(77,'SC Panabo'),(78,'SME Antipolo'),(79,'SME Marikina'),(80,'Tacloban'),(81,'Tagbilaran'),(82,'Tagum'),(83,'Talavera'),(84,'Tanay'),(85,'Tandang Sora'),(86,'Tarlac'),(87,'Tuguegarao'),(88,'Tuguegarao City'),(89,'Valencia'),(90,'Valenzuela');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `downtime_record`
--

DROP TABLE IF EXISTS `downtime_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `downtime_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket` varchar(10) NOT NULL,
  `branch` int(3) NOT NULL,
  `provider` varchar(20) NOT NULL,
  `started` datetime NOT NULL,
  `status` varchar(1000) NOT NULL,
  `resolve` tinyint(1) DEFAULT '0',
  `date_solved` datetime DEFAULT NULL,
  `down_time` varchar(200) DEFAULT NULL,
  `remarks` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downtime_record`
--

LOCK TABLES `downtime_record` WRITE;
/*!40000 ALTER TABLE `downtime_record` DISABLE KEYS */;
INSERT INTO `downtime_record` VALUES (12,'32910517',64,'4','2020-02-10 14:10:00','2',0,NULL,NULL,'2/10/2020 - No network connection all lights are green'),(13,'32623970',34,'4','2020-01-15 16:10:00','3',0,NULL,NULL,'1/15/2020 - slow net connection\n1/17/2020 to 1/21/2020 - ongoing restoration\n2/11/2020 - under monitoring');
/*!40000 ALTER TABLE `downtime_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` VALUES (1,'ETPI'),(2,'Globe'),(3,'ICT'),(4,'PLDT'),(5,'Radius'),(6,'Rise'),(7,'Sky Biz'),(8,'All Telco');
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Intermittent'),(2,'No Network'),(3,'Slow');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `year_list`
--

DROP TABLE IF EXISTS `year_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `year_list` (
  `year` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `year_list`
--

LOCK TABLES `year_list` WRITE;
/*!40000 ALTER TABLE `year_list` DISABLE KEYS */;
INSERT INTO `year_list` VALUES ('2019'),('2020');
/*!40000 ALTER TABLE `year_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11 14:02:25
