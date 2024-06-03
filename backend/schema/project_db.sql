-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 05:42 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `batch` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2024-05-27-164457', 'App\\Database\\Migrations\\AddUser', 'default', 'App', 1716828680, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(100) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `payload` varchar(255) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `agent` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `loged` int(11) NOT NULL,
  `login_id` varchar(50) NOT NULL,
  `session_active_status` int(11) NOT NULL,
  `login` datetime NOT NULL,
  `logout` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `name`, `email`, `payload`, `ip`, `agent`, `role`, `loged`, `login_id`, `session_active_status`, `login`, `logout`) VALUES
('66585f96170f0', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNjc2NzAsImV4cCI6MTc0ODY5MDA3MCwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.aBAEtnpit88PiAchnMzvGCzx2hzPWbDFP1VtfM1S73U', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 11:14:30', '2024-05-30 11:23:01'),
('665861994fc4e', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNjgxODUsImV4cCI6MTc0ODY5MDU4NSwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.AbBlI94ZNwv36n7LGkU5_285ouStDmv5C82Gm7km3VA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 11:23:05', '2024-05-30 12:12:57'),
('66586d4c4625d', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzExODAsImV4cCI6MTc0ODY5MzU4MCwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.HMjmPnAtxUGV8cZvCYPMfpqpKMWBK-EU9JcoUYcvUyA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 12:13:00', '2024-05-30 12:13:22'),
('66586d661bd9f', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzEyMDYsImV4cCI6MTc0ODY5MzYwNiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.fXCvb4zgxkMVqc22d1C-QraZoc5fs8IMy4bHdjRfnko', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 12:13:26', '2024-05-30 12:18:38'),
('66586ea31d25a', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE1MjMsImV4cCI6MTc0ODY5MzkyMywiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9._61fU7Nlx2F9k6HNTY4YrNGe3WvrF0kH7tacnObQNwU', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 12:18:43', '2024-05-30 12:18:49'),
('66586eae553d4', '66562ab8eb2b4', 'Susithra', 'susithra@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE1MzQsImV4cCI6MTc0ODY5MzkzNCwiZW1haWwiOiJzdXNpdGhyYUBnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmFiOGViMmI0In0._VW8ZjHXiOkj6dT9RfLN8oMSKUQAB21p5e7DsvjsoRU', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'hr', 0, '66562ab8eb2b4', 0, '2024-05-30 12:18:54', '2024-05-30 12:19:03'),
('66586ec13323c', '66562b2eecc67', 'Sivakumar', 'sivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE1NTMsImV4cCI6MTc0ODY5Mzk1MywiZW1haWwiOiJzaXZha3VtYXIwN0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmIyZWVjYzY3In0._ztFOeuaEsQrdfipFIeQXH2jLo4G8vKzHeryIsUlFqc', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '66562b2eecc67', 0, '2024-05-30 12:19:13', '2024-05-30 12:19:50'),
('66586eeaec98e', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE1OTQsImV4cCI6MTc0ODY5Mzk5NCwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.zIkvw_I1wwEioVU2WdR31KrKOVZnkJ4RZM_scTPqBmw', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 12:19:54', '2024-05-30 12:20:02'),
('66586ef541f3d', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE2MDUsImV4cCI6MTc0ODY5NDAwNSwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.-zX8n0eqOfewHilVaDhxgsjMmc5c3xyj1dJzoRTlF40', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 12:20:05', '2024-05-30 12:20:27'),
('66586f1083057', '66562ab8eb2b4', 'Susithra', 'susithra@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE2MzIsImV4cCI6MTc0ODY5NDAzMiwiZW1haWwiOiJzdXNpdGhyYUBnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmFiOGViMmI0In0.auwjXEaIbDppxZlQEiCjaM2jwKjcU9rJvtAkWSXh1YQ', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'hr', 0, '66562ab8eb2b4', 0, '2024-05-30 12:20:32', '2024-05-30 12:20:43'),
('66586f1f2cae0', '66562b2eecc67', 'Sivakumar', 'sivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE2NDcsImV4cCI6MTc0ODY5NDA0NywiZW1haWwiOiJzaXZha3VtYXIwN0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmIyZWVjYzY3In0.9cQhG7bmyl2B7l7LXgfHebaadu8RnB_l1juzkQVTWrs', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '66562b2eecc67', 0, '2024-05-30 12:20:47', '2024-05-30 12:24:17'),
('66586ff621875', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzE4NjIsImV4cCI6MTc0ODY5NDI2MiwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.AWceuXaev1uCrDHBKeG4y23OtEhZi-kYbf5jKJG7ULY', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 12:24:22', '2024-05-30 12:24:32'),
('66588f24df594', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzk4NDQsImV4cCI6MTc0ODcwMjI0NCwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.XGO5Ofbm-z5EGspfEp8-bd4DlXm5vTcr6o2MX0ID0kE', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 1, '6656b4ed0e654', 1, '2024-05-30 14:37:24', '0000-00-00 00:00:00'),
('66588f24df598', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzk4NDQsImV4cCI6MTc0ODcwMjI0NCwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.XGO5Ofbm-z5EGspfEp8-bd4DlXm5vTcr6o2MX0ID0kE', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 1, '6656b4ed0e654', 1, '2024-05-30 14:37:24', '0000-00-00 00:00:00'),
('66588f539781c', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzk4OTEsImV4cCI6MTc0ODcwMjI5MSwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.QSkaVNTAvFTKav0pmKep1hLH8-QS0cmd4t8Nt55SEL8', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 14:38:11', '2024-05-30 14:38:20'),
('66588f5fb13d8', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwNzk5MDMsImV4cCI6MTc0ODcwMjMwMywiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.oFTpIfkILB3s1zCZ3t2pjAhtPW2iMSLH6fvzubgzY0Q', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 14:38:23', '2024-05-30 14:40:52'),
('665890b2b7933', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODAyNDIsImV4cCI6MTc0ODcwMjY0MiwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.li4DL4pSsnlbFqyyIWq849mlXWm5lfVHsZAfoapZaP4', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 14:44:02', '2024-05-30 14:47:41'),
('6658919158c76', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODA0NjUsImV4cCI6MTc0ODcwMjg2NSwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.2rfNd7Tqtrzjc7O5gohNk1baqJHxULrW-hVNDakZBiA', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 14:47:45', '2024-05-30 14:47:49'),
('6658919ab1b45', '66562ab8eb2b4', 'Susithra', 'susithra@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODA0NzQsImV4cCI6MTc0ODcwMjg3NCwiZW1haWwiOiJzdXNpdGhyYUBnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmFiOGViMmI0In0.A6DNWe5mJTvEsIvODuixxzrLh_DhOpgQQ5H47KmWnT8', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'hr', 0, '66562ab8eb2b4', 0, '2024-05-30 14:47:54', '2024-05-30 14:48:58'),
('665891dd8ebe7', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODA1NDEsImV4cCI6MTc0ODcwMjk0MSwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.U6LkQXycxRu2qHdKIRCtnJJKbAvE3L5NuVlll-L1m_A', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 14:49:01', '2024-05-30 14:49:12'),
('665892374aab7', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODA2MzEsImV4cCI6MTc0ODcwMzAzMSwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.ZpdusunOTQABcuuuykKnbez9uGLFhSrH9V1thUbCL3Q', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 14:50:31', '2024-05-30 14:51:04'),
('6658925c9554c', '66562ab8eb2b4', 'Susithra', 'susithra@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODA2NjgsImV4cCI6MTc0ODcwMzA2OCwiZW1haWwiOiJzdXNpdGhyYUBnbWFpbC5jb20iLCJ1c2VyaWQiOiI2NjU2MmFiOGViMmI0In0.5-uHUw8h7yVXUZJ6zgu1E9bKT-1yKGjyvzLEgOBREg4', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'hr', 0, '66562ab8eb2b4', 0, '2024-05-30 14:51:08', '2024-05-30 15:45:37'),
('66589f24e5e5e', '6656b4ed0e654', 'paul', 'paul@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODM5NDAsImV4cCI6MTc0ODcwNjM0MCwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInVzZXJpZCI6IjY2NTZiNGVkMGU2NTQifQ.ejlfVlsypz3S-FDb_wSolZk6yWAsd9i5IBnCOXy39Bc', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'em', 0, '6656b4ed0e654', 0, '2024-05-30 15:45:40', '2024-05-30 15:45:48'),
('66589f37b151d', '6654cfa880f5f', 'Pechimuthu Sivakumar', 'pechimuthusivakumar07@gmail.com', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTcwODM5NTksImV4cCI6MTc0ODcwNjM1OSwiZW1haWwiOiJwZWNoaW11dGh1c2l2YWt1bWFyMDdAZ21haWwuY29tIiwidXNlcmlkIjoiNjY1NGNmYTg4MGY1ZiJ9.RFGQOI7Os0waEEA4G_9kHUV7PDEtIxul5znTWZBcn1s', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0', 'rm', 0, '6654cfa880f5f', 0, '2024-05-30 15:45:59', '2024-05-30 15:46:05');

-- --------------------------------------------------------

--
-- Table structure for table `task_history`
--

CREATE TABLE `task_history` (
  `id` varchar(100) NOT NULL,
  `tid` varchar(100) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `mid` varchar(100) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `uid` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `name`, `phone`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, '6654cfa880f5f', 'Pechimuthu Sivakumar', '8754112038', 'pechimuthusivakumar07@gmail.com', '$2y$10$cJwkQE/5ZK57MVhVIJRM5O88jS.vcgj4yes.jw8iufrScjA1T15MK', 'rm', '2024-05-27 23:53:36', '2024-05-27 23:53:36'),
(2, '66562ab8eb2b4', 'Susithra', '9876543210', 'susithra@gmail.com', '$2y$10$cJwkQE/5ZK57MVhVIJRM5O88jS.vcgj4yes.jw8iufrScjA1T15MK', 'hr', '2024-05-29 00:34:24', '2024-05-29 00:34:24'),
(3, '66562b2eecc67', 'Sivakumar', '8765432190', 'sivakumar07@gmail.com', '$2y$10$t81xEBjEtr9.iIrm16Kf0.OBnMpQRXYr2Lulf7N43vBil5L9ZK02q', 'em', '2024-05-29 00:36:22', '2024-05-29 00:36:22'),
(4, '6656b4ed0e654', 'paul', '7094792554', 'paul@gmail.com', '$2y$10$3BVup8bEy2J7qd7AVYGxE.OW7ALT0t3altD.aotHMVMbUgBabqT2O', 'em', '2024-05-29 10:24:05', '2024-05-29 10:24:05'),
(5, '6657608d44d46', 'Sharma Yadev', '9876543210', 'yadev@gmail.com', '$2y$10$0f6J/wLHwiHRRWHj9UYeNOPd9S8nKXXeP2a.Y4Ww1DNpfeMhs0.oa', 'em', '2024-05-29 22:36:21', '2024-05-29 22:36:21');

-- --------------------------------------------------------

--
-- Table structure for table `user_tasks`
--

CREATE TABLE `user_tasks` (
  `id` varchar(100) NOT NULL,
  `task` varchar(50) NOT NULL,
  `duration` varchar(50) NOT NULL,
  `discription` text NOT NULL,
  `uid` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `mid` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `new_state` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tasks`
--

INSERT INTO `user_tasks` (`id`, `task`, `duration`, `discription`, `uid`, `status`, `remarks`, `mid`, `created_at`, `updated_at`, `new_state`) VALUES
('665861a9291a9', 'Task One', '4:00', '<p>Here’s a PHP one-liner to decode a JWT token. I thought of this while working with Google oAuth API which gives back a JWT. I came across this <a href=\"https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript\" rel=\"noopener noreferrer\" target=\"_blank\">stackoverflow question</a> solving the JavaScript side of things. However a PHP based solution comes in handy for server-side implementation.</p>', '6656b4ed0e654', 5, '', '6654cfa880f5f', '2024-05-30 11:23:21', '2024-05-30 14:52:29', ''),
('66586ee139c0d', 'Task Two', '4:00', '<p><strong>We will also need to check the validity of the token against a database table. I am using my own framework for this purpose, but you can also accomplish this by connecting to the database and running a query similar to the following:</strong></p>', '66562b2eecc67', 5, '', '6654cfa880f5f', '2024-05-30 12:19:45', '2024-05-30 14:52:25', ''),
('66586f00b56fa', 'Task Two', '6:00', '<p>We will also need to check the validity of the token against a database table. I am using my own framework for this purpose, but you can also accomplish this by connecting to the database and running a query similar to the following:</p>', '6656b4ed0e654', 5, '', '6654cfa880f5f', '2024-05-30 12:20:16', '2024-05-30 14:52:21', ''),
('66586f2dea477', 'My Task', '6:00', '<p>We will also need to check the validity of the token against a database table. I am using my own framework for this purpose, but you can also accomplish this by connecting to the database and running a query similar to the following:</p>', '66562b2eecc67', 3, '', '6654cfa880f5f', '2024-05-30 12:21:01', '2024-05-30 14:52:17', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`email`,`role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
