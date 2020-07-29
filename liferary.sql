-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Jul 2020 pada 12.58
-- Versi server: 10.1.37-MariaDB
-- Versi PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liferary`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` text NOT NULL,
  `genre` int(11) NOT NULL,
  `author` varchar(60) NOT NULL,
  `picture` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `genre`, `author`, `picture`, `created_at`, `updated_at`) VALUES
(38, 'A Tale of Two Cities', 'Set in London and Paris before and during the French Revolution. The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris and his release to live in London with his daughter Lucie, whom he had never met. The story is set against the conditions that led up to the French Revolution and the Reign of Terror.', 3, 'Charles Dickens', 'http://192.168.56.1:8080/img/1589690054518_a_tale_of_two_cities.jpg', '2020-05-17 04:34:14', '2020-06-17 01:30:39'),
(39, 'Belajar mandiri', 'The book contains valuable life lessons about the values of independence. There are also tips and tricks for being an independent person. The book contains valuable life lessons about the values of independence. There are also tips and tricks for being an independent person. The book contains valuable life lessons about the values of independence. There are also tips and tricks for being an independent person.', 5, 'Agung Webe', 'http://192.168.56.1:8080/img/1589690089620_belajar_mandiri.jpg', '2020-05-17 04:34:49', '2020-06-14 03:55:36'),
(40, 'Cinta dalam Ikhlas', 'A book that tells the story of two couples who fight for love. They face various problems together in sincerity. A book that tells the story of two couples who fight for love. They face various problems together in sincerity. A book that tells the story of two couples who fight for love.', 4, 'Abay Adhitya', 'http://192.168.56.1:8080/img/1589690117857_cinta_dalam_ikhlas.jpg', '2020-05-17 04:35:17', '2020-06-14 03:56:34'),
(47, 'Dilan 1990', 'In 1990, Milea, her sister Airin, and their parents move from Jakarta to Bandung. Her father is an Army officer. On her way to the school, he met Dilan, a bad boy and motorbike gang leader who confidently says she will sit on his bike and he will be her boyfriend.', 4, 'Pidi Baiq', 'http://192.168.56.1:8080/img/1592105134809_1589690135773_dilan.jpeg', '2020-05-18 04:01:27', '2020-06-14 03:50:37'),
(55, 'Earth', 'Written in the past tense, the book\'s stated purpose is to serve as a Baedeker travel guide for an alien civilization that discovers Earth after humanity has died out, most likely by its own hands. As such, Earth (The Book) attempts to chronicle the history of the planet and the human race from the beginning to the present day, and also tries to explain human concepts and emotions such as \"love\" and \"work\" for its alien readers.', 2, 'Jon Stewart', 'http://192.168.56.1:8080/img/1592189164881_1589690160838_earth.jpg', '2020-06-14 03:54:28', '2020-06-15 02:46:04'),
(56, 'Futari no Hero', 'All Might is invited to a summer trip at \"I-Island\", a man-made island where the scientists of the world reside and perform research on Quirks, superpowers that 80% of the world\'s population has. He takes Izuku Midoriya as his guest and reminds him not to reveal to his good friend.', 3, 'Yosuke Kuroda', 'http://192.168.56.1:8080/img/1592107308231_fnh.jpg', '2020-06-14 04:01:48', '2020-06-14 04:02:30'),
(57, 'Game of Thrones', 'Upon the death of Lord Jon Arryn, the principal advisor to King Robert Baratheon, Robert recruits his childhood friend Eddard \"Ned\" Stark, now lord of the North, to replace Arryn as \"Hand of the King\", and to betroth his daughter Sansa to Robert\'s son Joffrey.', 3, 'George R. R. Martin', 'http://192.168.56.1:8080/img/1592107751587_AGameOfThrones.jpg', '2020-06-14 04:09:11', NULL),
(58, 'Haikyuu!!', 'unior high school student, Sh?y? Hinata, becomes obsessed with volleyball after catching a glimpse of Karasuno High School winning their game to qualify for Nationals on TV. Of short stature himself, Hinata is inspired by a player the commentators nickname \'The Little Giant\', Karasuno\'s short but talented wing spiker.', 2, 'Taku Kishimoto', 'http://192.168.56.1:8080/img/1592107939067_haikyuu.jpg', '2020-06-14 04:12:19', NULL),
(59, 'Insomnia', 'Since his wife died, Ralph Roberts has been having trouble sleeping. Each night he awakens a little earlier until he\'s barely sleeping at all. During his late night vigils and walks, he observes some strange things going on in Derry, Maine.', 3, 'Stephen King', 'http://192.168.56.1:8080/img/1592108172497_Insomnia.jpg', '2020-06-14 04:16:12', NULL),
(60, 'Last Nighto', 'Last Night is a story between two couple Last Night is a story between two coupleLast Night is a story between two coupleLast Night is a story between two coupleLast Night is a story between two coupleLast Night is a story between two coupleLast', 4, 'Adora Montminy', 'http://192.168.56.1:8080/img/1592186219973_aboutt.jpg', '2020-06-15 01:56:59', '2020-06-29 01:49:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `employes`
--

CREATE TABLE `employes` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `employes`
--

INSERT INTO `employes` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(7, '-', 'admin@mail.com', '$2b$10$6t7GDU/KOjA7MNuVQvefaeKhWo5xgxqqJ.gRiX5P3brSK5PsDzpvi', '', '2020-05-17 04:19:13', NULL),
(8, 'adm', 'adm@mail.com', '$2b$10$hgxrxJYF.E5inydJuTsw7OcAZJuqofkIVdGyu3i2IPnyVbXWgg7ee', 'admin', '2020-05-17 04:19:24', NULL),
(9, 'mod', 'mod@mail.com', '$2b$10$L8EdoceHUg6OhXflZ3npruBdiyRUeBkoPVXA9yWrtkqx4lLyY555q', '', '2020-05-17 04:19:35', NULL),
(11, 'Ronaldo', 'ronaldo@mail.com', '$2b$10$IaHnXgqfkmZeZvy64ToLnOYPm67xo.4nA.L3Sd6qWY2tDlaFEy54W', '', '2020-05-18 03:51:34', NULL),
(12, 'upin', 'upin@mail.com', '$2b$10$JTyFZXBWGQpUrltRFkBq8.V4832L/wXQUIXaksbD0jZfeJS70QsD.', '', '2020-05-19 02:29:28', NULL),
(13, 'ipin', 'ipin@mail.com', '$2b$10$bYBh6IHmPvHPYhjaB6jGKuMWG6bW1n33.AodOi0y5yH/Szz6Renkm', '', '2020-05-19 02:33:38', NULL),
(16, 'hayukk', 'hay@mail.com', 'undefined', '', '2020-06-08 21:16:10', '2020-06-25 01:46:30'),
(18, 'paijo', 'paijo@mail.com', '$2b$10$b7sAMji3F2fC.0HygYsi3uxMLUyhVdVLDlyHEyyvP4.LVlF5a30.y', '', '2020-06-08 23:47:25', NULL),
(19, 'sip', 'sip@mail.com', '$2b$10$hXaXHzwgJP7Bbn0gXSybKet8QeXl/2zFnnsxP/TVW3F/X3u8O2peC', '', '2020-06-08 23:51:24', NULL),
(20, 'asiap', 'grakcepat@mail.com', 'undefined', '', '2020-06-10 01:29:46', '2020-06-15 01:50:08'),
(22, 'happy', 'h@mail.com', '$2b$10$sz5XLgCQ7vzDWxXvlVgiMu0UMA0jWlSoAk2w1hKSmeOrELbrAeNt2', '', '2020-06-09 22:12:42', NULL),
(23, 'asep', 'asep@mail.com', '$2b$10$KbMoq02T/psllPUuNlKDL.jraOKZYp1BZ0tjjbPez8QUMzVa1Qsx6', '', '2020-06-28 05:05:38', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `genres`
--

INSERT INTO `genres` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Comedy', '2020-05-13 17:00:00', NULL),
(3, 'Fantasy', '2020-05-15 18:05:32', NULL),
(4, 'Actions', '2020-05-15 18:11:25', 2020),
(5, 'Education', '2020-05-17 01:42:27', NULL),
(6, 'Historycal', '2020-06-15 03:26:59', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `employee` varchar(50) NOT NULL,
  `date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `histories`
--

INSERT INTO `histories` (`id`, `transaction_id`, `title`, `user`, `employee`, `date`) VALUES
(1, 4, 'Haikyuu!!', 'Jono', 'adm', 'Monday, June 29, 2020 1:14 PM'),
(2, 5, 'Cinta dalam Ikhlas', 'Jono', 'adm', 'Monday, June 29, 2020 1:27 PM'),
(3, 6, 'A Tale of Two Cities', 'Billy', 'adm', 'Monday, June 29, 2020 1:27 PM'),
(4, 8, 'Futari no Hero', 'testing', 'adm', 'Sunday, July 12, 2020 7:14 PM'),
(5, 10, 'Dilan 1990', 'Ramos', 'adm', 'Monday, July 13, 2020 10:03 AM');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(120) NOT NULL,
  `created_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `reviews`
--

INSERT INTO `reviews` (`id`, `book_id`, `user_id`, `comment`, `created_at`) VALUES
(2, 39, 11, 'Baca buku ini rasanya kek mauu gengs', 'Wednesday, July 8, 2020 7:38 PM'),
(5, 60, 17, 'Bagus, sampai terharu', 'Thursday, July 9, 2020 9:39 AM'),
(6, 39, 11, 'Woah gilak sih ini', 'Thursday, July 9, 2020 3:13 PM'),
(8, 38, 10, 'Parah si gaess, bagus buanget gengssss', 'Thursday, July 9, 2020 3:30 PM'),
(11, 38, 22, ' ', 'Monday, July 13, 2020 10:15 AM'),
(12, 39, 10, ' ', 'Monday, July 13, 2020 5:33 PM');

-- --------------------------------------------------------

--
-- Struktur dari tabel `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `statuses`
--

INSERT INTO `statuses` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Borrowed', '2020-05-15 17:00:00', NULL),
(2, 'Penalty', '2020-05-16 17:00:00', NULL),
(3, 'Pending', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `picture` varchar(500) NOT NULL DEFAULT 'https://image.flaticon.com/icons/png/512/64/64495.png',
  `address` varchar(125) NOT NULL DEFAULT 'your adress',
  `age` int(3) NOT NULL DEFAULT '1',
  `password` varchar(60) NOT NULL,
  `created_at` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `picture`, `address`, `age`, `password`, `created_at`, `updated_at`) VALUES
(10, 'Jono', 'joni@mail.com', 'http://192.168.56.1:8080/img/1594553639228_IMG_20200711_233028.jpg', 'Wonosobo, Indonesia', 13, '$2b$10$ByPk3kDwUGPKdNg7tKU90O9kfJvGG0sOGh9GTk4QAuNW.8za7B4Qe', 'Saturday, June 13, 2020 1:41 PM', '2020-07-11 23:33:59'),
(11, 'Alay', 'alay@mail.com', 'https://image.flaticon.com/icons/png/512/64/64495.png', 'Wonosobo, Indonesia', 1, '$2b$10$ByPk3kDwUGPKdNg7tKU90O9kfJvGG0sOGh9GTk4QAuNW.8za7B4Qe', 'Sunday, June 14, 2020 3:00 PM', NULL),
(14, 'vinicius', 'vinicius@mail.com', '', '', 0, '$2b$10$NxPxxcHCzvQfrEleDXzUeeMJ22td5AIs/BJtE/01XG06b0rv2JuQ6', 'Monday, June 29, 2020 8:33 AM', NULL),
(15, 'Krisno', 'krisno@mail.com', '', '', 0, '$2b$10$mTCA8AXhNRCRrfpjDCe2QuUNXXIw3s5h0jAjDAMoEHEzuDC0Ai0Km', 'Monday, June 29, 2020 1:13 PM', NULL),
(16, 'billy', 'billy@mail.com', '', '', 0, '$2b$10$PGeOFQ.H8BF63/XLEGwpJOYSI6pH9aTzq4SPgy1/2oUOuzO1sBT46', 'Tuesday, July 7, 2020 7:47 PM', NULL),
(17, 'Ronaldowanto', 'ronaldowanto@gmail.com', '', '', 0, '$2b$10$5Wj8ulIM2jJaPHqng1hwIun98NUsB8srS4gjG3k5Plm3obAZXbzae', 'Thursday, July 9, 2020 9:38 AM', NULL),
(18, 'Wung', 'wungpuyuh@mail.com', 'https://image.flaticon.com/icons/png/512/64/64495.png', 'Wonosobo, Indonesia', 17, '$2b$10$IO1GwZUvAsGpDYGwith1d.RiUrgPNONxoXw7UW/K8oyqiqX9g94u6', 'Thursday, July 9, 2020 12:21 PM', '2020-07-08 21:26:16'),
(19, 'Raiso', 'raiso@mail.com', 'https://image.flaticon.com/icons/png/512/64/64495.png', 'your adress', 1, '$2b$10$hDasS3/bj/4sSKmknerCHOCpktHmtyqjvhUw9vGDXBKwdn8QIWbhi', 'Thursday, July 9, 2020 12:42 PM', NULL),
(20, 'Bale', 'bale@mail.com', 'http://localhost:8080/img/1594529697138_1576.jpg', 'wonosobo', 13, '$2b$10$Jw47i8YeYiiK0F4LEBcyg.gPWHzgxkBr6OskgMjWRaHOgMNHOxJ.G', 'Saturday, July 11, 2020 6:46 PM', '2020-07-12 04:54:57'),
(21, 'testing', 'testing@mail.com', 'http://192.168.56.1:8080/img/1594556602570_IMG_20200710_061731.jpg', 'Wonosobo, Jawa Tengah', 18, '$2b$10$0PS80aDb0zty1.OZHNzlaeOkRV.98Kes89tG3QRiAJepWaS4ulQAC', 'Sunday, July 12, 2020 6:55 PM', '2020-07-12 00:23:22'),
(22, 'Ramos', 'ramos@mail.com', 'http://192.168.56.1:8080/img/1594609642165_IMG_20200711_233028.jpg', 'Wonosobo, Indonesia', 18, '$2b$10$yX.V6h4yMG.G5MgTiqXrgu2UtcCiRN8ZwIhAwTLHECMTpfojyMK.e', 'Monday, July 13, 2020 9:54 AM', '2020-07-13 03:07:22');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT untuk tabel `employes`
--
ALTER TABLE `employes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
