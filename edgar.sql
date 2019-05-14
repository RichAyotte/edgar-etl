-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: edgar
-- ------------------------------------------------------
-- Server version	5.7.25-1-log

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
-- Table structure for table `etl_logs`
--

DROP TABLE IF EXISTS `etl_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etl_logs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `etl_process_run_id` int(10) unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `message` text COLLATE utf8_unicode_ci,
  `action` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` enum('started','completed','cancelled','running','failed','pending') COLLATE utf8_unicode_ci NOT NULL,
  `severity` enum('emergency','alert','critical','error','warning','notice','info','debug') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_etl_logs_1_idx` (`etl_process_run_id`),
  CONSTRAINT `fk_etl_logs_1` FOREIGN KEY (`etl_process_run_id`) REFERENCES `etl_process_runs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `etl_process_runs`
--

DROP TABLE IF EXISTS `etl_process_runs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etl_process_runs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `etl_process_id` int(10) unsigned NOT NULL,
  `started_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ended_at` datetime DEFAULT NULL,
  `status` enum('started','completed','cancelled','running','failed','pending') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_etl_process_runs_1_idx` (`etl_process_id`),
  CONSTRAINT `fk_etl_process_runs_1` FOREIGN KEY (`etl_process_id`) REFERENCES `etl_processes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `etl_processes`
--

DROP TABLE IF EXISTS `etl_processes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etl_processes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `numbers`
--

DROP TABLE IF EXISTS `numbers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `numbers` (
  `adsh` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `tag` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ddate` date NOT NULL,
  `qtrs` decimal(8,0) NOT NULL,
  `uom` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `coreg` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `value` decimal(20,4) DEFAULT NULL,
  `footnote` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`adsh`,`tag`,`version`,`ddate`,`qtrs`,`uom`,`coreg`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `statements`
--

DROP TABLE IF EXISTS `statements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statements` (
  `adsh` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `report` decimal(6,0) NOT NULL,
  `line` decimal(6,0) NOT NULL,
  `stmt` enum('BS','IS','CF','EQ','CI','UN') COLLATE utf8_unicode_ci NOT NULL,
  `inpth` tinyint(1) NOT NULL,
  `rfile` enum('H','X') COLLATE utf8_unicode_ci NOT NULL,
  `tag` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `plabel` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`adsh`,`report`,`line`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `submissions` (
  `adsh` char(20) COLLATE utf8_unicode_ci NOT NULL,
  `cik` decimal(10,0) unsigned NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `sic` decimal(4,0) unsigned DEFAULT NULL,
  `countryba` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `stprba` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `citypa` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `zipba` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bas1` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bas2` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `baph` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `countryma` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `stprma` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cityma` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zipma` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mas1` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mas2` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `countryinc` char(3) COLLATE utf8_unicode_ci NOT NULL,
  `stprinc` char(2) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ein` decimal(10,0) unsigned DEFAULT NULL,
  `former` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `changed` char(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `afs` enum('LAF','ACC','SRA','NON','SML') COLLATE utf8_unicode_ci DEFAULT NULL,
  `wksi` tinyint(1) NOT NULL,
  `fye` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `form` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `period` char(8) COLLATE utf8_unicode_ci NOT NULL,
  `fy` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `fp` enum('FY','Q1','Q2','Q3','Q4','H1','H2','M9','T1','T2','T3','M8','CY') COLLATE utf8_unicode_ci NOT NULL,
  `filed` date NOT NULL,
  `accepted` datetime NOT NULL,
  `prevrpt` tinyint(1) NOT NULL,
  `detail` tinyint(1) NOT NULL,
  `instance` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `nciks` decimal(4,0) unsigned NOT NULL,
  `aciks` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`adsh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `tag` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `custom` tinyint(1) NOT NULL,
  `abstract` tinyint(1) NOT NULL,
  `datatype` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iord` enum('I','D') COLLATE utf8_unicode_ci NOT NULL,
  `crdr` enum('C','D') COLLATE utf8_unicode_ci DEFAULT NULL,
  `tlabel` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doc` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`tag`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-13 17:09:35
