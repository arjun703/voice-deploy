-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 26, 2024 at 04:51 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `voice`
--

-- --------------------------------------------------------

--
-- Table structure for table `accesses`
--

DROP TABLE IF EXISTS `accesses`;
CREATE TABLE IF NOT EXISTS `accesses` (
  `id` bigint UNSIGNED NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `accessible_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessible_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `action_events`
--

DROP TABLE IF EXISTS `action_events`;
CREATE TABLE IF NOT EXISTS `action_events` (
  `id` bigint UNSIGNED NOT NULL,
  `batch_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actionable_id` bigint UNSIGNED NOT NULL,
  `target_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED DEFAULT NULL,
  `fields` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'running',
  `exception` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `original` mediumtext COLLATE utf8mb4_unicode_ci,
  `changes` mediumtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `action_events`
--

INSERT INTO `action_events` (`id`, `batch_id`, `user_id`, `name`, `actionable_type`, `actionable_id`, `target_type`, `target_id`, `model_type`, `model_id`, `fields`, `status`, `exception`, `created_at`, `updated_at`, `original`, `changes`) VALUES
(1, '987e0b61-9442-4f6b-a67d-8a7d4f06da1d', 1, 'Create', 'App\\Models\\Investor', 1, 'App\\Models\\Investor', 1, 'App\\Models\\Investor', 1, '', 'finished', '', '2023-02-17 19:00:42', '2023-02-17 19:00:42', NULL, '{\"name\":\"Ahmed\",\"email\":\"testingWith@gmail.com\",\"nationality\":\"0\",\"nationalId\":\"1092243961\",\"phone\":\"0568595106\",\"birthDate\":\"2023-02-03T00:00:00.000000Z\",\"sex\":\"0\",\"maritalStatus\":\"1\",\"familyMember\":\"1\",\"educationLevel\":\"0\",\"city\":\"0\",\"postalBox\":\"124\",\"postalCode\":\"1234\",\"employer\":\"zdf\",\"workCity\":\"Riyadh\",\"jobTitle\":\"Developer\",\"totalIncome\":\"1\",\"totalAssets\":\"1\",\"sourceIncome\":\"1\",\"investmentKnowledge\":\"1\",\"riskTaker\":\"0\",\"bank\":\"0\",\"iban\":\"13ersgdf\",\"boardMember\":\"1\",\"friendOfBoardMember\":\"0\",\"militaryTask\":\"1\",\"fiendOfMilitaryTask\":\"0\",\"mainInterest\":\"1\",\"exFintech\":\"0\",\"expertFintech\":\"0\",\"termCondition\":true,\"updated_at\":\"2023-02-17T22:00:42.000000Z\",\"created_at\":\"2023-02-17T22:00:42.000000Z\",\"id\":1}'),
(2, '9881ff37-c472-4d8f-a06d-f39213f73d0e', 1, 'Create', 'App\\Models\\FundsManager', 1, 'App\\Models\\FundsManager', 1, 'App\\Models\\FundsManager', 1, '', 'finished', '', '2023-02-19 18:10:00', '2023-02-19 18:10:00', NULL, '{\"nameAr\":\"fds\",\"nameEn\":\"fds\",\"email\":\"sda\",\"expireDate\":\"2023-02-08T00:00:00.000000Z\",\"phone\":\"05695\",\"cr\":\"12324\",\"authorityNo\":\"234\",\"updated_at\":\"2023-02-19T21:10:00.000000Z\",\"created_at\":\"2023-02-19T21:10:00.000000Z\",\"id\":1}'),
(3, '9881ff42-cccd-46b0-8389-5aa3b5987d1b', 1, 'Create', 'App\\Models\\Opportunity', 2, 'App\\Models\\Opportunity', 2, 'App\\Models\\Opportunity', 2, '', 'finished', '', '2023-02-19 18:10:07', '2023-02-19 18:10:07', NULL, '{\"project\":\"fdsa\",\"fund_name\":\"ada\",\"fund_manager_name\":\"asda\",\"share_type\":\"0\",\"date_from\":\"2023-02-13T00:00:00.000000Z\",\"date_to\":\"2023-02-27T00:00:00.000000Z\",\"country\":\"0\",\"city\":\"0\",\"development_company\":\"asdaff\",\"funds_size\":\"23\",\"token\":\"42\",\"available_token\":\"42\",\"target_revenue\":\"12\",\"minimum_investment\":\"1\",\"fund_strategy\":\"dsca\",\"fund\\u0640custodian\":\"dsas\",\"term_condition\":true,\"status\":true,\"attachment1\":\"JSuD67cb61hVY55Uet03PMi7DfQ3Et83IWwsbXSl.pdf\",\"attachment2\":\"MaGh0oZ4sJXPJUkj7AmHIGnLnBSe1Re2kqtBlfbx.pdf\",\"funds_managers_id\":\"1\",\"updated_at\":\"2023-02-19T21:10:07.000000Z\",\"created_at\":\"2023-02-19T21:10:07.000000Z\",\"id\":2}'),
(4, '988206d6-6a5c-412e-aa23-45b7b9f6442b', 1, 'Update', 'App\\Models\\Investor', 1, 'App\\Models\\Investor', 1, 'App\\Models\\Investor', 1, '', 'finished', '', '2023-02-19 18:31:18', '2023-02-19 18:31:18', '{\"nationalId\":1092243961,\"termCondition\":1}', '{\"nationalId\":\"1092243962\",\"termCondition\":true}'),
(5, '98a97370-7db0-4e25-9791-e314b041a3d0', 1, 'Create', 'App\\Models\\InvestorOpportunity', 1, 'App\\Models\\InvestorOpportunity', 1, 'App\\Models\\InvestorOpportunity', 1, '', 'finished', '', '2023-03-11 08:52:16', '2023-03-11 08:52:16', NULL, '{\"token\":\"23\",\"status\":true,\"opportunity_id\":3,\"investor_id\":1,\"updated_at\":\"2023-03-11T11:52:16.000000Z\",\"created_at\":\"2023-03-11T11:52:16.000000Z\",\"id\":1}'),
(6, '98a974dc-62ab-4c0e-a5db-4062a9b316da', 1, 'Create', 'App\\Models\\TradableOpportunity', 1, 'App\\Models\\TradableOpportunity', 1, 'App\\Models\\TradableOpportunity', 1, '', 'finished', '', '2023-03-11 08:56:14', '2023-03-11 08:56:14', NULL, '{\"token\":\"23\",\"price\":\"12\",\"status\":true,\"opportunity_id\":3,\"investor_id\":1,\"updated_at\":\"2023-03-11T11:56:14.000000Z\",\"created_at\":\"2023-03-11T11:56:14.000000Z\",\"id\":1}'),
(7, '98a977eb-66e1-41c1-babe-a8ad7a644739', 1, 'Create', 'App\\Models\\Investor', 2, 'App\\Models\\Investor', 2, 'App\\Models\\Investor', 2, '', 'finished', '', '2023-03-11 09:04:48', '2023-03-11 09:04:48', NULL, '{\"name\":\"Khaled\",\"email\":\"Fadi@gmail.clm\",\"nationality\":\"0\",\"nationalId\":\"1092243971\",\"phone\":\"0568595107\",\"birthDate\":\"2023-03-06T00:00:00.000000Z\",\"sex\":\"0\",\"maritalStatus\":\"1\",\"familyMember\":\"3\",\"educationLevel\":\"0\",\"city\":\"0\",\"postalBox\":\"1234556\",\"postalCode\":\"23435\",\"employer\":\"gdsf\",\"workCity\":\"\\u0627\\u0644\\u0631\\u064a\\u0627\\u0636\",\"jobTitle\":\"grw\",\"totalIncome\":\"1\",\"totalAssets\":\"1\",\"sourceIncome\":\"0\",\"investmentKnowledge\":\"2\",\"riskTaker\":\"2\",\"bank\":\"2\",\"iban\":\"rwtgdhfgm\",\"boardMember\":\"0\",\"friendOfBoardMember\":\"1\",\"militaryTask\":\"1\",\"fiendOfMilitaryTask\":\"1\",\"mainInterest\":\"1\",\"exFintech\":\"1\",\"expertFintech\":\"1\",\"termCondition\":true,\"updated_at\":\"2023-03-11T12:04:48.000000Z\",\"created_at\":\"2023-03-11T12:04:48.000000Z\",\"id\":2}'),
(8, '98ac05e0-4bb1-4777-baa6-c8a9673c56e2', 1, 'Update', 'App\\Models\\Opportunity', 4, 'App\\Models\\Opportunity', 4, 'App\\Models\\Opportunity', 4, '', 'finished', '', '2023-03-12 15:33:23', '2023-03-12 15:33:23', '{\"term_condition\":1}', '{\"term_condition\":true}');

-- --------------------------------------------------------

--
-- Table structure for table `email_subscribe`
--

DROP TABLE IF EXISTS `email_subscribe`;
CREATE TABLE IF NOT EXISTS `email_subscribe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `subject` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone_number` varchar(200) DEFAULT NULL,
  `message` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merchants`
--

DROP TABLE IF EXISTS `merchants`;
CREATE TABLE IF NOT EXISTS `merchants` (
  `merchantId` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `merchantName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactInfo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`merchantId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `merchants`
--

INSERT INTO `merchants` (`merchantId`, `merchantName`, `contactInfo`, `email`, `address`, `status`, `created_at`, `updated_at`) VALUES
(1, 'My Coders', '1234567890', 'info@mycoders.in', 'xyz', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `merchant_surveys`
--

DROP TABLE IF EXISTS `merchant_surveys`;
CREATE TABLE IF NOT EXISTS `merchant_surveys` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `survey_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `survey_channel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurant_factors` varchar(85) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `surveyTypeId` bigint UNSIGNED NOT NULL,
  `merchantId` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User Surveys` (`user_id`),
  KEY `user_surveys_surveytypeid_foreign` (`surveyTypeId`),
  KEY `merchantId` (`merchantId`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `merchant_surveys`
--

INSERT INTO `merchant_surveys` (`id`, `user_id`, `survey_name`, `survey_channel`, `rating`, `comment`, `restaurant_factors`, `created_at`, `updated_at`, `surveyTypeId`, `merchantId`) VALUES
(44, 7, 'NPS SURVEY', 'option2', '05', 'GOOD', 'Restaurant Menu', '2024-02-05 08:58:51', '2024-02-05 08:58:51', 2, 1),
(45, 7, 'CSAT', 'option2', '07', 'GOOD NPS', 'Restaurant Menu', '2024-02-05 09:01:13', '2024-02-05 09:01:13', 2, 1),
(46, 7, 'CSAT', 'option3', '10', 'CSAT', 'Restaurant Menu', '2024-02-05 09:02:10', '2024-02-05 09:02:10', 1, 1),
(47, 7, 'NPS', 'option2', '06', 'NPSS', 'Restaurant Menu', '2024-02-05 09:05:11', '2024-02-05 09:05:11', 2, 1),
(48, 7, 'CSAt', 'option3', '07', 'CSAT', 'Food Quality', '2024-02-05 09:06:54', '2024-02-05 09:06:54', 1, 1),
(49, 7, 'cdc', 'option3', '04', 'cdc', 'Restaurant Menu', '2024-02-05 23:28:49', '2024-02-05 23:28:49', 2, 1),
(50, 7, 'er', 'option2', '05', 'frf', 'Restaurant Menu', '2024-02-06 06:22:59', '2024-02-06 06:22:59', 2, 1),
(51, 7, 'C-SAT Survey 1', 'option3', '', '', '', '2024-02-09 08:17:49', '2024-02-09 08:17:49', 1, 1),
(52, 7, 'CSAT 1', 'option2', '', '', '', '2024-02-09 08:25:20', '2024-02-09 08:25:20', 1, 1),
(53, 7, 'survey 2', 'option2', '', '', '', '2024-02-09 08:27:15', '2024-02-09 08:27:15', 2, 1),
(54, 7, 'First Survey', 'option1', '', '', '', '2024-02-10 09:23:32', '2024-02-10 09:23:32', 2, 1),
(55, 7, 'Survey 22', 'option2', '', '', '', '2024-02-11 08:58:17', '2024-02-11 08:58:17', 2, 1),
(56, 7, 'nnnn', 'option2', '', '', '', '2024-02-11 09:03:47', '2024-02-11 09:03:47', 2, 1),
(57, 7, 'CSAT1', 'option3', '', '', '', '2024-02-12 06:57:41', '2024-02-12 06:57:41', 1, 1),
(58, 7, 'Testing sur1', 'option3', '', '', '', '2024-02-12 10:36:20', '2024-02-12 10:36:20', 2, 1),
(59, 7, 'Survey 33', 'option2', '', '', '', '2024-02-23 08:41:37', '2024-02-23 08:41:37', 2, 1),
(60, 7, 'fdfdf', 'option2', '', '', '', '2024-02-23 23:19:08', '2024-02-23 23:19:08', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_02_01_080517_create_user_surveys_table', 2),
(7, '2024_02_03_085916_create_user_surveys_feedback_table', 3),
(8, '2024_02_05_050645_create_merchannts_table', 4),
(9, '2024_02_05_050701_create_questions_table', 5),
(10, '2024_02_05_050716_create_responses_table', 6),
(11, '2024_02_05_052348_create_survey_types_table', 7),
(12, '2024_02_05_054148_add_foreign_key_to_user_surveys', 8);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `questionId` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `surveyId` bigint UNSIGNED NOT NULL,
  `questionText` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mcqSubheading` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `questionType` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`questionId`),
  KEY `questions_surveyid_foreign` (`surveyId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`questionId`, `surveyId`, `questionText`, `mcqSubheading`, `questionType`, `created_at`, `updated_at`) VALUES
(1, 49, 'Survey Question', '', 'open-ended', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 45, 'Based on your last activity at [Company_name] , How likely you are to recommend [Company_name] to your friends and families?', '', 'open-ended', '2024-02-06 06:34:21', '2024-02-06 06:34:21'),
(3, 45, 'Which of the following Factors Influenced your answer the most?', '[[\"Restaurant Location\",\"Includes (Parking Lost,Accessibility)\"],[\"Restaurant Menu\",\"Includes (Diversity Options)\"],[\"Food Quality\",\"Includes (Food Quality, Presentation and Packaging)\"],[\"Restaurant Atmosphere\",\"Includes (Vibes, Comfortability & Quietnes\"],[\"Staff Behaviour\",\"Includes (Helpfullness,attitude)\"],[\"Other\",\"Write your own answer\"]]', 'MCQ', '2024-02-06 06:47:01', '2024-02-06 06:47:01'),
(6, 45, 'Which of the \"Restaurant Atmosphere\" Attributes Influenced your answer the most?', '[[\"Feeling & vibes\"],[\"Comfortability & Quiteness\"],[\"Cleanliness\"],[\"The interiors\"]]', 'MCQ', '2024-02-06 06:47:01', '2024-02-06 06:47:01'),
(7, 45, 'Could you elaborate on how the factor you chose influenced your evaluation?', '', 'open-ended', '2024-02-06 06:47:01', '2024-02-06 06:47:01'),
(8, 49, 'Could you elaborate on how the factor you chose influenced your evaluation?hthtrtr', '', 'open-ended', '2024-02-06 06:47:01', '2024-02-06 06:47:01'),
(9, 51, 'Based on your last activity at My Restaurant BMW , How likely you are to recommend My Restaurant BMW to your friends and families?', '[[\"\"]]', '', '2024-02-09 08:18:48', '2024-02-09 08:18:48'),
(10, 51, 'How likely you like our Restaurant.', '[[\"Average\"],[\" Best\"],[\" Superb\"]]', '', '2024-02-09 08:20:34', '2024-02-09 08:20:34'),
(11, 52, 'Based on your last activity at [Rest_name], How likely you are to recommend [Rest_name] to your friends and families?', '[[\"\"]]', '', '2024-02-09 08:25:31', '2024-02-09 08:25:31'),
(12, 53, 'Based on your last activity at [Rest_name], How likely you are to recommend [Rest_name] to your friends and families?', '[[\"\"]]', '', '2024-02-09 08:29:24', '2024-02-09 08:29:24'),
(13, 53, 'question', '[[\"option1\"],[\" option2\"]]', '', '2024-02-09 08:40:16', '2024-02-09 08:40:16'),
(14, 53, 'Question 2', '[[\"Op3\"]]', '', '2024-02-09 08:41:07', '2024-02-09 08:41:07'),
(15, 54, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', '[[\"\"]]', '', '2024-02-10 09:23:43', '2024-02-10 09:23:43'),
(16, 54, 'What are the fruits?', '[[\"Apple\"],[\" Banana\"],[\" Grapes\"]]', 'MCQ', '2024-02-10 09:24:16', '2024-02-10 09:24:16'),
(17, 54, 'What is the use of php?', '[[\"Coding\\nProgramming\"]]', 'MCQ', '2024-02-10 09:24:49', '2024-02-10 09:24:49'),
(18, 54, 'Describe yourself', NULL, 'Open Ended', '2024-02-10 09:26:29', '2024-02-10 09:26:29'),
(19, 55, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', NULL, 'Open Ended', '2024-02-11 08:58:21', '2024-02-11 08:58:21'),
(20, 55, 'Which is the capital of India?', '[[\"Delhi\"],[\" Mumbai\"],[\" Kolkata\"],[\" Chennai\"]]', 'MCQ', '2024-02-11 08:59:44', '2024-02-11 08:59:44'),
(21, 56, 'Based on your last activity at ABC , How likely you are to recommend ABC to your friends and families?', NULL, 'Open Ended', '2024-02-11 09:04:24', '2024-02-11 09:04:24'),
(22, 56, 'nnnnnnn', '[[\"mm\"],[\" bb\"]]', 'MCQ', '2024-02-11 09:04:47', '2024-02-11 09:04:47'),
(23, 56, 'jjjjjjjjjjjjjjjj', '[[\"iiii\"],[\" oooo\"]]', 'MCQ', '2024-02-11 09:05:20', '2024-02-11 09:05:20'),
(24, 56, 'ttttttttt', NULL, 'Open Ended', '2024-02-11 09:05:31', '2024-02-11 09:05:31'),
(25, 57, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', NULL, 'Open Ended', '2024-02-12 06:57:47', '2024-02-12 06:57:47'),
(26, 57, 'What is your name?', '[[\"Abc\"],[\" Xyz\"]]', 'MCQ', '2024-02-12 06:58:09', '2024-02-12 06:58:09'),
(27, 57, 'What are you doing?', '[[\"Playing\"],[\" Working\"]]', 'MCQ', '2024-02-12 06:58:39', '2024-02-12 06:58:39'),
(28, 57, 'Describe yourself', NULL, 'Open Ended', '2024-02-12 06:58:57', '2024-02-12 06:58:57'),
(29, 58, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', NULL, 'Open Ended', '2024-02-12 10:36:23', '2024-02-12 10:36:23'),
(30, 58, 'What is your title?', '[[\"MR.\"],[\" Mrs\"],[\" Miss\"]]', 'MCQ', '2024-02-12 10:36:46', '2024-02-12 10:36:46'),
(31, 58, 'What is your name?', '[[\"Rohit\"],[\" Kumar\"],[\" M\"]]', 'MCQ', '2024-02-12 10:37:13', '2024-02-12 10:37:13'),
(32, 58, 'Describe your thought', NULL, 'Open Ended', '2024-02-12 10:37:30', '2024-02-12 10:37:30'),
(33, 59, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', NULL, 'Open Ended', '2024-02-23 08:41:39', '2024-02-23 08:41:39'),
(34, 59, 'Welcome mcq', '[[\"opp1\"],[\" opp2\"],[\" opp3\"],[\" opp4\"]]', 'MCQ', '2024-02-23 08:42:00', '2024-02-23 08:42:00'),
(35, 59, 'mcq 2', '[[\"oppp1\"],[\" oppp2\"],[\" oppp3\"],[\" oppp4\"]]', 'MCQ', '2024-02-23 08:42:21', '2024-02-23 08:42:21'),
(36, 59, 'Open  ended', NULL, 'Open Ended', '2024-02-23 08:42:30', '2024-02-23 08:42:30'),
(37, 60, 'Based on your last activity at [Company_name], How likely you are to recommend [Company_name] to your friends and families?', NULL, 'Open Ended', '2024-02-23 23:19:12', '2024-02-23 23:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
CREATE TABLE IF NOT EXISTS `responses` (
  `responseId` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `surveyId` bigint UNSIGNED NOT NULL,
  `questionId` bigint UNSIGNED NOT NULL,
  `responseText` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numericResponse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`responseId`),
  KEY `responses_surveyid_foreign` (`surveyId`),
  KEY `responses_questionid_foreign` (`questionId`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `responses`
--

INSERT INTO `responses` (`responseId`, `surveyId`, `questionId`, `responseText`, `numericResponse`, `created_at`, `updated_at`) VALUES
(1, 49, 1, '', '06', '2024-02-06 05:00:26', '2024-02-06 05:00:26'),
(2, 49, 1, '', '06', '2024-02-06 05:03:37', '2024-02-06 05:03:37'),
(3, 45, 2, '', '03', '2024-02-06 05:06:47', '2024-02-06 05:06:47'),
(4, 45, 2, '', '08', '2024-02-06 06:07:00', '2024-02-06 06:07:00'),
(5, 45, 2, 'Testing', '06', '2024-02-06 06:08:38', '2024-02-06 06:08:38'),
(6, 49, 1, '', '08', '2024-02-06 06:43:38', '2024-02-06 06:43:38'),
(7, 45, 2, '', '01', '2024-02-06 07:28:48', '2024-02-06 07:28:48'),
(8, 45, 2, '', '02', '2024-02-06 07:30:00', '2024-02-06 07:30:00'),
(9, 45, 3, '', '08', '2024-02-06 07:30:01', '2024-02-06 07:30:01'),
(10, 45, 3, '', '08', '2024-03-07 07:30:01', '2024-02-06 07:30:01'),
(11, 45, 2, 'Coding Programming', '08', '2024-02-06 07:30:14', '2024-02-06 07:30:14'),
(12, 45, 3, '', '09', '2024-02-06 07:30:17', '2024-02-06 07:30:17'),
(13, 45, 2, '', '09', '2024-02-06 07:30:25', '2024-02-06 07:30:25'),
(14, 45, 2, 'Coding Programming', '09', '2024-02-06 07:30:35', '2024-02-06 07:30:35'),
(15, 45, 3, '', '09', '2024-02-06 07:30:38', '2024-02-06 07:30:38'),
(16, 45, 2, '', '09', '2024-02-06 07:30:57', '2024-02-06 07:30:57'),
(17, 45, 3, 'Coding Programming', '09', '2024-02-06 07:31:17', '2024-02-06 07:31:17'),
(18, 45, 2, '', '05', '2024-02-06 07:54:33', '2024-02-06 07:54:33'),
(19, 45, 2, '', '05', '2024-02-06 08:34:03', '2024-02-06 08:34:03'),
(20, 45, 2, '', '09', '2024-02-06 08:46:59', '2024-02-06 08:46:59'),
(21, 45, 3, 'Coding Programming', '09', '2024-02-06 08:47:00', '2024-02-06 08:47:00'),
(22, 45, 2, '', '09', '2024-02-06 08:47:04', '2024-02-06 08:47:04'),
(23, 45, 2, '', '09', '2024-02-06 08:47:05', '2024-02-06 08:47:05'),
(24, 45, 2, '', '04', '2024-02-07 01:34:23', '2024-02-07 01:34:23'),
(25, 45, 2, 'Test', '04', '2024-02-07 01:44:10', '2024-02-07 01:44:10'),
(26, 45, 2, '', '03', '2024-02-07 01:45:40', '2024-02-07 01:45:40'),
(27, 45, 2, '', '03', '2024-02-07 01:49:02', '2024-02-07 01:49:02'),
(28, 45, 3, '', '0', '2024-02-07 02:19:39', '2024-02-07 02:19:39'),
(29, 45, 3, 'Testtt', '0', '2024-02-07 02:20:56', '2024-02-07 02:20:56'),
(30, 45, 2, '', '01', '2024-02-07 02:29:39', '2024-02-07 02:29:39'),
(31, 45, 2, '', '06', '2024-02-07 03:16:55', '2024-02-07 03:16:55'),
(32, 45, 2, 'Coding Programming', '04', '2024-02-07 03:18:07', '2024-02-07 03:18:07'),
(33, 45, 2, 'Coding Programming', '04', '2024-02-07 03:41:42', '2024-02-07 03:41:42'),
(34, 45, 2, '', '02', '2024-02-07 03:56:35', '2024-02-07 03:56:35'),
(35, 45, 2, 'Coding Programming', '05', '2024-02-07 04:27:36', '2024-02-07 04:27:36'),
(36, 45, 2, '', '05', '2024-02-07 04:38:06', '2024-02-07 04:38:06'),
(37, 45, 2, 'Coding Programming', '05', '2024-02-07 05:28:42', '2024-02-07 05:28:42'),
(38, 45, 3, '', '0', '2024-02-07 05:29:10', '2024-02-07 05:29:10'),
(39, 45, 2, 'Coding Programming', '05', '2024-02-07 05:31:16', '2024-02-07 05:31:16'),
(40, 45, 3, '', '0', '2024-02-07 05:31:25', '2024-02-07 05:31:25'),
(41, 45, 2, '', '01', '2024-02-07 05:33:44', '2024-02-07 05:33:44'),
(42, 45, 3, 'Coding Programming', '0', '2024-02-07 05:34:06', '2024-02-07 05:34:06'),
(43, 45, 2, '', '05', '2024-02-07 05:34:51', '2024-02-07 05:34:51'),
(44, 45, 3, '', '0', '2024-02-07 05:35:04', '2024-02-07 05:35:04'),
(45, 54, 15, '', '05', '2024-02-10 09:27:10', '2024-02-10 09:27:10'),
(46, 54, 16, 'Apple', '0', '2024-02-10 09:27:46', '2024-02-10 09:27:46'),
(47, 54, 17, 'Coding\nProgramming', '0', '2024-04-24 09:27:50', '2024-02-10 09:27:50'),
(48, 54, 18, 'I am a web developer.', '0', '2024-02-10 09:28:06', '2024-02-10 09:28:06'),
(49, 55, 19, 'Null', '03', '2024-02-10 09:28:06', '2024-02-11 09:00:59'),
(50, 55, 20, 'Delhi', '0', '2024-04-19 09:28:06', '2024-02-11 09:01:03'),
(51, 55, 20, 'Chennai', '0', '2024-02-11 09:01:15', '2024-02-11 09:01:15'),
(52, 55, 19, 'Null', '07', '2024-02-11 09:01:25', '2024-02-11 09:01:25'),
(53, 55, 20, 'Delhi', '0', '2024-02-11 09:01:32', '2024-02-11 09:01:32'),
(54, 56, 21, 'Null', '05', '2024-02-11 09:06:10', '2024-02-11 09:06:10'),
(55, 56, 22, 'bb', '0', '2024-02-11 09:06:16', '2024-02-11 09:06:16'),
(56, 56, 23, 'oooo', '0', '2024-02-11 09:06:24', '2024-02-11 09:06:24'),
(57, 56, 24, 'mkmkmk', '0', '2024-02-11 09:06:39', '2024-02-11 09:06:39'),
(58, 57, 25, 'Null', '04', '2024-02-12 06:59:20', '2024-02-12 06:59:20'),
(59, 57, 26, 'Abc', '0', '2024-02-12 06:59:31', '2024-02-12 06:59:31'),
(60, 57, 27, 'Playing', '0', '2024-02-12 07:02:03', '2024-02-12 07:02:03'),
(61, 57, 26, 'Xyz', '0', '2024-02-12 07:12:50', '2024-02-12 07:12:50'),
(62, 57, 27, 'Working', '0', '2024-02-12 07:13:02', '2024-02-12 07:13:02'),
(63, 57, 28, 'Ok', '0', '2024-02-12 07:13:22', '2024-02-12 07:13:22'),
(64, 58, 29, 'Null', '07', '2024-02-12 10:38:02', '2024-02-12 10:38:02'),
(65, 58, 30, 'MR.', '0', '2024-02-12 10:38:06', '2024-02-12 10:38:06'),
(66, 58, 31, 'Rohit', '0', '2024-02-12 10:38:12', '2024-02-12 10:38:12'),
(67, 58, 32, 'Hello', '0', '2024-02-12 10:38:19', '2024-02-12 10:38:19'),
(68, 59, 33, 'Null', '09', '2024-02-23 08:42:42', '2024-02-23 08:42:42'),
(69, 59, 34, 'opp3', '0', '2024-02-23 08:42:46', '2024-02-23 08:42:46'),
(70, 59, 35, 'oppp2', '0', '2024-02-23 08:42:49', '2024-02-23 08:42:49'),
(71, 59, 36, 'Very nice', '0', '2024-02-23 08:42:55', '2024-02-23 08:42:55');

-- --------------------------------------------------------

--
-- Table structure for table `survey_types`
--

DROP TABLE IF EXISTS `survey_types`;
CREATE TABLE IF NOT EXISTS `survey_types` (
  `surveyTypeId` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `surveyTypeName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`surveyTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `survey_types`
--

INSERT INTO `survey_types` (`surveyTypeId`, `surveyTypeName`, `created_at`, `updated_at`) VALUES
(1, 'CSAT', NULL, NULL),
(2, 'NPS', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `merchantId` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `Merchant Id` (`merchantId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `merchantId`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(7, 1, 'My Coders', 'info@mycoders.in', NULL, '827ccb0eea8a706c4c34a16891f84e7b', NULL, NULL, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `merchant_surveys`
--
ALTER TABLE `merchant_surveys`
  ADD CONSTRAINT `merchantId` FOREIGN KEY (`merchantId`) REFERENCES `merchants` (`merchantId`),
  ADD CONSTRAINT `User Surveys` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_surveys_surveytypeid_foreign` FOREIGN KEY (`surveyTypeId`) REFERENCES `survey_types` (`surveyTypeId`);

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_surveyid_foreign` FOREIGN KEY (`surveyId`) REFERENCES `merchant_surveys` (`id`);

--
-- Constraints for table `responses`
--
ALTER TABLE `responses`
  ADD CONSTRAINT `responses_questionid_foreign` FOREIGN KEY (`questionId`) REFERENCES `questions` (`questionId`),
  ADD CONSTRAINT `responses_surveyid_foreign` FOREIGN KEY (`surveyId`) REFERENCES `merchant_surveys` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `Merchant Id` FOREIGN KEY (`merchantId`) REFERENCES `merchants` (`merchantId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
