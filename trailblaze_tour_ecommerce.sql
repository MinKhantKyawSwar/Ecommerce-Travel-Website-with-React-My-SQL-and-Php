-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2025 at 01:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trailblaze_tour_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_on`
--

CREATE TABLE `add_on` (
  `add_on_id` int(11) NOT NULL,
  `add_on` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `add_on`
--

INSERT INTO `add_on` (`add_on_id`, `add_on`, `price`) VALUES
(1, 'flight seat upgrade', 50),
(2, 'pet allowance', 70),
(3, 'room upgrade', 70),
(4, 'meal upgrade', 30),
(5, 'flight upgrade, pet allowance', 120),
(6, 'room upgrade, pet allowance', 140),
(7, 'meal upgrade, pet allowance', 100),
(8, 'flight, meal upgrade, pet allowance', 150),
(9, 'flight, room upgrade, pet allowance', 190),
(10, 'meal, room upgrade, pet allowance', 170),
(11, 'No add on', 0);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `package` int(11) NOT NULL,
  `source_location` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `travel_date` date DEFAULT NULL,
  `payment_method` int(11) NOT NULL,
  `number_of_people` int(30) NOT NULL,
  `add_on` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `total_price` int(30) NOT NULL,
  `booking_status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `user`, `package`, `source_location`, `booking_date`, `travel_date`, `payment_method`, `number_of_people`, `add_on`, `discount`, `total_price`, `booking_status`) VALUES
(1, 3, 22, 22, '2024-12-15', '2025-02-12', 1, 1, 8, 1, 764, 'approved'),
(2, 9, 22, 166, '2024-12-16', '2025-02-13', 1, 1, 7, 2, 629, 'approved'),
(3, 9, 19, 87, '2024-12-19', '2025-02-12', 1, 1, 7, 3, 569, 'approved'),
(4, 6, 19, 43, '2025-01-01', '2025-02-12', 1, 1, 8, 2, 674, 'approved'),
(5, 28, 23, 22, '2025-01-08', '2025-02-08', 1, 1, 4, 1, 300, 'approved'),
(6, 6, 22, 166, '2025-01-08', '2025-02-13', 1, 4, 4, 3, 2320, 'approved'),
(7, 2, 22, 1, '2025-01-08', '2025-02-07', 1, 1, 8, 1, 764, 'approved'),
(8, 7, 22, 166, '2025-01-10', '2025-02-13', 1, 1, 8, 2, 135, 'approved'),
(9, 4, 28, 166, '2025-01-10', '2025-02-14', 1, 2, 9, 1, 342, 'approved'),
(10, 8, 32, 166, '2025-01-10', '2025-02-06', 2, 2, 10, 3, 1081, 'approved'),
(11, 20, 37, 166, '2025-01-13', '2025-02-07', 2, 2, 1, 3, 2943, 'denied'),
(12, 11, 39, 166, '2025-01-13', '2025-02-14', 1, 1, 8, 1, 1304, 'approved'),
(13, 12, 26, 166, '2025-01-13', '2025-02-14', 1, 1, 9, 2, 530, 'approved'),
(14, 12, 38, 14, '2025-01-02', '2025-02-27', 2, 1, 7, 2, 1099, 'approved'),
(15, 2, 42, 166, '2025-01-18', '2025-03-14', 1, 1, 5, 2, 1367, 'approved'),
(16, 2, 36, 166, '2025-01-18', '2025-02-21', 1, 1, 4, 1, 566, 'approved'),
(17, 13, 28, 166, '2025-01-18', '2025-02-14', 2, 2, 4, 1, 1492, 'approved'),
(18, 13, 20, 62, '2025-01-18', '2025-02-28', 1, 1, 4, 2, 836, 'approved'),
(19, 14, 32, 166, '2025-01-18', '2025-02-13', 1, 1, 9, 1, 530, 'approved'),
(20, 14, 24, 173, '2025-01-18', '2025-01-25', 1, 1, 4, 1, 1376, 'approved'),
(21, 14, 26, 1, '2025-01-18', '2025-02-18', 1, 1, 7, 2, 539, 'approved'),
(22, 14, 19, 5, '2025-01-18', '2025-02-20', 1, 1, 6, 1, 1115, 'approved'),
(23, 14, 38, 166, '2025-01-18', '2025-02-22', 1, 1, 8, 1, 1124, 'approved'),
(24, 3, 38, 166, '2025-01-21', '2025-02-22', 1, 1, 5, 2, 1097, 'approved'),
(25, 3, 44, 166, '2025-01-21', '2025-03-21', 1, 1, 5, 3, 778, 'pending'),
(36, 12, 24, 161, '2025-02-11', '2025-02-07', 1, 1, 10, 1, 620, 'approved'),
(37, 38, 19, 161, '2025-02-07', '2025-02-10', 2, 1, 11, 2, 726, 'approved'),
(38, 52, 22, 161, '2025-02-10', '2025-02-14', 1, 1, 7, 1, 800, 'approved'),
(39, 28, 30, 161, '2025-02-13', '2025-02-11', 2, 1, 9, 2, 1000, 'approved'),
(40, 67, 35, 161, '2025-02-07', '2025-02-09', 1, 1, 6, 1, 620, 'approved'),
(41, 59, 28, 161, '2025-02-09', '2025-02-10', 1, 1, 8, 1, 726, 'approved'),
(42, 74, 31, 161, '2025-02-07', '2025-02-07', 2, 1, 4, 2, 800, 'approved'),
(43, 82, 33, 161, '2025-02-10', '2025-02-14', 2, 1, 3, 1, 726, 'approved'),
(44, 95, 27, 161, '2025-02-08', '2025-02-12', 1, 1, 5, 2, 1000, 'approved'),
(45, 101, 40, 161, '2025-02-14', '2025-02-13', 1, 1, 2, 2, 726, 'approved'),
(46, 3, 22, 166, '2025-01-23', '2025-02-13', 2, 4, 10, 1, 2768, 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Adventure'),
(2, 'Hiking'),
(3, 'Nature'),
(4, 'Urban Exploration'),
(5, 'Wildlife & Nature Trails'),
(6, 'Rural Exploration'),
(7, 'Water Adventures'),
(8, 'Historical Trekking'),
(9, 'Scenary Photography'),
(10, 'Caving & Spelunking'),
(11, 'Cultural Hiking Tours');

-- --------------------------------------------------------

--
-- Table structure for table `destination`
--

CREATE TABLE `destination` (
  `destination_id` int(11) NOT NULL,
  `location` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `category` int(11) NOT NULL,
  `accommodation` varchar(255) NOT NULL,
  `destination_image` varchar(300) NOT NULL,
  `destination_second_image` varchar(255) NOT NULL,
  `destination_third_image` varchar(255) NOT NULL,
  `accommodation_image` varchar(255) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destination`
--

INSERT INTO `destination` (`destination_id`, `location`, `description`, `category`, `accommodation`, `destination_image`, `destination_second_image`, `destination_third_image`, `accommodation_image`, `rating`) VALUES
(1, 166, 'This  is a 5-day, 4-night immersive experience designed for those seeking both cultural insights and outdoor adventure in Myanmar’s largest city. This package offers a balance of urban exploration, historical landmarks, nature treks, and wildlife encounters.  Starting with a deep dive into Yangon’s rich heritage, you\'ll visit iconic sites like the Shwedagon and Sule Pagodas, followed by a cultural evening at the bustling Bogyoke Aung San Market. The second day takes you on a nature trek through ', 9, 'Yangon Hotel', 'pictures/destination_image/6775171194762_Yangon snapshot iso.jpg', 'pictures/destination_image/6775171194768_banner-yangon.jpg', 'pictures/destination_image/6775171194769_yangon.jpg', 'pictures/accommodation/677517119476a_yangon-hotel.jpg', 3.7),
(2, 168, 'Bagan is an ancient city located in the Mandalay Region of Myanmar, famous for its stunning archaeological site and historical significance. It was once the capital of the Pagan Kingdom from the 9th to the 13th centuries and is home to over 2,000 temples, pagodas, and stupas spread across a vast plain. Bagan is renowned for its breathtaking sunrise and sunset views, where thousands of ancient structures rise from the misty plains, creating a magical, otherworldly atmosphere. The city is a UNESCO', 4, '4 star hotel', 'pictures/destination_image/6775200967fef_bagan2.jpg', 'pictures/destination_image/6775200967ff2_bagan.jpg', 'pictures/destination_image/6775200967ff3_bagan3.jpg', 'pictures/accommodation/6775200967ff4_338773_16100417450047364128.jpg', 5),
(3, 171, 'Paris, the capital of France, is a timeless symbol of romance, culture, and elegance. Known as the \"City of Lights,\" it captivates visitors with its iconic landmarks, world-class art, and vibrant atmosphere. The Eiffel Tower, Notre-Dame Cathedral, and the Arc de Triomphe stand as enduring symbols of Paris’s rich history and architectural grandeur.\r\n\r\nThe city is a hub for art and culture, home to renowned museums like the Louvre, housing the Mona Lisa, and the Musée d\'Orsay, showcasing Impressio', 4, 'Boutique Hotels', 'pictures/destination_image/67755ec31c363_paris2.jpg', 'pictures/destination_image/67755ec31c701_Large-Arc-de-Triomphe-at-sunrise-Paris-France-1277179412.jpg', 'pictures/destination_image/67755ec31c704_paros.jpg', 'pictures/accommodation/67755ec31c706_paris.jpg', 4.3),
(4, 61, 'Tokyo, the capital city of Japan, is a bustling metropolis that beautifully blends modern innovation with deep-rooted traditions. Known for its towering skyscrapers, neon lights, and vibrant nightlife, Tokyo is also a city where centuries-old temples, serene gardens, and traditional tea houses coexist with futuristic technology and fashion.\r\n\r\nAt the heart of Tokyo is its diverse districts, each offering something unique. Shibuya and Shinjuku are famous for their busy streets, shopping, and ente', 3, '4 star hotel', 'pictures/destination_image/6775851043cb7_japan1.jpg', 'pictures/destination_image/6775851043cbc_japan2.jpg', 'pictures/destination_image/6775851043cbd_japan3.jpg', 'pictures/accommodation/6775851043cbe_paris_activities.jpg', 3),
(5, 172, 'The Maldives is a tropical paradise located in the South Asia region, specifically in the Indian Ocean. It is situated southwest of Sri Lanka and India. Geographically, the Maldives is made up of 26 atolls consisting of over 1,000 coral islands. The country is renowned for its stunning beaches, crystal-clear waters, vibrant coral reefs, and luxury resorts.', 7, 'Resorts', 'pictures/destination_image/677d48113d4d1_meldives3.jpg', 'pictures/destination_image/677d48113d4d5_meldives2.jpg', 'pictures/destination_image/677d48113d4d6_meldives.jpg', 'pictures/accommodation/677d48113d4d7_meldives_accommodation.jpg', 4.3),
(6, 101, 'Sydney, Australia\'s largest city, is a vibrant destination known for its iconic landmarks, stunning beaches, and multicultural vibe. Nestled along the sparkling waters of Sydney Harbour, the city offers a blend of natural beauty and urban sophistication, making it a must-visit for travelers worldwide.', 9, '4 star hotel', 'pictures/destination_image/67808b209594d_sydney2.jpg', 'pictures/destination_image/67808b209594f_Sydney_Opera_House_and_Harbour_Bridge_Dusk_(2)_2019-06-21.jpg', 'pictures/destination_image/67808b2095950_sydney3.jpg', 'pictures/accommodation/67808b2095951_sydney facilities.jpg', 4.8),
(7, 45, 'Rome, the capital of Italy, is a living museum and a timeless blend of ancient history, stunning architecture, and vibrant culture. Known as the \"Eternal City,\" it has captivated travelers for centuries with its iconic landmarks, rich heritage, and culinary delights. From the grandeur of the Colosseum to the charm of cobblestone streets, Rome offers an unforgettable journey through time.', 4, '4 star hotel', 'pictures/destination_image/67809bbc94d17_1_gfzxEKbwzFDI8L-h2FQSrw.jpg', 'pictures/destination_image/67809bbc94d1b_Captura-de-pantalla-2023-10-04-a-las-11.42.46.jpg', 'pictures/destination_image/67809bbc94d1c_Iconic Landmarks in Rome_original.jpg', 'pictures/accommodation/67809bbc94d1d_rome accommodation.jpg', 3.7),
(8, 174, 'Phuket, Thailand\'s largest island, is a tropical paradise renowned for its beautiful beaches, vibrant nightlife, and rich cultural heritage. Nestled in the Andaman Sea, Phuket offers an irresistible mix of relaxation and adventure. Whether you\'re lounging on white sandy beaches, exploring hidden coves, or immersing yourself in Thai culture, Phuket has something for everyone.', 7, 'beachfront resort', 'pictures/destination_image/67809fffef9e5_Phuket_header.jpg', 'pictures/destination_image/67809fffef9e4_phuket 2.jpg', 'pictures/destination_image/67809fffef9e0_phuket3.jpg', 'pictures/accommodation/67809fffef9e6_phuket accommodation.jpg', 3.5),
(9, 175, 'Dubai, located in the United Arab Emirates, is a city known for its futuristic skyline, luxury lifestyle, and desert adventures. It’s a blend of modernity and tradition, offering world-class attractions, shopping, and cultural experiences. Famous landmarks include the Burj Khalifa, the tallest building in the world, and the luxurious Burj Al Arab. Dubai is also home to sprawling malls, pristine beaches, thrilling desert safaris, and vibrant nightlife. Whether you’re exploring the historic Al Fah', 4, 'Royal Hotel', 'pictures/destination_image/67847b980aba0_dubai2.jpg', 'pictures/destination_image/67847b980aba3_dubai3.jpg', 'pictures/destination_image/67847b980aba4_dubai.jpg', 'pictures/accommodation/67847b980aba5_dubai facilitiesAtlantis-The-Royal.jpg', 0),
(10, 72, 'Singapore, fondly known as the Lion City, is a vibrant metropolis that blends rich cultural heritage with cutting-edge modernity. This city-state is renowned for its stunning skyline, lush greenery, and bustling neighborhoods, making it a top destination for travelers of all interests.', 4, '4 star hotel', 'pictures/destination_image/678491de67e32_singapore3.jpg', 'pictures/destination_image/678491de67e30_singapore.jpg', 'pictures/destination_image/678491de67e2d_singapore2.jpg', 'pictures/accommodation/678491de67e33_Singapore-Hotels.jpg', 0),
(11, 54, 'Sweden is a land of stunning landscapes, vibrant cities, and rich history. From the northern lights in Lapland to the charming streets of Stockholm, our Sweden packages are designed to offer unforgettable experiences for every traveler.', 9, '4 star hotels', 'pictures/destination_image/678df893497bc_stockholm1.png', 'pictures/destination_image/678df893497c2_stockholm3.png', 'pictures/destination_image/678df893497c3_stockholm2.png', 'pictures/accommodation/678df893497c4_stockholm_accommodation.png', 0),
(12, 176, 'Nepal is a picturesque landlocked country located in South Asia, bordered by India to the south, east, and west, and China (Tibet Autonomous Region) to the north.Nepal is renowned for its stunning natural landscapes, from the lowland Terai plains to the towering Himalayas, including Mount Everest (Sagarmatha), the world’s highest peak.', 2, 'Tents or wooden house', 'pictures/destination_image/678dfb8f6c52b_everest_2.png', 'pictures/destination_image/678dfb8f6c52f_everest1.png', 'pictures/destination_image/678dfb8f6c531_everest_3.png', 'pictures/accommodation/678dfb8f6c533_everest accommodation.png', 5),
(13, 46, 'Amsterdam, the capital of the Netherlands, is renowned for its picturesque canals, rich history, and vibrant cultural scene. Visitors can explore iconic museums, historic neighborhoods, and enjoy the city\'s lively atmosphere.', 4, '4 star hotel', 'pictures/destination_image/679139acf342d_Amsterdam3.png', 'pictures/destination_image/679139acf3431_Amsterdam2.png', 'pictures/destination_image/679139acf3432_Amsterdam1.png', 'pictures/accommodation/679139acf3433_Amsterdam_accommodation.png', 0),
(14, 63, 'Beijing, the capital of China, is a vibrant city blending ancient history with modern marvels. It\'s known for its iconic landmarks, bustling markets, and rich cultural experiences. Visitors can explore historical treasures like the Great Wall, Forbidden City, and Temple of Heaven, or dive into modern attractions, thriving street food scenes, and cutting-edge architecture.', 11, '5 star hotel', 'pictures/destination_image/6791bd0e60f15_bejing.png', 'pictures/destination_image/6791bd0e60f19_bejing_2.png', 'pictures/destination_image/6791bd0e60f1a_bejing_3.png', 'pictures/accommodation/6791bd0e60f1b_beijing_facilities.png', 0),
(15, 81, 'Egypt, the \"Land of Pharaohs,\" is a country steeped in history and mystery. From the colossal Pyramids of Giza and the Great Sphinx to the tranquil Nile River and vibrant bazaars of Cairo, Egypt offers a journey into the past like no other. Visitors can explore ancient temples, desert landscapes, and the warm waters of the Red Sea, making it a perfect destination for history buffs, adventurers, and beach lovers alike.', 8, '4 star hotel', 'pictures/destination_image/679249a20c76c_giza_3.png', 'pictures/destination_image/679249a20c76f_giza_2.png', 'pictures/destination_image/679249a20c770_giza_1.png', 'pictures/accommodation/679249a20c771_giza_accommodation.png', 0),
(16, 102, 'Melbourne, Australia\'s cultural capital, is renowned for its vibrant arts scene, diverse culinary offerings, and dynamic sports culture. The city boasts a rich tapestry of experiences, from exploring its iconic laneways adorned with street art to enjoying performances at the Arts Centre Melbourne. Visitors can immerse themselves in the bustling atmosphere of Queen Victoria Market, stroll through the picturesque Royal Botanic Gardens, or attend world-class sporting events at the Melbourne Cricket', 9, '4 star hotel', 'pictures/destination_image/679254aebd4f9_melbourne_1.png', 'pictures/destination_image/679254aebd4fc_melbourne_3.png', 'pictures/destination_image/679254aebd4fd_melbourne_2.png', 'pictures/accommodation/679254aebd4fe_melbourne_accommodation.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discount_id` int(11) NOT NULL,
  `discount_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `percentage` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`discount_id`, `discount_name`, `description`, `percentage`, `start_date`, `end_date`) VALUES
(1, 'TRABLAZER2025', '10% discount for 2025', 10, '2024-01-10', '2024-12-10'),
(2, 'FUNTOBLAZE!', 'for First time purchaser only', 10, '2024-01-10', '2024-01-30'),
(3, 'TRAILBLAZE!', 'for january', 5, '0000-00-00', '0000-00-00'),
(4, 'no discount', 'just no discount', 0, '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_destinations`
--

CREATE TABLE `favorite_destinations` (
  `favorite_destination_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `destination` int(11) NOT NULL,
  `saved_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `region` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `city`, `country`, `region`) VALUES
(1, 'New York', 'United States', 1),
(2, 'Los Angeles', 'United States', 1),
(3, 'Toronto', 'Canada', 1),
(4, 'Vancouver', 'Canada', 1),
(5, 'Mexico City', 'Mexico', 1),
(6, 'Monterrey', 'Mexico', 1),
(7, 'Chicago', 'United States', 1),
(8, 'Miami', 'United States', 1),
(9, 'Atlanta', 'United States', 1),
(10, 'Boston', 'United States', 1),
(11, 'Montreal', 'Canada', 1),
(12, 'Houston', 'United States', 1),
(13, 'Philadelphia', 'United States', 1),
(14, 'Phoenix', 'United States', 1),
(15, 'San Francisco', 'United States', 1),
(16, 'Seattle', 'United States', 1),
(17, 'Calgary', 'Canada', 1),
(18, 'Denver', 'United States', 1),
(19, 'Las Vegas', 'United States', 1),
(20, 'Washington, D.C.', 'United States', 1),
(21, 'Buenos Aires', 'Argentina', 2),
(22, 'Sao Paulo', 'Brazil', 2),
(23, 'Rio de Janeiro', 'Brazil', 2),
(24, 'Lima', 'Peru', 2),
(25, 'Bogota', 'Colombia', 2),
(26, 'Quito', 'Ecuador', 2),
(27, 'Montevideo', 'Uruguay', 2),
(28, 'Caracas', 'Venezuela', 2),
(29, 'La Paz', 'Bolivia', 2),
(30, 'Asuncion', 'Paraguay', 2),
(31, 'Salvador', 'Brazil', 2),
(32, 'Brasilia', 'Brazil', 2),
(33, 'Cali', 'Colombia', 2),
(34, 'Medellin', 'Colombia', 2),
(35, 'Maracaibo', 'Venezuela', 2),
(36, 'Guayaquil', 'Ecuador', 2),
(37, 'Valparaiso', 'Chile', 2),
(38, 'Cordoba', 'Argentina', 2),
(39, 'Santa Cruz', 'Bolivia', 2),
(40, 'Fortaleza', 'Brazil', 2),
(41, 'Paris', 'France', 3),
(42, 'London', 'United Kingdom', 3),
(43, 'Berlin', 'Germany', 3),
(44, 'Madrid', 'Spain', 3),
(45, 'Rome', 'Italy', 3),
(46, 'Amsterdam', 'Netherlands', 3),
(47, 'Brussels', 'Belgium', 3),
(48, 'Vienna', 'Austria', 3),
(49, 'Prague', 'Czech Republic', 3),
(50, 'Warsaw', 'Poland', 3),
(51, 'Budapest', 'Hungary', 3),
(52, 'Dublin', 'Ireland', 3),
(53, 'Copenhagen', 'Denmark', 3),
(54, 'Stockholm', 'Sweden', 3),
(55, 'Oslo', 'Norway', 3),
(56, 'Helsinki', 'Finland', 3),
(57, 'Lisbon', 'Portugal', 3),
(58, 'Zurich', 'Switzerland', 3),
(59, 'Milan', 'Italy', 3),
(60, 'Barcelona', 'Spain', 3),
(61, 'Tokyo', 'Japan', 4),
(62, 'Seoul', 'South Korea', 4),
(63, 'Beijing', 'China', 4),
(64, 'Shanghai', 'China', 4),
(65, 'Bangkok', 'Thailand', 4),
(66, 'Manila', 'Philippines', 4),
(67, 'Jakarta', 'Indonesia', 4),
(68, 'Kuala Lumpur', 'Malaysia', 4),
(69, 'Hanoi', 'Vietnam', 4),
(70, 'New Delhi', 'India', 4),
(71, 'Mumbai', 'India', 4),
(72, 'Singapore', 'Singapore', 4),
(73, 'Islamabad', 'Pakistan', 4),
(74, 'Dhaka', 'Bangladesh', 4),
(75, 'Yangon', 'Myanmar', 4),
(76, 'Taipei', 'Taiwan', 4),
(77, 'Hong Kong', 'China', 4),
(78, 'Colombo', 'Sri Lanka', 4),
(79, 'Kathmandu', 'Nepal', 4),
(80, 'Ulaanbaatar', 'Mongolia', 4),
(81, 'Cairo', 'Egypt', 5),
(82, 'Lagos', 'Nigeria', 5),
(83, 'Nairobi', 'Kenya', 5),
(84, 'Cape Town', 'South Africa', 5),
(85, 'Johannesburg', 'South Africa', 5),
(86, 'Algiers', 'Algeria', 5),
(87, 'Accra', 'Ghana', 5),
(88, 'Addis Ababa', 'Ethiopia', 5),
(89, 'Dar es Salaam', 'Tanzania', 5),
(90, 'Casablanca', 'Morocco', 5),
(91, 'Rabat', 'Morocco', 5),
(92, 'Tunis', 'Tunisia', 5),
(93, 'Kampala', 'Uganda', 5),
(94, 'Harare', 'Zimbabwe', 5),
(95, 'Luanda', 'Angola', 5),
(96, 'Dakar', 'Senegal', 5),
(97, 'Bamako', 'Mali', 5),
(98, 'Kinshasa', 'Congo (DRC)', 5),
(99, 'Yaoundé', 'Cameroon', 5),
(100, 'Maputo', 'Mozambique', 5),
(101, 'Sydney', 'Australia', 6),
(102, 'Melbourne', 'Australia', 6),
(103, 'Brisbane', 'Australia', 6),
(104, 'Perth', 'Australia', 6),
(105, 'Adelaide', 'Australia', 6),
(106, 'Hobart', 'Australia', 6),
(107, 'Darwin', 'Australia', 6),
(108, 'Canberra', 'Australia', 6),
(109, 'Gold Coast', 'Australia', 6),
(110, 'Cairns', 'Australia', 6),
(111, 'Newcastle', 'Australia', 6),
(112, 'Wollongong', 'Australia', 6),
(113, 'Geelong', 'Australia', 6),
(114, 'Townsville', 'Australia', 6),
(115, 'Launceston', 'Australia', 6),
(116, 'Alice Springs', 'Australia', 6),
(117, 'Broome', 'Australia', 6),
(118, 'Bendigo', 'Australia', 6),
(119, 'Ballarat', 'Australia', 6),
(120, 'Toowoomba', 'Australia', 6),
(121, 'McMurdo Station', 'Antarctica', 7),
(122, 'Amundsen-Scott South Pole Station', 'Antarctica', 7),
(123, 'Palmer Station', 'Antarctica', 7),
(124, 'Rothera Research Station', 'Antarctica', 7),
(125, 'Casey Station', 'Antarctica', 7),
(126, 'Davis Station', 'Antarctica', 7),
(127, 'Mawson Station', 'Antarctica', 7),
(128, 'Vostok Station', 'Antarctica', 7),
(129, 'Concordia Station', 'Antarctica', 7),
(130, 'Troll Station', 'Antarctica', 7),
(131, 'Neumayer Station', 'Antarctica', 7),
(132, 'Scott Base', 'Antarctica', 7),
(133, 'Signy Research Station', 'Antarctica', 7),
(134, 'Halley Research Station', 'Antarctica', 7),
(135, 'Princess Elisabeth Station', 'Antarctica', 7),
(136, 'Great Wall Station', 'Antarctica', 7),
(137, 'Zhongshan Station', 'Antarctica', 7),
(138, 'Showa Station', 'Antarctica', 7),
(139, 'Aboa Station', 'Antarctica', 7),
(140, 'Bernardo O’Higgins Station', 'Antarctica', 7),
(141, 'Auckland', 'New Zealand', 8),
(142, 'Wellington', 'New Zealand', 8),
(143, 'Christchurch', 'New Zealand', 8),
(144, 'Suva', 'Fiji', 8),
(145, 'Nadi', 'Fiji', 8),
(146, 'Apia', 'Samoa', 8),
(147, 'Pago Pago', 'American Samoa', 8),
(148, 'Port Moresby', 'Papua New Guinea', 8),
(149, 'Honiara', 'Solomon Islands', 8),
(150, 'Nouméa', 'New Caledonia', 8),
(151, 'Papeete', 'French Polynesia', 8),
(152, 'Nukuʻalofa', 'Tonga', 8),
(153, 'Funafuti', 'Tuvalu', 8),
(154, 'Majuro', 'Marshall Islands', 8),
(155, 'Palikir', 'Micronesia', 8),
(156, 'Koror', 'Palau', 8),
(157, 'Yaren', 'Nauru', 8),
(158, 'Port Vila', 'Vanuatu', 8),
(159, 'Tarawa', 'Kiribati', 8),
(160, 'Rarotonga', 'Cook Islands', 8),
(161, 'Yangon', 'Myanmar (Burma)', 2),
(165, 'Mandalay', 'Myanmar (Burma)', 4),
(166, 'Yangon', 'Myanmar (Burma)', 4),
(167, 'Altanta', 'United States', 1),
(168, 'Bagan', 'Myanmar (Burma)', 4),
(169, 'Buston', 'United States', 1),
(170, 'Maracaibo', 'Benezuela', 2),
(171, 'Paris', 'France', 3),
(172, 'Malé', 'Meldives', 4),
(173, 'Port Vila', 'Vanuatu', 4),
(174, 'Phuket', 'Thailand', 4),
(175, 'Dubai', 'United Arab Emirate', 4),
(176, 'Namche Bazaa', 'nepal', 4),
(177, 'New York', 'United States', 4);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `message` text NOT NULL,
  `noti_status` enum('unread','read') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user`, `message`, `noti_status`, `created_at`, `updated_at`) VALUES
(11, 14, 'Payment is successful and your booking is waiting for admin approval', 'read', '2025-01-19 04:36:02', '2025-01-18 20:13:41'),
(12, 14, 'Payment is successful and your booking is waiting for admin approval', 'read', '2025-01-19 04:42:22', '2025-01-18 20:13:42'),
(20, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:00:28', '2025-01-18 20:00:55'),
(21, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:00:30', '2025-01-18 20:13:43'),
(22, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:00:30', '2025-01-18 20:22:03'),
(23, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:00:31', '2025-01-18 20:29:57'),
(24, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:00:31', '2025-01-18 20:34:48'),
(28, 14, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-19 05:32:33', '2025-01-18 20:33:58'),
(69, 3, 'Payment is successful and your booking is waiting for admin approval', 'read', '2025-01-23 13:33:54', '2025-01-23 04:34:00'),
(70, 1, 'A user books and waiting for your approval. Please check transactions from the admin panel.', 'read', '2025-01-23 13:33:54', '2025-01-23 04:34:09'),
(71, 3, 'Admin has approved your booking! Thank you for choosing to travel with us!', 'read', '2025-01-23 13:34:18', '2025-01-23 04:34:28');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` int(11) NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `flight_description` text NOT NULL,
  `flight_image` varchar(255) NOT NULL,
  `facilities` varchar(255) NOT NULL,
  `facilities_image` varchar(255) NOT NULL,
  `meals` varchar(255) NOT NULL,
  `meals_image` varchar(255) NOT NULL,
  `activities` varchar(255) NOT NULL,
  `activities_image` varchar(255) NOT NULL,
  `duration` int(20) NOT NULL,
  `destination` int(20) NOT NULL,
  `tour_guide` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`package_id`, `package_name`, `description`, `flight_description`, `flight_image`, `facilities`, `facilities_image`, `meals`, `meals_image`, `activities`, `activities_image`, `duration`, `destination`, `tour_guide`) VALUES
(18, 'Cultural Exploration', 'This  is a 5-day, 4-night immersive experience designed for those seeking both cultural insights and outdoor adventure in Myanmar’s largest city. This package offers a balance of urban exploration, historical landmarks, nature treks, and wildlife encounters.  Starting with a deep dive into Yangon’s rich heritage, you\'ll visit iconic sites like the Shwedagon and Sule Pagodas, followed by a cultural evening at the bustling Bogyoke Aung San Market. The second day takes you on a nature trek through ', 'business class', 'pictures/package/6775181c575ef_flight.jpeg', 'Yangon Hotel', 'pictures/package/6775181c575fe_yangon-hotel.jpg', 'Daily breakfast and one gourmet dinner', 'pictures/package/6775181c575ff_yangon_meals.jpg', 'Guided city tour, Walk Night Markets, Visit Pagodas', 'pictures/package/6775181c57601_Myanmar-Activities-Sunset-Shwedagon-Pagoda-Tour.jpg', 5, 1, 1),
(19, ' Bagan Heritage & Adventure ', 'The Bagan Heritage & Adventure Exploration package offers an unforgettable journey through one of Myanmar’s most iconic destinations. This 4-day, 3-night experience blends cultural discovery, historical exploration, and natural beauty. Wander through the mystical plains of Bagan, home to thousands of ancient temples, pagodas, and stupas that date back to the Pagan Kingdom. Visit iconic structures like Ananda Temple, Dhammayangyi Temple, and Shwezigon Pagoda, each steeped in centuries of history.', 'business class', 'pictures/package/677520a12c9ea_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/677520a12c9ef_338773_16100417450047364128.jpg', 'buffet local foods', 'pictures/package/677520a12c9f0_local-foods.jpg', 'Sunset boat ride along the Irrawaddy River Traditional cooking class or handicraft workshop Extended trek or bike ride through remote temples and pagodas', 'pictures/package/677520a12c9f1_bagan activities.jpg', 4, 2, 2),
(20, 'Urban Discovery', 'Embark on a 6-day, 5-night adventure through Yangon, Myanmar’s vibrant former capital and the country\'s largest city. This immersive package offers a perfect blend of cultural exploration, modern experiences, and local discovery. Explore the historical landmarks of Yangon, from the towering Shwedagon Pagoda to the bustling Bogyoke Aung San Market. The city’s unique colonial architecture, colorful markets, and tranquil parks create a rich contrast that you\'ll experience throughout your journey.  ', 'business class', 'pictures/package/6775232d31e16_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/6775232d31e1b_yangon-hotel.jpg', 'Daily breakfast and All meals, including Burmese cuisine experiences', 'pictures/package/6775232d31e1c_yangon_meals.jpg', 'Visit to Kandawgyi Lake and local markets,Transportation throughout Yangon and nearby locations,', 'pictures/package/6775232d31e1d_banner-yangon.jpg', 6, 1, 2),
(21, ' Paris Romance & Culture Getaway', 'Dive into the enchanting allure of Paris with this 5-day, 4-night package that captures the essence of the City of Lights. Explore the iconic landmarks, world-class art, and vibrant streets that make Paris one of the most beloved destinations in the world. From the majestic Eiffel Tower to the charming cafés of Montmartre, this package offers a perfect mix of romance, history, and culture.  Begin your journey with a guided city tour, visiting famous attractions such as the Eiffel Tower, Notre-Da', 'business class', 'pictures/package/67755fa2e05de_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/67755fa2e05e5_package.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67755fa2e05e6_healthy-foods-in-paris-potager-de-charlotte.jpg', 'Seine River cruise at sunset Skip-the-line access to the Louvre Museum and other attractions Day trip to the Palace of Versailles with transportation Gourmet dinner at a Michelin-starred restaurant French pastry-making workshop and wine-tasting experience', 'pictures/package/67755fa2e05e8_paris_activities.jpg', 5, 3, 1),
(22, 'Tokyo Tradition', 'Embark on a 5-day, 4-night journey to Tokyo, where the futuristic energy of the city meets its rich history and cultural heritage. This carefully crafted package offers a blend of modern attractions, traditional experiences, and culinary delights, providing an immersive and well-rounded Tokyo experience.  Start your Tokyo adventure with a visit to the iconic Shibuya Crossing, the world\'s busiest pedestrian crossing, followed by shopping and sightseeing in districts like Harajuku and Ginza. Dive ', 'business class', 'pictures/package/6775866e7d548_airline japan.jpg', '4-star hotel or luxury homestay', 'pictures/package/6775866e7d54b_japanAccommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/6775866e7d54c_tokyoMeals.jpg', 'Guided tours to top attractions such as Shibuya, Asakusa, Meiji Shrine, and Senso-ji Temple Day trip to Mt. Fuji or Odaiba Sushi-making class and traditional tea ceremony Visits to famous shopping districts like Ginza and Harajuku Tokyo Skytree or Tokyo T', 'pictures/package/6775866e7d54d_japanActivities.jpg', 5, 4, 2),
(23, 'Wanderlust Escape', 'Escape the ordinary and indulge in a slice of paradise with our Wanderlust Escape Package. Perfect for adventure seekers, romantic couples, and those yearning for serenity, this package combines luxury, relaxation, and exploration to create an unforgettable Maldivian retreat.', 'business class', 'pictures/package/677d495626f90_airline japan.jpg', 'Mid-Range Resorts and Guesthouses', 'pictures/package/677d495626f94_meldives_accommodation.jpg', 'Relish daily breakfast, lunch, and dinner, featuring international and Maldivian cuisines.', 'pictures/package/677d495626f95_Delicious-Maldives-Seafood.jpg', 'Sunset dolphin cruise, ', 'pictures/package/677d495626f96_maldives-activities-snorkeling.jpg', 12, 5, 5),
(24, 'Deluxe Paris Experience', 'The Deluxe Paris Experience Package offers the ultimate luxury getaway, combining rich cultural experiences with world-class service and comfort. Whether you\'re enjoying a private yacht cruise along the Seine, indulging in Michelin-star dining, or exploring the wonders of Versailles, every detail is designed to create lasting memories. This package is perfect for those who want to experience the best of Paris in the most luxurious and personalized way possible.', 'business class', 'pictures/package/677ff76592488_airline japan.jpg', 'Eiffel Tower View Rooms', 'pictures/package/677ff7659248d_package.jpg', 'Daily breakfast and one gourmet dinner', 'pictures/package/677ff7659248f_healthy-foods-in-paris-potager-de-charlotte.jpg', 'Seine River Cruise, Photoshoot in Paris, Private Louvre Tour', 'pictures/package/677ff76592490_paris_activities.jpg', 7, 3, 11),
(25, 'Premium Paris Experience', 'The Premium Paris Experience Package offers an ideal mix of luxury and adventure for travelers looking to immerse themselves in the art, history, and culture of Paris. From private museum tours to a delicious cooking class, this package is perfect for those who want to experience Paris in style without the need for excessive luxury. It’s tailored for travelers who seek a sophisticated yet relaxed way to explore Paris, making it perfect for both first-time visitors and those returning to the city', 'Private Jet', 'pictures/package/677ff8dfab230_private jet.jpg', 'Le Meurice or Hotel d\'Aubusson', 'pictures/package/677ff8dfab235_Le-Meurice--France--Paris--Conferences--0.jpg', 'Dining Delights such as Le Comptoir du Relais or Bistro Paul Bert, serving authentic French cuisine.', 'pictures/package/677ff8dfab236_womanteacherinclass_42220_international_cuisine_in_paris_125c83e8-05fb-4a1e-8a53-6367b13b25bf-1024x800.jpg', 'Louvre Museum Tour, Seine River Cruise, Montmartre Walking Tour', 'pictures/package/677ff8dfab237_04.jpg', 9, 3, 12),
(26, 'Sydney Explorer', 'Embark on an unforgettable journey with the Sydney Explorer Package, designed to showcase the best of Sydney’s iconic landmarks, vibrant culture, and stunning natural beauty. This package offers a perfect blend of city exploration, coastal adventures, and unforgettable experiences for travelers of all ages.', 'business class', 'pictures/package/67808c323630b_flight2.jpg', 'Sydney hotel', 'pictures/package/67808c323630e_sydney accommodation.jpg', 'Daily breakfast and select meals', 'pictures/package/67808c323630f_sydney dining.jpg', 'Sydney Opera House Tour, Sydney Harbour Cruise, Bondi Beach Experience, The Rocks Historical Walk', 'pictures/package/67808c3236310_sydney facilities.jpg', 5, 6, 8),
(27, 'Sydney Serenity', 'Embark on an unforgettable journey with the Sydney Serenity Package, designed to showcase the best of Sydney’s iconic landmarks, vibrant culture, and stunning natural beauty. This package offers a perfect blend of city exploration, coastal adventures, and unforgettable experiences for travelers of all ages.', 'business class', 'pictures/package/67808d8f3fb05_flight2.jpg', 'Sydney hotel', 'pictures/package/67808d8f3fb09_sydney facilities.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67808d8f3fb0b_sydney dining.jpg', 'Sydney Opera House Tour, Sydney Harbour Cruise, Bondi Beach Experience, The Rocks Historical Walk, Blue Mountains Day Trip', 'pictures/package/67808d8f3fb0d_Sydney_Opera_House_and_Harbour_Bridge_Dusk_(2)_2019-06-21.jpg', 5, 6, 12),
(28, 'Sydney Spectacular', 'Embark on an unforgettable journey with the Sydney Spectacular Package, designed to showcase the best of Sydney’s iconic landmarks, vibrant culture, and stunning natural beauty. This package offers a perfect blend of city exploration, coastal adventures, and unforgettable experiences for travelers of all ages.', 'business class', 'pictures/package/67808e4e0445a_flight2.jpg', 'Sydney hotel', 'pictures/package/67808e4e04460_sydney accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67808e4e04462_sydney dining.jpg', 'Sydney Opera House Tour, Sydney Harbour Cruise, Bondi Beach Experience, The Rocks Historical Walk', 'pictures/package/67808e4e04463_sydney2.jpg', 5, 6, 11),
(29, 'Rome Explorer', 'Discover the wonders of the Eternal City with the Rome Explorer Package, designed to immerse you in the rich history, art, and culture of one of the world\'s most captivating destinations. This carefully curated itinerary ensures you experience the best of Rome, from ancient ruins to culinary delights.', 'business class', 'pictures/package/67809c9834e32_flight.jpg', 'central Rome hotel', 'pictures/package/67809c9834e35_sydney facilities.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67809c9834e36_rome dining.jpg', 'Guided Colosseum & Roman Forum Tour, Vatican City Experience, Trevi Fountain & Spanish Steps', 'pictures/package/67809c9834e37_rome activities.jpg', 5, 7, 35),
(30, ' Rome Delight', 'The Rome Delight Package is perfect for those seeking a well-rounded Roman experience filled with iconic landmarks, hidden gems, and indulgent culinary delights. Whether you\'re a history enthusiast, a culture lover, or a foodie, this package offers a mix of guided exploration and free time to savor the Eternal City at your own pace.', 'business class', 'pictures/package/67809dcea6a15_flight.jpg', 'luxury hotel in central Rome', 'pictures/package/67809dcea6a18_rome accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67809dcea6a19_rome dining.jpg', 'Ancient Rome Tour, Vatican & Sistine Chapel Exclusive Access, taste Flavors of Rome', 'pictures/package/67809dcea6a1a_rome activities.jpg', 5, 7, 36),
(31, 'Rome Spectacular', 'Experience the grandeur of the Eternal City with the Rome Spectacular Package, designed to highlight the best of Rome’s iconic landmarks, hidden treasures, and cultural experiences. This package blends ancient history, artistic marvels, and modern-day charm, making it perfect for travelers seeking a truly unforgettable Roman adventure.', 'business class', 'pictures/package/67809ea8cec83_flight.jpg', 'Rome Hotel', 'pictures/package/67809ea8cec87_rome accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67809ea8cec88_rome dining.jpg', 'Rome City Tour', 'pictures/package/67809ea8cec89_rome activities.jpg', 5, 7, 38),
(32, 'Adventure Horizon', 'This package is perfect for travelers seeking a comprehensive Phuket experience, with a balance of adventure, culture, and relaxation. Whether you\'re snorkeling in crystal-clear waters or enjoying the island\'s vibrant markets, the Phuket Explorer Package ensures an unforgettable holiday.', 'business class', 'pictures/package/6780a092a5d45_phuket-airport.jpg', 'Beach Front Resorts', 'pictures/package/6780a092a5d49_phuket accommodation.2jpg.jpg', 'Daily breakfasts and thai cuisine', 'pictures/package/6780a092a5d4a_phuket dining.jpg', 'Phuket Beaches & Water Sport, Phi Phi Islands Day Tour, Cultural Discovery, Phang Nga Bay Kayaking Adventure', 'pictures/package/6780a092a5d4b_phuket activities.jpg', 5, 8, 38),
(33, 'Skyline Experience', 'Discover the breathtaking skyline of Dubai with a tour that takes you to the city’s most iconic landmarks. Soar to new heights at the Burj Khalifa Observation Deck, enjoy a romantic dhow cruise with dinner as you glide past the lit-up Dubai Marina, and optionally add a thrilling helicopter ride for a bird’s-eye view of this futuristic city. Perfect for those who love panoramic views and modern architecture', 'business class', 'pictures/package/67847bfcd0679_dubai flight.jpg', 'Royal Hotel', 'pictures/package/67847bfcd067c_dubai_accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67847bfcd067d_dubai dining.jpg', 'Visit to Burj Khalifa Observation Deck, Dubai Marina Dhow Cruise with Dinner', 'pictures/package/67847bfcd067e_dubai3.jpg', 3, 9, 38),
(34, 'Desert Adventure', 'Escape the bustling city and venture into the heart of the desert. Experience the thrill of camel riding and sandboarding, spend a magical night at a desert camp under the stars, and end your adventure with a serene hot air balloon ride at sunrise. Perfect for thrill-seekers and nature lovers.', 'business class', 'pictures/package/67847d736ba54_dubai flight.jpg', 'Royal hotel', 'pictures/package/67847d736ba57_dubai facilitiesAtlantis-The-Royal.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67847d736ba58_dubai dining.jpg', 'Overnight stay at a desert camp, Camel riding and sandboarding, Stargazing experience, Morning hot air balloon ride', 'pictures/package/67847d736ba59_dubai3.jpg', 3, 9, 37),
(35, 'Luxury Dubai Getaway', 'Indulge in the ultimate luxury experience in Dubai. Stay at the world-renowned Burj Al Arab or Atlantis, The Palm, dine at Michelin-starred restaurants, and relax with a private yacht cruise. This package is designed for travelers who want to enjoy the finer things in life. Unwind, relax, and explore Dubai in style.', 'private jet', 'pictures/package/67847ed65194f_private_jet.jpg', 'Royal Hotel', 'pictures/package/67847ed651952_dubai facilitiesAtlantis-The-Royal.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67847ed651953_dubai dining.jpg', 'Stay at Burj Al Arab or Atlantis, The Palm Fine dining experience at Dubai\'s top restaurants Private yacht rental for 2 hours Desert Safari with BBQ dinner', 'pictures/package/67847ed651954_private_yacht.jpg', 3, 9, 39),
(36, 'Beach Getaway', 'Relax and unwind on the pristine beaches of Phuket with this serene package. Enjoy the sun, sand, and crystal-clear waters while staying at a beachfront resort. Perfect for those seeking a tranquil escape from the hustle and bustle of daily life.', 'business class', 'pictures/package/678486dd5bb46_phuket-airport.jpg', 'luxury homestay', 'pictures/package/678486dd5bb4e_phuket accommodation.2jpg.jpg', 'Daily breakfast and one gourmet dinner', 'pictures/package/678486dd5bb50_phuket dining.jpg', 'Guided city tour, wellness spa, entry tickets, Diving and exploring underwater', 'pictures/package/678486dd5bb52_phuket activities.jpg', 4, 8, 37),
(37, 'Romantic Phuket Honeymoon', 'Create timeless memories with your loved one in the romantic setting of Phuket. Stay in a private villa, indulge in couple spa treatments, and enjoy breathtaking sunsets together.', 'private jet', 'pictures/package/67848a63dbd86_private_jet.jpg', 'private villa', 'pictures/package/67848a63dbd8c_phuket_private_villa.jpg', 'Sunset dinner cruise', 'pictures/package/67848a63dbd8e_Sunset dinner cruise phuket.jpg', '3-night stay in a private pool villa , Couples spa treatment at a luxury wellness center , Sunset dinner cruise , Private guided tour to the Phi Phi Islands , Romantic beach photoshoot', 'pictures/package/67848a63dbd90_phuket accommodation.jpg', 5, 8, 39),
(38, 'Leisure Getaway', ' Ideal for men who enjoy golf and leisure activities. Tee off at some of Phuket’s most scenic golf courses while staying at a luxury resort.', 'business class', 'pictures/package/67848ea341fd5_phuket-airport.jpg', 'luxury homestay', 'pictures/package/67848ea341fda_Malé accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/67848ea341fdb_Malé dining2.jpg', 'Whitewater rafting and zip-lining adventure', 'pictures/package/67848ea341fdc_Whitewater rafting and zip-lining adventure.jpg', 5, 5, 40),
(39, 'Relax & Recharge', 'Need a break? This package offers a combination of relaxation and rejuvenation in a tranquil environment. Unwind on pristine beaches and enjoy luxury spa treatments', 'business class', 'pictures/package/678490462ead0_dubai flight.jpg', 'luxury homestay', 'pictures/package/678490462ead4_Malé accommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/678490462ead5_Malé dining2.jpg', ' Whitewater rafting and zip-lining adventure, Stay at a beachfront resort with ocean views , Two full-body massages and spa treatments , Sunset beach yoga sessions', 'pictures/package/678490462ead6_Whitewater rafting and zip-lining adventure.jpg', 5, 5, 7),
(40, 'Urban Explorer’s Delight', 'Discover Singapore’s iconic landmarks and futuristic architecture while immersing yourself in its urban charm. Perfect for first-time visitors.', 'business class', 'pictures/package/678492599d582_dubai flight.jpg', 'Singapore hotel', 'pictures/package/678492599d586_Singapore-Hotels.jpg', 'Daily breakfasts and select meals included', 'pictures/package/678492599d587_marina-bay-dining-night.jpg', 'Outside adventures, Guided city tour of Marina Bay Sands, Gardens by the Bay, and Merlion Park', 'pictures/package/678492599d588_Header-Outdoor-Adventurers_1610x1200.jpg', 5, 10, 33),
(41, 'Singapore Adventurer', 'For adventure enthusiasts, this package offers exciting activities like zip-lining, theme parks, and more!', 'business class', 'pictures/package/678493c6a4518_dubai flight.jpg', '4-star hotel or luxury homestay', 'pictures/package/678493c6a451b_Singapore-Hotels.jpg', 'Daily breakfasts and select meals included', 'pictures/package/678493c6a451c_marina-bay-dining-night.jpg', 'Outdoor Adventurers', 'pictures/package/678493c6a451d_Header-Outdoor-Adventurers_1610x1200.jpg', 5, 10, 40),
(42, 'Luxury Singapore Getaway', 'Indulge in luxury with a stay at Singapore’s most premium accommodations, fine dining, and exclusive experiences.', 'business class', 'pictures/package/6784948f0d235_dubai flight.jpg', 'Royal Hotel', 'pictures/package/6784948f0d238_Singapore-Hotels.jpg', 'Daily breakfasts and select meals included', 'pictures/package/6784948f0d239_marina-bay-dining-night.jpg', 'Stay at Marina Bay Sands or The Fullerton Hotel Singapore, Private yacht cruise with sunset dinner', 'pictures/package/6784948f0d23a_Sunset dinner cruise phuket.jpg', 5, 10, 8),
(43, 'Discover Sweden', 'Sweden is a land of stunning landscapes, vibrant cities, and rich history. From the northern lights in Lapland to the charming streets of Stockholm, our Sweden packages are designed to offer unforgettable experiences for every traveler.', 'business class', 'pictures/package/678dfd56eb943_stockholm_flight.png', '4 star hotel or tents', 'pictures/package/678dfd56eb94c_stockholm_accommodation.png', 'Swedish dining meals and daily breakfast ', 'pictures/package/678dfd56eb94e_stockholm_meals.png', 'Stockholm City Adventures, Northern Lights & Winter Wonderland, Countryside & Castles', 'pictures/package/678dfd56eb94f_stockholm_activity.png', 7, 11, 15),
(44, 'Himalayan Adventure', 'Experience the breathtaking beauty of the Himalayas with our expertly designed Everest trip packages. Whether you\'re looking to trek to Everest Base Camp or enjoy a luxurious mountain-view experience, we’ve got something for everyone.', 'business class', 'pictures/package/678dfeb36a50f_stockholm_flight.png', 'Luxury tents or adventure lodges', 'pictures/package/678dfeb36a519_everest accommodation.png', 'All meals with snacks', 'pictures/package/678dfeb36a51c_everest_meals.png', 'Trek to Everest Base Camp with professional guides. Scenic flight to Lukla and panoramic views of the Himalayas. Explore Sherpa villages and monasteries.', 'pictures/package/678dfeb36a51f_everest activity.png', 7, 12, 19),
(45, 'Everest Explorer', 'A complete trek to Everest Base Camp, featuring a guided adventure through the Khumbu region with a focus on the iconic Namche Bazaar.', 'business class', 'pictures/package/678dfeb36a50f_stockholm_flight.png', 'Luxury tents or adventure lodges', 'pictures/package/678dfeb36a519_everest accommodation.png', 'All meals with snacks', 'pictures/package/678dfeb36a51c_everest_meals.png', 'Trek to Everest Base Camp with professional guides. Scenic flight to Lukla and panoramic views of the Himalayas. Explore Sherpa villages and monasteries.', 'pictures/package/678dfeb36a51f_everest activity.png', 9, 12, 23),
(46, 'Namche Nomad Adventure', 'A thrilling expedition for adventure seekers, combining rugged trekking and cultural exploration, with a focus on the unique lifestyle and history of the Namche Bazaar area.', 'business class', 'pictures/package/678dfeb36a50f_stockholm_flight.png', 'Luxury tents or adventure lodges', 'pictures/package/678dfeb36a519_everest accommodation.png', 'All meals with snacks', 'pictures/package/678dfeb36a51c_everest_meals.png', 'Trek to Everest Base Camp with professional guides. Scenic flight to Lukla and panoramic views of the Himalayas. Explore Sherpa villages and monasteries.', 'pictures/package/678dfeb36a51f_everest activity.png', 11, 12, 11),
(47, 'Chilling Adventure', 'Embark on a 9-day, 8-night adventure through Yangon, Myanmar’s vibrant former capital and the country\'s largest city. This immersive package offers a perfect blend of cultural exploration, modern experiences, and local discovery. Explore the historical landmarks of Yangon, from the towering Shwedagon Pagoda to the bustling Bogyoke Aung San Market. The city’s unique colonial architecture, colorful markets, and tranquil parks create a rich contrast that you\'ll experience throughout your journey.  ', 'business class', 'pictures/package/6775232d31e16_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/6775232d31e1b_yangon-hotel.jpg', 'Daily breakfast and All meals, including Burmese cuisine experiences', 'pictures/package/6775232d31e1c_yangon_meals.jpg', 'Visit to Kandawgyi Lake and local markets,Transportation throughout Yangon and nearby locations,', 'pictures/package/6775232d31e1d_banner-yangon.jpg', 9, 1, 5),
(48, 'Golden City', 'The Golden City package offers an unforgettable journey through one of Myanmar’s most iconic destinations. This 4-day, 3-night experience blends cultural discovery, historical exploration, and natural beauty. Wander through the mystical plains of Bagan, home to thousands of ancient temples, pagodas, and stupas that date back to the Pagan Kingdom. Visit iconic structures like Ananda Temple, Dhammayangyi Temple, and Shwezigon Pagoda, each steeped in centuries of history.', 'business class', 'pictures/package/677520a12c9ea_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/677520a12c9ef_338773_16100417450047364128.jpg', 'buffet local foods', 'pictures/package/677520a12c9f0_local-foods.jpg', 'Sunset boat ride along the Irrawaddy River Traditional cooking class or handicraft workshop Extended trek or bike ride through remote temples and pagodas', 'pictures/package/677520a12c9f1_bagan activities.jpg', 9, 2, 18),
(49, 'Bagan Luxury Tour', 'The Bagan Luxury Tour package offers an unforgettable journey through one of Myanmar’s most iconic destinations. This 12-day, 11-night experience blends cultural discovery, historical exploration, and natural beauty. Wander through the mystical plains of Bagan, home to thousands of ancient temples, pagodas, and stupas that date back to the Pagan Kingdom. Visit iconic structures like Ananda Temple, Dhammayangyi Temple, and Shwezigon Pagoda, each steeped in centuries of history.', 'business class', 'pictures/package/677520a12c9ea_flight.jpeg', '4-star hotel or luxury homestay', 'pictures/package/677520a12c9ef_338773_16100417450047364128.jpg', 'buffet local foods', 'pictures/package/677520a12c9f0_local-foods.jpg', 'Sunset boat ride along the Irrawaddy River Traditional cooking class or handicraft workshop Extended trek or bike ride through remote temples and pagodas', 'pictures/package/677520a12c9f1_bagan activities.jpg', 9, 2, 18),
(50, 'Tokyo Cultural Immersion', 'Embark on a 7-day, 6-night journey to Tokyo, where the futuristic energy of the city meets its rich history and cultural heritage. This carefully crafted package offers a blend of modern attractions, traditional experiences, and culinary delights, providing an immersive and well-rounded Tokyo experience.  Start your Tokyo adventure with a visit to the iconic Shibuya Crossing, the world\'s busiest pedestrian crossing, followed by shopping and sightseeing in districts like Harajuku and Ginza. ', 'business class', 'pictures/package/6775866e7d548_airline japan.jpg', '4-star hotel or luxury homestay', 'pictures/package/6775866e7d54b_japanAccommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/6775866e7d54c_tokyoMeals.jpg', 'Guided tours to top attractions such as Shibuya, Asakusa, Meiji Shrine, and Senso-ji Temple Day trip to Mt. Fuji or Odaiba Sushi-making class and traditional tea ceremony Visits to famous shopping districts like Ginza and Harajuku Tokyo Skytree', 'pictures/package/6775866e7d54d_japanActivities.jpg', 7, 4, 16),
(51, 'Nightlife and Entertainment', 'Embark on a 10-day, 9-night journey to Tokyo, where the futuristic energy of the city meets its rich history and cultural heritage. This carefully crafted package offers a blend of modern attractions, traditional experiences, and culinary delights, providing an immersive and well-rounded Tokyo experience.  Start your Tokyo adventure with a visit to the iconic Shibuya Crossing, the world\'s busiest pedestrian crossing, followed by shopping and sightseeing in districts like Harajuku and Ginza. ', 'business class', 'pictures/package/6775866e7d548_airline japan.jpg', '4-star hotel or luxury homestay', 'pictures/package/6775866e7d54b_japanAccommodation.jpg', 'Daily breakfasts and select meals included', 'pictures/package/6775866e7d54c_tokyoMeals.jpg', 'Guided tours to top attractions such as Shibuya, Asakusa, Meiji Shrine, and Senso-ji Temple Day trip to Mt. Fuji or Odaiba Sushi-making class and traditional tea ceremony Visits to famous shopping districts like Ginza and Harajuku Tokyo Skytree', 'pictures/package/6775866e7d54d_japanActivities.jpg', 10, 4, 16),
(52, 'Classic Amsterdam City Tour', 'This package offers a classic experience of Amsterdam, combining the best of the city\'s art, history, and culture. You will visit world-renowned museums, such as the Rijksmuseum and Van Gogh Museum, and enjoy a scenic canal cruise through the iconic waterways of Amsterdam. Explore the charming neighborhoods, including Jordaan and the bustling Red Light District, and get a taste of local life.', 'business class', 'pictures/package/67913ac4a6a14_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67913ac4a6a1f_Amsterdam_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67913ac4a6a22_Amsterdam_foods.png', 'Guided visits to the Rijksmuseum, Van Gogh Museum, and Anne Frank House.\nCanal cruises through UNESCO World Heritage canals.\nExploration of historic districts like Jordaan and the Red Light District.', 'pictures/package/67913ac4a6a24_Amsterdam_activitie.png', 4, 13, 36),
(53, 'Amsterdam Cultural Immersion', 'For those seeking a deeper cultural connection, this immersive experience includes hands-on workshops and visits to iconic cultural sites. You\'ll get the chance to try traditional Dutch activities like cheese-making and clog painting. Evening performances at the Royal Concertgebouw and tours of historical places such as the Anne Frank House and Van Gogh Museum make this a memorable cultural journey.', 'Business Class', 'pictures/package/67913ac4a6a14_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67913ac4a6a1f_Amsterdam_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67913ac4a6a22_Amsterdam_foods.png', 'Guided visits to the Rijksmuseum, Van Gogh Museum, and Anne Frank House.\r\nCanal cruises through UNESCO World Heritage canals.\r\nExploration of historic districts like Jordaan and the Red Light District.', 'pictures/package/67913ac4a6a24_Amsterdam_activitie.png', 7, 13, 45),
(54, 'Amsterdam and Beyond', 'Explore not only Amsterdam but also the surrounding countryside and historical towns. This extended tour allows you to immerse yourself in the Dutch culture, from visiting the world-famous Keukenhof Gardens during spring to discovering windmills in Zaanse Schans. You\'ll also visit picturesque towns like Haarlem and Utrecht and enjoy cycling tours through the beautiful Dutch landscape.', 'Business Class', 'pictures/package/67913ac4a6a14_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67913ac4a6a1f_Amsterdam_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67913ac4a6a22_Amsterdam_foods.png', 'Guided visits to the Rijksmuseum, Van Gogh Museum, and Anne Frank House.\r\nCanal cruises through UNESCO World Heritage canals.\r\nExploration of historic districts like Jordaan and the Red Light District.', 'pictures/package/67913ac4a6a24_Amsterdam_activitie.png', 11, 13, 35),
(55, 'Historical Highlights Tour', 'Immerse yourself in the rich history of Beijing. Visit the Forbidden City, a UNESCO World Heritage Site, and walk through the ancient alleys of the Hutongs. Marvel at the grandeur of the Great Wall of China (Mutianyu section) and enjoy the serene beauty of the Temple of Heaven.', 'business class', 'pictures/package/6791bd637dc32_Amsterdam_flight.png', 'Royal Hotel', 'pictures/package/6791bd637dc35_beijing_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/6791bd637dc36_bejing_meals.png', 'Private guided tours to key landmarks Great Wall entry and cable car tickets', 'pictures/package/6791bd637dc37_Bejing_activities.png', 7, 14, 35),
(56, 'Beijing Food and Culture Experience', 'Immerse yourself in the rich history of Beijing. Visit the Forbidden City, a UNESCO World Heritage Site, and walk through the ancient alleys of the Hutongs. Marvel at the grandeur of the Great Wall of China (Mutianyu section) and enjoy the serene beauty of the Temple of Heaven.', 'business class', 'pictures/package/6791bd637dc32_Amsterdam_flight.png', 'Royal Hotel', 'pictures/package/6791bd637dc35_beijing_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/6791bd637dc36_bejing_meals.png', 'Private guided tours to key landmarks Great Wall entry and cable car tickets', 'pictures/package/6791bd637dc37_Bejing_activities.png', 11, 14, 32),
(57, 'Beijing Luxury Treat', 'Immerse yourself in the rich history of Beijing. Visit the Forbidden City, a UNESCO World Heritage Site, and walk through the ancient alleys of the Hutongs. Marvel at the grandeur of the Great Wall of China (Mutianyu section) and enjoy the serene beauty of the Temple of Heaven.', 'business class', 'pictures/package/6791bd637dc32_Amsterdam_flight.png', 'Royal Hotel', 'pictures/package/6791bd637dc35_beijing_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/6791bd637dc36_bejing_meals.png', 'Private guided tours to key landmarks Great Wall entry and cable car tickets', 'pictures/package/6791bd637dc37_Bejing_activities.png', 11, 14, 18),
(58, 'Classic Egypt Adventure', 'Discover the wonders of ancient Egypt on this comprehensive tour. Visit the Pyramids of Giza, Great Sphinx, and Saqqara Step Pyramid. Tour the historic city of Luxor, home to the Valley of the Kings and the Karnak Temple, and take a relaxing Nile River cruise to see temples like Edfu and Kom Ombo.', 'business class', 'pictures/package/67924a048050a_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67924a048050d_giza_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67924a048050e_giza_meals.png', ' Visit the Pyramids of Giza, Great Sphinx, and Saqqara Step Pyramid. Tour the historic city of Luxor, home to the Valley of the Kings and the Karnak Temple, and take a relaxing Nile River cruise to see temples like Edfu and Kom Ombo.', 'pictures/package/67924a048050f_giza_activities.png', 4, 15, 36),
(59, 'Cairo City and Desert Adventure', ' Perfect for families, this tour includes fun and educational activities. Visit the pyramids and enjoy a camel ride, explore the interactive exhibits at the Grand Egyptian Museum, and take a felucca (traditional sailboat) ride on the Nile.', 'business class', 'pictures/package/67924b6fa5e8e_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67924b6fa5e91_giza_accommodation.png', 'Daily breakfast and one gourmet dinner', 'pictures/package/67924b6fa5e92_giza_meals.png', 'Explore the bustling capital of Cairo and enjoy an unforgettable desert safari. Visit the iconic Pyramids of Giza, Egyptian Museum, and Khan El Khalili Bazaar. Take a guided day trip to the White Desert for breathtaking views of unique rock formations and', 'pictures/package/67924b6fa5e93_giza_activities.png', 7, 15, 38),
(60, 'Luxury Red Sea Escape', ' luxurious journey combining history and relaxation. Begin with a stay in a 5-star Cairo hotel, touring the ancient pyramids and mosques. Embark on a luxury Nile Cruise from Luxor to Aswan, visiting temples and local villages. ', 'business class', 'pictures/package/67924caed90de_Amsterdam_flight.png', '4-star hotel or luxury homestay', 'pictures/package/67924caed90e1_giza_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67924caed90e2_giza_meals.png', 'visiting temples and local villages, a beachside retreat in Hurghada, enjoying snorkeling or diving in the crystal-clear waters of the Red Sea, Camel ride at the pyramids, Tickets to museums and theme parks', 'pictures/package/67924caed90e3_giza_activities.png', 10, 15, 39),
(61, 'Melbourne City Explorer\r\n', 'Dive into the heart of Melbourne with this city-focused tour. Discover the bustling Queen Victoria Market, explore the iconic laneways filled with street art, and visit landmarks like Federation Square and Flinders Street Station. Experience a panoramic view of the city from the Eureka Skydeck and end your evenings with Melbourne\'s famous coffee and international cuisines.', 'Business Class', 'pictures/package/67925c55691e9_dubai flight.jpg', 'Royal Hotel', 'pictures/package/67925c83644e7_melbourne_facilities.png', 'Daily Cuisine', 'pictures/package/67925c8f5490a_melbourne_meals.png', 'Eureka Skydeck entry,\r\nQueen Victoria Market tour,\r\nvisit landmarks like Federation Square and Flinders Street Station\r\n', 'pictures/package/67925e9b94140_melbourne_activities.png', 6, 16, 11),
(62, ' Great Ocean Road Adventure', 'Take a breathtaking journey along the Great Ocean Road, one of the world’s most scenic coastal drives. Visit iconic sites like the Twelve Apostles, Loch Ard Gorge, and Bells Beach. Enjoy coastal walks, wildlife spotting, and stunning ocean views. Stay overnight in the seaside town of Apollo Bay.', 'business class', 'pictures/package/67925f89ab730_Amsterdam_flight.png', 'Royal Hotel', 'pictures/package/67925f89ab734_melbourne_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/67925f89ab736_melbourne_meals.png', 'Guided tour of the Great Ocean Road highlights, Meals during the tour, Visit iconic sites like the Twelve Apostles, Loch Ard Gorge, and Bells Beach, ', 'pictures/package/67925f89ab737_melbourne_activities.png', 8, 16, 25),
(63, 'Adventure and Nature Package', 'Perfect for outdoor enthusiasts! Enjoy an early morning hot air balloon ride over the Yarra Valley, hike through the Grampians National Park, and explore Wilson\'s Promontory National Park for pristine beaches and wildlife', 'business class', 'pictures/package/6792613a9cbcf_Amsterdam_flight.png', 'Royal Hotel', 'pictures/package/6792613a9cbd3_melbourne_accommodation.png', 'Daily breakfasts and select meals included', 'pictures/package/6792613a9cbd5_melbourne_meals.png', 'National park entry fees, Meals during outdoor excursions, an early morning hot air balloon ride, Wilson\'s Promontory National Park', 'pictures/package/6792613a9cbd6_melbourne_activities.png', 11, 16, 5);

-- --------------------------------------------------------

--
-- Table structure for table `package_info`
--

CREATE TABLE `package_info` (
  `package_info_id` int(11) NOT NULL,
  `source_location` int(11) NOT NULL,
  `price` int(20) NOT NULL,
  `travel_date` date NOT NULL,
  `number_of_available_people` int(11) NOT NULL,
  `package` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package_info`
--

INSERT INTO `package_info` (`package_info_id`, `source_location`, `price`, `travel_date`, `number_of_available_people`, `package`) VALUES
(1, 1, 799, '2025-02-12', 40, 18),
(2, 167, 799, '2025-02-12', 40, 18),
(3, 8, 899, '2025-02-12', 40, 18),
(4, 1, 798, '2025-02-19', 40, 18),
(5, 1, 799, '2025-02-19', 39, 18),
(6, 1, 799, '2025-02-26', 38, 18),
(7, 17, 699, '2025-02-12', 40, 18),
(8, 1, 799, '2025-02-12', 40, 19),
(9, 1, 799, '2025-02-19', 40, 19),
(10, 43, 599, '2025-02-12', 39, 19),
(11, 48, 699, '2025-02-12', 50, 19),
(12, 87, 499, '2025-02-12', 49, 19),
(13, 145, 498, '2025-02-19', 50, 19),
(14, 1, 999, '2025-02-14', 40, 20),
(15, 1, 999, '2025-02-21', 38, 20),
(16, 1, 999, '2025-02-28', 40, 20),
(17, 8, 997, '2025-02-07', 40, 20),
(18, 169, 999, '2025-02-14', 40, 20),
(19, 170, 899, '2025-02-15', 50, 20),
(20, 61, 799, '2025-02-17', 50, 20),
(21, 62, 899, '2025-02-28', 49, 20),
(22, 113, 899, '2025-02-20', 50, 20),
(23, 166, 599, '2025-02-06', 40, 21),
(24, 1, 599, '2025-02-21', 40, 21),
(25, 7, 599, '2025-02-14', 40, 21),
(26, 166, 799, '2025-02-13', 40, 21),
(27, 166, 799, '2025-02-22', 40, 21),
(28, 166, 799, '2025-01-24', 40, 21),
(29, 166, 799, '2025-03-06', 40, 21),
(30, 166, 799, '2025-03-13', 38, 21),
(31, 166, 799, '2025-03-20', 39, 21),
(32, 166, 599, '2025-02-13', 30, 22),
(33, 1, 699, '2025-02-07', 39, 22),
(34, 1, 699, '2025-02-13', 38, 22),
(35, 7, 599, '2025-02-17', 40, 22),
(36, 22, 699, '2025-02-12', 39, 22),
(37, 114, 699, '2025-02-22', 40, 22),
(38, 101, 699, '2025-02-17', 40, 22),
(39, 166, 999, '2025-02-07', 30, 23),
(40, 166, 1002, '2025-03-21', 30, 23),
(41, 166, 999, '2025-02-14', 30, 23),
(42, 22, 1299, '2025-02-08', 29, 23),
(43, 22, 1299, '2025-02-15', 30, 23),
(44, 15, 1299, '2025-02-09', 30, 23),
(45, 15, 1299, '2025-02-16', 30, 23),
(46, 19, 1299, '2025-02-11', 30, 23),
(47, 19, 1299, '2025-02-18', 30, 23),
(48, 64, 999, '2025-02-13', 30, 23),
(49, 64, 999, '2025-02-20', 30, 23),
(50, 71, 999, '2025-02-21', 30, 23),
(51, 71, 999, '2025-02-28', 29, 23),
(52, 1, 1099, '2025-02-06', 30, 19),
(53, 1, 827, '2025-02-12', 30, 19),
(54, 1, 1099, '2025-02-18', 30, 19),
(55, 1, 899, '2025-02-24', 30, 19),
(56, 2, 766, '2025-02-07', 30, 19),
(57, 2, 827, '2025-02-14', 30, 19),
(58, 2, 1099, '2025-02-21', 30, 19),
(59, 3, 1099, '2025-02-09', 30, 19),
(60, 3, 827, '2025-02-15', 30, 19),
(61, 3, 1099, '2025-02-21', 30, 19),
(62, 3, 899, '2025-02-24', 30, 19),
(63, 4, 766, '2025-02-01', 30, 19),
(64, 4, 827, '2025-02-05', 30, 19),
(65, 4, 1099, '2025-02-17', 30, 19),
(66, 4, 1099, '2025-02-23', 30, 19),
(67, 4, 1099, '2025-02-26', 30, 19),
(68, 5, 1099, '2025-02-02', 30, 19),
(69, 5, 827, '2025-02-08', 30, 19),
(70, 5, 1099, '2025-02-20', 29, 19),
(71, 5, 899, '2025-02-26', 30, 19),
(72, 166, 1499, '2025-02-06', 20, 24),
(73, 166, 1499, '2025-02-14', 20, 24),
(74, 1, 1499, '2025-01-10', 28, 24),
(75, 173, 1499, '2025-01-25', 29, 24),
(76, 166, 1499, '2025-02-14', 10, 25),
(77, 1, 1499, '2025-02-27', 10, 25),
(78, 76, 1499, '2025-02-19', 20, 25),
(79, 166, 399, '2025-02-07', 30, 26),
(80, 166, 399, '2025-02-14', 29, 26),
(81, 166, 399, '2025-02-21', 30, 26),
(82, 1, 499, '2025-02-11', 30, 26),
(83, 1, 499, '2025-02-18', 29, 26),
(84, 1, 498, '2025-02-25', 30, 26),
(85, 166, 399, '2025-02-07', 30, 27),
(86, 166, 399, '2025-02-14', 30, 27),
(87, 166, 399, '2025-02-21', 30, 27),
(88, 166, 899, '2025-02-07', 29, 28),
(89, 166, 799, '2025-02-14', 23, 28),
(90, 166, 799, '2025-02-21', 30, 28),
(91, 166, 399, '2025-02-06', 30, 29),
(92, 166, 399, '2025-02-13', 30, 29),
(93, 166, 399, '2025-02-20', 30, 29),
(94, 166, 399, '2025-02-27', 30, 29),
(95, 1, 599, '2025-02-12', 30, 30),
(96, 1, 599, '2025-02-19', 30, 30),
(97, 46, 599, '2025-02-14', 30, 30),
(98, 46, 599, '2025-02-21', 31, 30),
(99, 46, 599, '2025-02-28', 30, 30),
(100, 166, 899, '2025-02-05', 30, 31),
(101, 166, 899, '2025-02-12', 30, 31),
(102, 166, 899, '2025-02-19', 29, 31),
(103, 1, 899, '2025-02-05', 30, 31),
(104, 1, 899, '2025-02-12', 30, 31),
(105, 1, 899, '2025-02-19', 30, 31),
(106, 166, 399, '2025-02-06', 28, 32),
(107, 166, 399, '2025-02-13', 29, 32),
(108, 166, 399, '2025-02-20', 30, 32),
(109, 1, 599, '2025-02-05', 30, 32),
(110, 166, 799, '2025-03-06', 30, 33),
(111, 1, 799, '2025-03-06', 30, 33),
(112, 23, 999, '2025-03-06', 30, 33),
(113, 55, 1299, '2025-03-06', 30, 33),
(114, 72, 999, '2025-03-06', 30, 33),
(115, 166, 1299, '2025-03-13', 30, 34),
(116, 166, 1299, '2025-03-20', 30, 34),
(117, 166, 1299, '2025-03-27', 30, 34),
(118, 166, 1999, '2025-03-07', 10, 35),
(119, 166, 1999, '2025-03-14', 10, 35),
(120, 166, 1999, '2025-03-21', 10, 35),
(121, 166, 599, '2025-02-14', 30, 36),
(122, 166, 599, '2025-02-21', 29, 36),
(123, 2, 599, '2025-02-21', 30, 36),
(124, 9, 599, '2025-02-21', 30, 36),
(125, 42, 899, '2025-02-21', 30, 36),
(126, 42, 899, '2025-02-14', 30, 36),
(127, 76, 899, '2025-02-14', 30, 36),
(128, 1, 1499, '2025-02-14', 2, 37),
(129, 3, 1499, '2025-02-14', 2, 37),
(130, 5, 1499, '2025-02-14', 2, 37),
(131, 7, 1499, '2025-02-14', 2, 37),
(132, 18, 1499, '2025-02-14', 2, 37),
(133, 166, 1499, '2025-02-14', 2, 37),
(134, 166, 1499, '2025-02-21', 2, 37),
(135, 166, 1499, '2025-02-01', 2, 37),
(136, 166, 1499, '2025-02-07', 0, 37),
(137, 166, 1499, '2025-02-28', 2, 37),
(138, 1, 1099, '2025-02-08', 30, 38),
(139, 2, 1099, '2025-02-08', 30, 38),
(140, 166, 1099, '2025-02-08', 30, 38),
(141, 166, 1099, '2025-02-15', 30, 38),
(142, 166, 1099, '2025-02-22', 28, 38),
(143, 166, 1099, '2025-02-27', 30, 38),
(144, 14, 1099, '2025-02-27', 29, 38),
(145, 48, 1099, '2025-02-27', 30, 38),
(146, 87, 1099, '2025-02-27', 30, 38),
(147, 1, 1299, '2025-02-02', 30, 39),
(148, 166, 1299, '2025-02-02', 30, 39),
(149, 166, 1299, '2025-02-14', 29, 39),
(150, 23, 1299, '2025-02-14', 30, 39),
(151, 44, 1299, '2025-02-14', 30, 39),
(152, 14, 1299, '2025-02-19', 30, 39),
(153, 144, 1299, '2025-02-19', 30, 39),
(154, 166, 1299, '2025-02-19', 30, 39),
(155, 1, 699, '2025-02-01', 30, 40),
(156, 3, 699, '2025-02-01', 30, 40),
(157, 23, 699, '2025-02-01', 30, 40),
(158, 16, 699, '2025-02-01', 30, 40),
(159, 136, 699, '2025-02-01', 30, 40),
(160, 136, 699, '2025-02-02', 30, 40),
(161, 166, 699, '2025-02-02', 30, 40),
(162, 11, 699, '2025-02-02', 30, 40),
(163, 11, 699, '2025-02-10', 30, 40),
(164, 166, 699, '2025-02-10', 30, 40),
(165, 166, 699, '2025-02-16', 30, 40),
(166, 166, 699, '2025-02-23', 30, 40),
(167, 16, 699, '2025-02-23', 30, 40),
(168, 16, 899, '2025-02-03', 30, 41),
(169, 1, 899, '2025-02-03', 30, 41),
(170, 166, 899, '2025-02-03', 30, 41),
(171, 166, 899, '2025-02-10', 30, 41),
(172, 16, 899, '2025-02-10', 30, 41),
(173, 5, 899, '2025-02-10', 30, 41),
(174, 5, 899, '2025-02-16', 30, 41),
(175, 166, 899, '2025-02-16', 30, 41),
(176, 26, 899, '2025-02-16', 30, 41),
(177, 2, 899, '2025-02-24', 30, 41),
(178, 166, 999, '2025-02-24', 30, 41),
(179, 166, 1399, '2025-03-01', 20, 42),
(180, 163, 1399, '2025-03-01', 20, 42),
(181, 13, 1399, '2025-03-01', 20, 42),
(182, 13, 1399, '2025-03-07', 20, 42),
(183, 166, 1399, '2025-03-07', 20, 42),
(184, 166, 1399, '2025-03-14', 19, 42),
(185, 26, 1799, '2025-03-14', 20, 42),
(186, 93, 1399, '2025-03-14', 20, 42),
(187, 166, 1399, '2025-03-21', 20, 42),
(188, 166, 1399, '2025-03-28', 20, 42),
(189, 12, 1399, '2025-03-28', 20, 42),
(190, 33, 1399, '2025-03-28', 20, 42),
(191, 58, 1399, '2025-03-28', 20, 42),
(192, 4, 699, '2025-02-12', 30, 43),
(193, 166, 799, '2025-03-06', 30, 43),
(194, 166, 799, '2025-03-13', 40, 43),
(195, 166, 799, '2025-03-20', 30, 43),
(196, 4, 699, '2025-02-12', 30, 44),
(197, 166, 799, '2025-03-07', 30, 44),
(198, 166, 700, '2025-02-14', 30, 44),
(199, 166, 699, '2025-03-21', 29, 44),
(200, 166, 699, '2025-02-05', 28, 44),
(201, 177, 699, '2025-02-05', 30, 44),
(202, 161, 699, '2025-02-08', 30, 45),
(203, 111, 699, '2025-02-08', 30, 45),
(204, 131, 699, '2025-02-08', 30, 45),
(205, 31, 699, '2025-02-08', 30, 45),
(206, 5, 699, '2025-02-08', 30, 45),
(207, 40, 699, '2025-02-08', 30, 45),
(208, 40, 699, '2025-02-15', 30, 45),
(209, 161, 699, '2025-02-15', 30, 45),
(210, 131, 699, '2025-02-15', 30, 45),
(211, 31, 699, '2025-02-15', 30, 45),
(212, 13, 699, '2025-02-15', 30, 45),
(213, 9, 799, '2025-02-15', 30, 45),
(214, 9, 799, '0000-00-00', 30, 45),
(215, 35, 799, '0000-00-00', 30, 45),
(216, 82, 799, '0000-00-00', 30, 45),
(217, 161, 799, '0000-00-00', 30, 45),
(218, 15, 799, '0000-00-00', 30, 45),
(219, 15, 999, '2025-02-14', 30, 46),
(220, 15, 999, '2025-02-12', 30, 46),
(221, 15, 999, '2025-02-18', 30, 46),
(222, 15, 999, '2025-02-22', 30, 46),
(223, 131, 999, '2025-02-22', 30, 46),
(224, 171, 999, '2025-02-22', 30, 46),
(225, 95, 999, '2025-02-22', 30, 46),
(226, 161, 999, '2025-02-22', 30, 46),
(227, 40, 999, '2025-02-22', 30, 46),
(228, 12, 1299, '2025-04-10', 30, 47),
(229, 4, 1299, '2025-04-10', 30, 47),
(230, 41, 1299, '2025-04-10', 30, 47),
(231, 67, 1299, '2025-04-10', 30, 47),
(232, 167, 1299, '2025-04-10', 30, 47),
(233, 167, 1299, '2025-03-10', 30, 47),
(234, 17, 1299, '2025-03-10', 30, 47),
(235, 82, 1299, '2025-03-10', 30, 47),
(236, 82, 1299, '2025-02-10', 30, 47),
(237, 12, 1299, '2025-02-10', 30, 47),
(238, 55, 1299, '2025-02-10', 30, 47),
(239, 99, 1299, '2025-02-10', 30, 47),
(240, 60, 1299, '2025-02-10', 30, 47),
(241, 64, 999, '2025-02-09', 30, 48),
(242, 84, 999, '2025-02-09', 30, 48),
(243, 111, 999, '2025-02-09', 30, 48),
(244, 171, 999, '2025-02-09', 30, 48),
(245, 2, 999, '2025-02-09', 30, 48),
(246, 29, 999, '2025-02-09', 30, 48),
(247, 97, 999, '2025-02-09', 30, 48),
(248, 127, 999, '2025-02-27', 30, 48),
(249, 57, 999, '2025-02-27', 30, 48),
(250, 47, 999, '2025-02-27', 30, 48),
(251, 2, 999, '2025-02-27', 30, 48),
(252, 112, 999, '2025-02-27', 30, 48),
(253, 11, 999, '2025-02-27', 30, 48),
(254, 62, 999, '2025-03-07', 30, 48),
(255, 12, 999, '2025-03-07', 30, 48),
(256, 21, 999, '2025-03-17', 30, 48),
(257, 112, 999, '2025-03-17', 30, 48),
(258, 42, 999, '2025-03-17', 30, 48),
(259, 92, 999, '2025-03-17', 30, 48),
(260, 77, 999, '2025-04-12', 30, 48),
(261, 55, 999, '2025-04-12', 30, 48),
(262, 12, 999, '2025-04-12', 30, 48),
(263, 12, 1299, '2025-02-01', 30, 49),
(264, 12, 1299, '2025-03-01', 30, 49),
(265, 12, 1299, '2025-04-01', 30, 49),
(266, 12, 1299, '2025-05-01', 30, 49),
(267, 12, 1299, '2025-02-19', 30, 49),
(268, 12, 1299, '2025-03-19', 30, 49),
(269, 12, 1299, '2025-04-19', 30, 49),
(270, 12, 1299, '2025-05-19', 30, 49),
(271, 12, 1299, '2025-06-19', 30, 49),
(272, 121, 1299, '2025-06-19', 30, 49),
(273, 121, 1299, '2025-03-19', 30, 49),
(274, 71, 1299, '2025-03-19', 30, 49),
(275, 88, 1299, '2025-03-19', 30, 49),
(276, 88, 799, '2025-03-11', 30, 50),
(277, 11, 799, '2025-03-11', 30, 50),
(278, 161, 799, '2025-03-11', 30, 50),
(279, 111, 799, '2025-03-11', 30, 50),
(280, 41, 799, '2025-03-11', 30, 50),
(281, 141, 799, '2025-02-13', 30, 50),
(282, 161, 799, '2025-02-13', 30, 50),
(284, 11, 799, '2025-02-13', 30, 50),
(285, 161, 799, '2025-02-21', 30, 50),
(286, 51, 799, '2025-02-21', 30, 50),
(287, 31, 799, '2025-02-21', 30, 50),
(288, 11, 799, '2025-02-21', 30, 50),
(289, 6, 799, '2025-02-21', 30, 50),
(290, 16, 799, '2025-03-21', 30, 50),
(291, 161, 799, '2025-03-21', 30, 50),
(292, 3, 799, '2025-03-21', 30, 50),
(293, 15, 799, '2025-03-21', 30, 50),
(294, 25, 799, '2025-03-21', 30, 50),
(295, 44, 799, '2025-03-21', 30, 50),
(296, 44, 799, '2025-03-21', 30, 50),
(298, 161, 799, '2025-03-21', 30, 50),
(299, 31, 799, '2025-03-21', 30, 50),
(300, 5, 799, '2025-03-21', 30, 50),
(301, 1, 1199, '2025-02-11', 30, 51),
(302, 161, 1199, '2025-02-11', 30, 51),
(303, 121, 1199, '2025-02-11', 30, 51),
(304, 41, 1199, '2025-02-11', 30, 51),
(305, 141, 1199, '2025-03-11', 30, 51),
(306, 161, 1199, '2025-03-11', 30, 51),
(307, 21, 1199, '2025-03-11', 30, 51),
(308, 31, 1199, '2025-03-11', 30, 51),
(309, 31, 1199, '2025-04-11', 30, 51),
(310, 51, 1199, '2025-04-11', 30, 51),
(311, 61, 1199, '2025-04-11', 30, 51),
(312, 161, 1199, '2025-04-11', 30, 51),
(313, 161, 599, '2025-02-10', 30, 52),
(314, 161, 799, '2025-02-10', 30, 52),
(315, 161, 799, '2025-02-17', 30, 52),
(316, 161, 799, '2025-02-21', 30, 52),
(317, 11, 799, '2025-02-10', 30, 52),
(318, 15, 799, '2025-02-10', 30, 52),
(319, 32, 799, '2025-02-10', 30, 52),
(320, 32, 799, '2025-02-17', 30, 52),
(321, 72, 799, '2025-02-17', 30, 52),
(322, 46, 799, '2025-02-17', 30, 52),
(323, 58, 799, '2025-02-17', 30, 52),
(324, 58, 799, '2025-02-21', 30, 52),
(325, 1, 799, '2025-02-21', 30, 52),
(326, 23, 799, '2025-02-21', 30, 52),
(327, 52, 799, '2025-02-21', 30, 52),
(328, 52, 799, '2025-03-21', 30, 52),
(329, 52, 799, '2025-03-10', 30, 52),
(330, 152, 799, '2025-03-10', 30, 52),
(331, 172, 799, '2025-03-10', 30, 52),
(332, 172, 799, '2025-03-21', 30, 52),
(333, 172, 799, '2025-04-21', 30, 52),
(334, 172, 799, '2025-04-07', 30, 52),
(335, 172, 799, '2025-04-14', 30, 52),
(336, 172, 799, '2025-04-21', 30, 52),
(337, 172, 799, '2025-05-21', 30, 52),
(338, 172, 799, '2025-05-07', 30, 52),
(339, 172, 799, '2025-05-14', 30, 52),
(340, 161, 999, '2025-02-07', 30, 53),
(341, 161, 999, '2025-02-14', 30, 53),
(342, 161, 999, '2025-02-21', 30, 53),
(343, 161, 999, '2025-03-21', 30, 53),
(344, 161, 999, '2025-03-14', 30, 53),
(345, 161, 999, '2025-03-07', 30, 53),
(346, 161, 999, '2025-04-07', 30, 53),
(347, 161, 999, '2025-04-14', 30, 53),
(348, 161, 999, '2025-04-21', 30, 53),
(349, 161, 999, '2025-05-21', 30, 53),
(350, 161, 999, '2025-05-07', 30, 53),
(351, 111, 999, '2025-05-14', 30, 53),
(352, 161, 1299, '2025-02-07', 30, 54),
(353, 161, 1299, '2025-02-14', 30, 54),
(354, 161, 1299, '2025-02-21', 30, 54),
(355, 161, 1299, '2025-03-21', 30, 54),
(356, 161, 1299, '2025-03-14', 30, 54),
(357, 161, 1299, '2025-03-07', 30, 54),
(358, 161, 1299, '2025-04-07', 30, 54),
(359, 161, 1299, '2025-04-14', 30, 54),
(360, 161, 1299, '2025-04-21', 30, 54),
(361, 161, 1299, '2025-05-21', 30, 54),
(362, 161, 1299, '2025-05-07', 30, 54),
(363, 161, 1299, '2025-05-14', 30, 54),
(364, 161, 699, '2025-02-08', 30, 55),
(365, 161, 699, '2025-02-15', 30, 55),
(366, 161, 699, '2025-02-22', 30, 55),
(367, 161, 699, '2025-03-08', 30, 55),
(368, 161, 699, '2025-03-15', 30, 55),
(369, 161, 799, '2025-02-07', 30, 56),
(370, 161, 799, '2025-03-07', 30, 56),
(371, 161, 799, '2025-04-07', 30, 56),
(372, 161, 799, '2025-02-14', 30, 56),
(373, 161, 799, '2025-03-14', 30, 56),
(374, 161, 799, '2025-04-14', 30, 56),
(375, 161, 799, '2025-02-21', 30, 56),
(376, 161, 799, '2025-03-21', 30, 56),
(377, 161, 799, '2025-04-21', 30, 56),
(378, 11, 799, '2025-04-21', 30, 56),
(379, 31, 799, '2025-04-21', 30, 56),
(380, 31, 799, '2025-02-21', 30, 56),
(381, 31, 799, '2025-03-21', 30, 56),
(382, 31, 799, '2025-03-14', 30, 56),
(383, 31, 799, '2025-02-14', 30, 56),
(384, 31, 999, '2025-02-07', 30, 57),
(385, 131, 999, '2025-02-07', 30, 57),
(386, 161, 999, '2025-02-07', 30, 57),
(387, 161, 999, '2025-02-14', 30, 57),
(388, 161, 999, '2025-02-21', 30, 57),
(389, 161, 999, '2025-03-21', 30, 57),
(390, 161, 999, '2025-04-21', 30, 57),
(391, 161, 999, '2025-04-07', 30, 57),
(392, 161, 999, '2025-04-14', 30, 57),
(393, 11, 999, '2025-04-14', 30, 57),
(394, 166, 499, '2025-02-07', 30, 58),
(395, 166, 499, '2025-02-14', 30, 58),
(396, 166, 499, '2025-02-21', 30, 58),
(397, 166, 499, '2025-02-28', 30, 58),
(398, 166, 499, '2025-03-07', 30, 58),
(399, 166, 499, '2025-03-14', 30, 58),
(400, 166, 499, '2025-03-21', 30, 58),
(401, 166, 799, '2025-02-12', 30, 59),
(402, 166, 799, '2025-02-19', 30, 59),
(403, 166, 799, '2025-02-26', 30, 59),
(404, 166, 799, '2025-03-06', 30, 59),
(405, 166, 799, '2025-02-13', 30, 59),
(406, 166, 799, '2025-03-20', 30, 59),
(407, 166, 999, '2025-02-11', 30, 60),
(408, 166, 999, '2025-02-20', 30, 60),
(409, 166, 999, '2025-02-28', 30, 60),
(410, 166, 999, '2025-03-05', 30, 60),
(411, 166, 999, '2025-03-15', 30, 60),
(412, 166, 999, '2025-03-20', 30, 60),
(413, 166, 999, '2025-03-28', 30, 60),
(414, 161, 599, '2025-02-13', 30, 61),
(415, 161, 599, '2025-02-18', 30, 61),
(416, 161, 599, '2025-02-25', 30, 61),
(417, 161, 599, '2025-03-05', 30, 61),
(418, 161, 599, '2025-03-17', 30, 61),
(419, 161, 599, '2025-03-27', 30, 61),
(420, 161, 599, '2025-04-03', 30, 61),
(421, 161, 599, '2025-04-17', 30, 61),
(422, 166, 599, '2025-04-25', 30, 61),
(423, 166, 899, '2025-02-04', 30, 62),
(424, 166, 899, '2025-02-12', 30, 62),
(425, 166, 899, '2025-02-19', 30, 62),
(426, 166, 899, '2025-02-27', 30, 62),
(427, 166, 899, '2025-03-11', 30, 62),
(428, 166, 899, '2025-03-19', 30, 62),
(429, 166, 899, '2025-03-26', 30, 62),
(430, 166, 899, '2025-04-11', 30, 62),
(431, 166, 899, '2025-02-04', 30, 62),
(432, 166, 899, '2025-02-12', 30, 62),
(433, 166, 899, '2025-02-19', 30, 62),
(434, 166, 899, '2025-02-27', 30, 62),
(435, 166, 899, '2025-03-11', 30, 62),
(436, 166, 899, '2025-03-19', 30, 62),
(437, 166, 899, '2025-03-26', 30, 62),
(438, 166, 899, '2025-04-11', 30, 62),
(439, 166, 1199, '2025-02-13', 30, 63),
(440, 166, 1199, '2025-02-20', 30, 63),
(441, 166, 1199, '2025-02-28', 30, 63),
(442, 166, 1199, '2025-03-12', 30, 63),
(443, 166, 1199, '2025-03-21', 30, 63),
(444, 166, 1199, '2025-04-02', 30, 63),
(445, 166, 1199, '2025-04-16', 30, 63),
(446, 1, 699, '2025-05-09', 30, 18),
(447, 1, 699, '2025-08-07', 30, 18);

-- --------------------------------------------------------

--
-- Table structure for table `passport_info`
--

CREATE TABLE `passport_info` (
  `passport_info_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `passport_number` varchar(20) NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passport_info`
--

INSERT INTO `passport_info` (`passport_info_id`, `booking_id`, `full_name`, `passport_number`, `expiration_date`) VALUES
(1, 1, 'Frost', 'ABAB20-29', '2027-06-29'),
(2, 2, 'Sara', 'JKSfa0-1231', '2027-10-20'),
(3, 3, 'Sara', 'JKSfa0-1231', '2027-10-20'),
(4, 4, 'John Doe', 'fdsaf231-12', '2027-10-08'),
(5, 5, 'Lynn Myat', 'ABAB20-29', '2027-01-01'),
(6, 6, 'John Doe', '215SA-SADA', '2027-10-27'),
(7, 6, 'Jane Doe', '55KKAI-AKU', '2027-10-02'),
(8, 6, 'Smith Doe', 'YAU-AJAU', '2027-06-08'),
(9, 6, 'Jonny Doe', 'JAU-A47U', '2025-10-14'),
(10, 7, 'Min Khant Kyaw Swar', 'ABAB20-29', '2027-12-31'),
(11, 8, 'Jane Doe', '2J5SA-SADA', '2027-06-09'),
(12, 9, 'Zwe Thuta', '215SA-SADA', '2026-06-09'),
(13, 9, 'Khin', 'SHKAI-AKU', '2027-10-09'),
(14, 10, 'Nyi Say Min Htet', 'BJA01-15F', '2025-10-21'),
(15, 10, 'Shaun', 'AKDI1-18P', '2026-10-22'),
(16, 11, 'Min Khant Kyaw Swar', '215SA-SADA', '2025-10-15'),
(17, 11, 'Kim Chae Won', 'PAOQIA-12', '2025-10-14'),
(18, 12, 'Emily', 'PJY11-15F', '2028-02-16'),
(19, 13, 'daniellee', 'UWQIQ-1231', '2027-06-15'),
(20, 14, 'Daniellee', '2J5SA-SADA', '2026-06-09'),
(21, 15, 'Min Khant Kyaw Swar', '215SA-SADA', '2027-10-13'),
(22, 16, 'Min Khant Kyaw Swar', '215SA-SADA', '2027-02-17'),
(23, 17, 'Winter', 'UWQIQ-1231', '2025-10-22'),
(24, 17, 'Shaun', 'AKDI1-18P', '2028-10-24'),
(25, 18, 'Winter', 'BJA01-15F', '2029-06-05'),
(26, 19, 'Bunny', 'BC-01101', '2027-10-13'),
(27, 20, 'Bunny', 'GSDQ-1231', '2027-10-21'),
(28, 21, 'Bunny', 'QDQQ-1231', '2027-06-15'),
(29, 22, 'Bunny', 'QDQQ-1231', '2028-06-13'),
(30, 23, 'Bunny', 'QDQQ-1231', '2027-06-15'),
(31, 24, 'Min Khant Kyaw Swar', '1DAIQ-1231', '2027-06-09'),
(32, 25, 'Min Khant Kyaw Swar', '1DAIQ-1231', '2027-06-15'),
(33, 36, 'John Doe', 'X1234567890', '2026-11-12'),
(34, 37, 'Mia Wang', 'Y9876543210', '2025-08-22'),
(35, 38, 'Maxim Petrov', 'Z1230987654', '2027-01-30'),
(36, 39, 'Siti Rahman', 'A3456789012', '2026-05-19'),
(37, 40, 'Alexandre Dupont', 'B8765432109', '2026-10-14'),
(38, 41, 'Keiko Tanaka', 'C1234509876', '2027-03-25'),
(39, 42, 'Anna Ivanova', 'D9876105432', '2026-07-18'),
(40, 43, 'David Kwon', 'E6543219876', '2025-12-02'),
(41, 44, 'Olga Volkova', 'F4321098765', '2026-04-10'),
(42, 45, 'Carlos Ramirez', 'G9876543123', '2027-02-27'),
(43, 46, 'Daw Thu Thu Zan', '2J5SA-SADA', '2026-06-02'),
(44, 46, 'Shaun', 'SHKAI-AKU', '2025-01-30'),
(45, 46, 'Smith Doe', 'YAU-AJAU', '2027-06-22'),
(46, 46, 'Jonny Doe', 'JAU-AU', '2026-02-11');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_name`) VALUES
(1, 'Credit Card'),
(2, 'Debit Card');

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `region_id` int(11) NOT NULL,
  `region_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`region_id`, `region_name`) VALUES
(1, 'North America'),
(2, 'South America'),
(3, 'Europe'),
(4, 'Asia'),
(5, 'Africa'),
(6, 'Australia'),
(7, 'Antarctica'),
(8, 'Oceania');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `review_title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `rating` int(5) NOT NULL,
  `created_at` varchar(30) NOT NULL,
  `user` int(11) NOT NULL,
  `destination` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `review_title`, `description`, `rating`, `created_at`, `user`, `destination`) VALUES
(1, 'Looks Pretty Awesome', 'I want to do there someday, when i have a lot of time! :-)', 4, '2025-01-05T15:17:37.813Z', 3, 2),
(2, 'I\'ve Been there', 'I have been there last year and it\'s pretty awesome city. I recommend y\'all to go there!', 5, '2025-01-05T15:20:00.328Z', 2, 3),
(3, 'This is too Awesome', 'I\'ll get there in this holiday!', 5, '2025-01-05T18:40:40.179Z', 10, 2),
(4, 'This is my top 1 city to visit', 'I will eat all the street foods and drinks!', 3, '2025-01-05T19:14:17.149Z', 2, 4),
(5, 'It\'s beautiful', 'I\'d like to visit this place', 4, '2025-01-08T05:12:54.923Z', 28, 2),
(6, 'Well it was great trip', 'I had been there, but for my job. I wish i could go there just to enjoy scenery and Japanese Foods!\n', 5, '2025-01-08T06:50:09.492Z', 6, 4),
(7, 'Great View', 'I haven\'t been there with this tour but I went there with my family in the last August and it was really fun!\n ', 3, '2025-01-08T06:55:18.917Z', 7, 3),
(8, 'Yes Yes Yes ', 'This is where I want to visit the most in Myanmar. I want to pay homage to Shwe Dagon Pagoda, even though I\'m not Burmese!', 4, '2025-01-08T06:56:39.829Z', 7, 1),
(9, 'Kyanaw sor nk twr lo ya lr', 'Tagl pyw dr, tagl twr chin loh', 4, '2025-01-10T03:36:18.844Z', 4, 6),
(10, 'Phukat Experience', 'The Phuket Experience is a journey into the heart of Thailand’s most vibrant island. From golden beaches and turquoise waters to ancient temples and cultural treasures, Phuket offers an unforgettable blend of natural beauty, adventure, and rich heritage.', 2, '2025-01-10T04:32:05.269Z', 8, 8),
(11, 'I think this is the best place to visit', 'Yes I haven\'t been there but I would like to go there if I had a chance', 4, '2025-01-10T04:44:16.224Z', 29, 5),
(12, 'The place to visit in Europe', 'I like to be there, with my girlfriends', 4, '2025-01-10T04:45:09.777Z', 29, 7),
(13, 'I would like to visit there', 'I want to go to Shwe Dagon', 4, '2025-01-10T04:45:39.248Z', 29, 1),
(14, 'Paris is everything you’ve heard, and more.', 'My recent trip to Paris was nothing short of magical. From the moment I arrived, I was captivated by the city’s blend of history, art, and unparalleled charm. Paris truly lives up to its reputation as the City of Light, and here’s why:\n\nEiffel Tower – A Must-See Icon\nI’ve seen the Eiffel Tower in countless photos, but nothing compares to experiencing it in person. Standing beneath it and taking the elevator to the top for a panoramic view of Paris was an unforgettable moment. The tower sparkles every evening, and it’s impossible not to feel the magic when you see it lit up against the night sky.\n\nCultural Richness at the Louvre\nAs an art lover, visiting the Louvre was like stepping into a dream. The collection of art, from the Mona Lisa to ancient Egyptian artifacts, left me in awe. The museum is vast, so I highly recommend planning ahead to focus on the sections that interest you most.\n\nSavoring French Cuisine\nParis is heaven for foodies! I enjoyed everything from delicious pastries at local patisseries to decadent dinners at Michelin-starred restaurants. Don’t miss the opportunity to have', 5, '2025-01-10T04:47:20.845Z', 29, 3),
(15, 'Wanna go there with my Friends', 'Its been one of my dream destination', 4, '2025-01-13T05:26:11.136Z', 11, 3),
(16, 'Looks pretty good', 'Went there with my parents last summer', 3, '2025-01-13T05:27:02.526Z', 11, 7),
(17, 'it does look nice', 'It would be my next trip', 5, '2025-01-13T05:27:30.132Z', 11, 2),
(18, 'I also want to be there', 'Looks pretty niche', 2, '2025-01-13T05:27:54.956Z', 11, 1),
(19, 'Best Place to visit in Myanmar', 'I have been there and it was amazing', 3, '2025-01-13T06:04:00.714Z', 12, 1),
(20, 'I went there last winter', 'You should travel there at least once!', 5, '2025-01-13T06:04:30.563Z', 12, 6),
(21, 'Does it even great to visit this days?', 'I heard it is not safe to go there alone.', 1, '2025-01-13T06:05:26.583Z', 12, 7),
(22, 'This look nice', 'I always wanted to visit there', 3, '2025-01-18T15:16:42.807Z', 2, 8),
(23, 'let me visit there tooo', 'My top 10 dream location!', 5, '2025-01-18T15:23:51.686Z', 2, 6),
(24, 'Looks pretty awesome!', 'this looks fantastic', 4, '2025-01-18T15:28:11.422Z', 2, 7),
(25, 'Best location', '\nSydney is an incredible city that combines the best of both nature and modernity. The harbor views are breathtaking, especially when you see the Sydney Opera House and Harbour Bridge in person — it’s like stepping into a postcard! The beaches are fantastic too, perfect for a relaxed day out. There’s always something to do, whether you’re into arts, food, or outdoor adventures. The food scene is amazing, offering a mix of local and international flavors. Overall, Sydney has this perfect balance of energy and relaxation, making it an unforgettable place to visit!', 5, '2025-01-18T15:34:56.488Z', 13, 6),
(26, 'It does look like golden city', 'I want to visit Yangon!', 5, '2025-01-18T18:43:59.255Z', 13, 1),
(27, 'Such a nice place', 'want to visit there with my friends!\n', 4, '2025-01-18T19:24:02.374Z', 14, 8),
(28, 'haven\'t been there but always a dream place', 'I would like to go such location!', 5, '2025-01-18T19:30:20.570Z', 14, 3),
(29, 'great experience!', 'Have you been there?\nYou won\'t even want to come back!', 5, '2025-01-18T19:33:38.922Z', 14, 6),
(30, 'Beach!!', 'It looks so interesting and relaxing!', 4, '2025-01-18T19:41:42.534Z', 14, 5),
(39, 'cozy and chill place to live ', 'I have lived there since my childhood and i totally recommend you to go there', 5, '2025-01-19T18:47:57.805Z', 3, 2),
(41, 'Might be the best trekking trip ever!', 'Wow, It looks amazing', 5, '2025-01-21T08:44:16.741Z', 3, 12),
(56, 'So great', 'I live there', 4, '2025-01-21T09:21:02.446Z', 3, 1),
(57, 'Yes it is fun!', 'I have been there when i was young and I booked it to go there next month.', 5, '2025-01-21T09:45:11.309Z', 3, 5),
(58, 'Amazing Experience', 'The views were breathtaking, had a great time!', 5, '2024-10-15', 2, 1),
(59, 'Not Worth It', 'The place was crowded and overpriced.', 2, '2024-09-20', 3, 2),
(60, 'Perfect Getaway', 'Peaceful and serene, ideal for a relaxing weekend.', 5, '2024-07-25', 4, 3),
(61, 'Could Be Better', 'The staff wasn’t friendly, but the food was good.', 3, '2024-11-05', 5, 4),
(62, 'Disappointing Visit', 'Not as advertised. Expected more from the experience.', 2, '2024-09-10', 6, 5),
(63, 'Stunning Views', 'Amazing landscapes, but too many tourists for my liking.', 4, '2024-08-30', 7, 6),
(64, 'Wonderful Trip', 'An unforgettable vacation! Highly recommend it.', 5, '2024-09-12', 8, 7),
(65, 'Loved the Food', 'The local cuisine was delicious, definitely coming back.', 4, '2024-06-18', 9, 8),
(66, 'Peaceful Retreat', 'A perfect place for a quiet vacation away from everything.', 5, '2024-10-03', 10, 9),
(67, 'Overrated', 'The location wasn’t as exciting as I expected.', 3, '2024-11-20', 11, 10),
(68, 'Not Impressed', 'Too noisy and crowded. Wouldn’t visit again.', 2, '2024-08-25', 12, 11),
(69, 'Great Beach', 'Loved the beach but the hotel experience was poor.', 3, '2024-07-10', 13, 12),
(70, 'Awesome Stay', 'Everything was perfect, from the service to the location.', 5, '2024-09-01', 14, 1),
(71, 'Would Visit Again', 'The people were friendly, and the views were breathtaking.', 4, '2024-08-15', 15, 2),
(72, 'Unforgettable Experience', 'The trip was incredible! Would love to visit again soon.', 5, '2024-07-30', 16, 3),
(73, 'Nice But Expensive', 'The destination was great, but it didn’t justify the cost.', 3, '2024-06-05', 17, 4),
(74, 'Great Vibes', 'Perfect for a quick weekend escape, loved it!', 4, '2024-10-20', 18, 5),
(75, 'Not for Me', 'Too remote and isolated, didn’t enjoy the stay.', 2, '2024-11-12', 19, 6),
(76, 'Loved the History', 'The destination was full of history and interesting sites.', 4, '2024-09-03', 20, 7),
(77, 'Best Vacation Ever', 'Best trip of my life, everything was perfect!', 5, '2024-06-30', 21, 8),
(78, 'Mediocre', 'Nothing special, could have been better.', 3, '2024-10-10', 22, 9),
(79, 'Incredible Views', 'The views were amazing, but the accommodation wasn’t great.', 3, '2024-07-05', 23, 10),
(80, 'Wonderful Experience', 'Truly a wonderful experience, highly recommend!', 5, '2024-09-18', 24, 11),
(81, 'Not Worth the Hype', 'The place was nice, but not as hyped as I expected.', 3, '2024-10-22', 25, 12),
(82, 'Friendly Staff', 'The locals were so welcoming, had a lovely time!', 5, '2024-06-22', 26, 1),
(83, 'Terrible Service', 'Service was poor, the staff didn’t seem interested in helping.', 1, '2024-08-05', 27, 2),
(84, 'Fantastic Trip', 'Everything was perfect! A trip to remember.', 5, '2024-07-15', 28, 3),
(85, 'Not Great Value', 'The price didn’t match the experience.', 2, '2024-09-09', 29, 4),
(86, 'Amazing Adventure', 'Such an adventure! Loved every moment of the trip.', 5, '2024-08-18', 30, 5),
(87, 'Nice Place, But Overcrowded', 'Too many tourists, but still a nice place to visit.', 3, '2024-10-07', 31, 6),
(88, 'Nice, But Could Improve', 'The location was nice, but there were areas for improvement.', 3, '2024-06-10', 32, 7),
(89, 'Great for Families', 'Perfect place for family trips with a lot of activities for kids.', 4, '2024-09-24', 33, 8),
(90, 'Not Worth It', 'The trip was a waste of money. Wouldn’t recommend it.', 1, '2024-07-25', 34, 9),
(91, 'Wonderful Location', 'Great location, would definitely recommend!', 4, '2024-08-01', 35, 10),
(92, 'Lovely Destination', 'Lovely experience, perfect for a short break.', 4, '2024-06-25', 36, 11),
(93, 'Great Experience', 'A great experience overall, very enjoyable.', 4, '2024-09-15', 37, 12),
(94, 'Disappointing', 'The destination didn’t live up to the hype.', 2, '2024-08-08', 38, 1),
(95, 'Unforgettable', 'Amazing time! Beautiful views and fantastic culture.', 5, '2024-09-30', 39, 2),
(96, 'Worth the Price', 'The experience was totally worth the price.', 5, '2024-07-01', 40, 3),
(97, 'Could Be Better', 'Good experience, but the accommodation could have been better.', 3, '2024-10-18', 41, 4),
(98, 'Too Expensive', 'I didn’t think it was worth the money.', 2, '2024-09-05', 42, 5),
(99, 'Beautiful Destination', 'A beautiful place, but not ideal for long stays.', 3, '2024-06-20', 43, 6),
(100, 'Amazing Trip', 'Had an amazing time, would visit again!', 5, '2024-08-25', 44, 7),
(101, 'Nice, But Lacking', 'Great place, but I expected more activities.', 3, '2024-10-12', 45, 8),
(102, 'Unimpressed', 'The place was underwhelming and too crowded.', 2, '2024-07-05', 46, 9),
(103, 'Great Vibe', 'Loved the vibe of the place. Definitely coming back!', 5, '2024-06-15', 47, 10),
(104, 'Not What I Expected', 'The location was nice, but not what I had imagined.', 3, '2024-11-02', 48, 11),
(105, 'Fantastic Location', 'Perfect spot for a peaceful vacation. Highly recommended!', 4, '2024-09-23', 49, 12),
(106, 'Amazing Resort', 'The resort was amazing, will come again for sure!', 5, '2024-07-18', 50, 1),
(107, 'Good But Overhyped', 'The destination was nice, but not as great as people say.', 3, '2024-08-14', 51, 2),
(108, 'Good Stay', 'Had a good stay, though I expected more luxury.', 3, '2024-09-29', 52, 3),
(109, 'Loved It', 'Had a fantastic time, one of the best trips!', 5, '2024-10-01', 53, 4),
(110, 'Great Time', 'Great time with friends, a fun-filled trip!', 4, '2024-11-03', 54, 5),
(111, 'Too Noisy', 'The place was too noisy, not great for a peaceful vacation.', 2, '2024-07-08', 55, 6),
(112, 'Worth Every Penny', 'The experience was totally worth it! Highly recommend!', 5, '2024-10-25', 56, 7),
(113, 'Great Experience', 'Wonderful trip with so many activities, loved it.', 5, '2024-06-27', 57, 8),
(114, 'Terrible Stay', 'The stay was horrible, I won’t be returning.', 1, '2024-08-02', 58, 9),
(115, 'Not Bad', 'The location was good, but nothing special about the place.', 3, '2024-09-07', 59, 10),
(116, 'Really Fun', 'Had a great time, will come back soon!', 5, '2024-06-12', 60, 11),
(117, 'A Nice Experience', 'Nice location, but needs improvement on facilities.', 3, '2024-10-09', 61, 12),
(118, 'Beautiful Views', 'Amazing views, but too expensive for the experience.', 3, '2024-08-18', 62, 1),
(119, 'Great Vacation', 'Had a great time, definitely worth the money.', 5, '2024-09-11', 63, 2),
(120, 'Not Ideal for Families', 'Too many activities, not enough relaxation time.', 2, '2024-07-20', 64, 3),
(121, 'Incredible Place', 'The place was incredible, will definitely visit again.', 5, '2024-10-15', 65, 4),
(122, 'Great Value', 'Wonderful location, great value for the money!', 4, '2024-06-07', 66, 5),
(123, 'Too Crowded', 'The place was too crowded for my liking.', 2, '2024-08-10', 67, 6),
(124, 'A Lovely Place', 'The destination was lovely and the people were welcoming.', 4, '2024-09-13', 68, 7),
(125, 'Loved It', 'Such a beautiful place, I would love to return.', 5, '2024-10-03', 69, 8),
(126, 'Not Impressed', 'Didn’t live up to the hype. Wasn’t as nice as expected.', 2, '2024-07-03', 70, 9),
(127, 'Amazing Resort', 'The resort was incredible, highly recommend for a getaway.', 5, '2024-06-25', 71, 10),
(128, 'Great Experience', 'Such a memorable experience, enjoyed every moment.', 4, '2024-08-30', 72, 11),
(129, 'Perfect for Relaxation', 'If you need relaxation, this is the place to go.', 5, '2024-09-05', 73, 12),
(130, 'Not Worth the Price', 'The location was nice, but didn’t justify the cost.', 2, '2024-06-22', 74, 1),
(131, 'A Good Trip', 'The trip was good, but the accommodations were average.', 3, '2024-10-16', 75, 2),
(132, 'Fantastic Views', 'The views were amazing, highly recommend the destination.', 4, '2024-08-19', 76, 3),
(133, 'Horrible Experience', 'The experience was terrible. Would not recommend.', 1, '2024-07-30', 77, 4),
(134, 'Nice for a Weekend', 'Great place for a quick weekend trip. Enjoyed it.', 4, '2024-09-20', 78, 5),
(135, 'Great Place', 'Amazing location with lots of activities for families.', 5, '2024-06-28', 79, 6),
(136, 'Could Be Better', 'Good trip, but there were some improvements needed.', 3, '2024-08-12', 80, 7),
(137, 'Worth Visiting', 'Great place to visit, would love to return.', 4, '2024-07-11', 81, 8),
(138, 'Nice Location', 'The location was great, but the experience could have been better.', 3, '2024-09-25', 82, 9),
(139, 'Nice Experience', 'The trip was nice, but there’s room for improvement.', 3, '2024-06-08', 83, 10),
(140, 'Perfect for Relaxing', 'A great place to relax and unwind from the daily hustle.', 4, '2024-10-05', 84, 11),
(141, 'Incredible Stay', 'Had an unforgettable stay, would recommend to anyone!', 5, '2024-08-22', 85, 12),
(142, 'Disappointing', 'Didn’t meet expectations. Would not recommend.', 2, '2024-09-18', 86, 1),
(143, 'Great Trip', 'Overall, it was a great trip. Highly recommend!', 5, '2024-10-13', 87, 2),
(144, 'Too Expensive', 'Good place but way too expensive for what you get.', 2, '2024-07-21', 88, 3),
(145, 'Could Be Better', 'It was good but I expected more for the price.', 3, '2024-06-19', 89, 4),
(146, 'Great Stay', 'Had a wonderful time. Beautiful place and people.', 5, '2024-09-27', 90, 5),
(147, 'Amazing Location', 'Perfect location with stunning views and good amenities.', 4, '2024-07-12', 91, 6),
(148, 'Not Worth It', 'I expected more for the money spent.', 2, '2024-06-30', 92, 7),
(149, 'Beautiful Trip', 'One of the best vacations I’ve had, everything was perfect!', 5, '2024-08-13', 93, 8),
(150, 'Great Service', 'The service was excellent, the staff was very helpful.', 5, '2024-10-21', 94, 9),
(151, 'Good Trip', 'Overall, it was a good trip, but not extraordinary.', 3, '2024-09-03', 95, 10),
(152, 'Fantastic Location', 'The location was stunning, would visit again!', 4, '2024-06-26', 96, 11),
(153, 'Incredible Views', 'Beautiful scenery, I had an amazing time.', 5, '2024-09-04', 97, 12),
(154, 'Unimpressed', 'I didn’t feel the destination lived up to the expectations.', 2, '2024-07-15', 98, 1),
(155, 'Loved It', 'Wonderful vacation! Everything was just perfect.', 5, '2024-06-10', 99, 2),
(156, 'Okay Experience', 'It was an okay experience, but I expected more.', 3, '2024-08-04', 100, 3);

-- --------------------------------------------------------

--
-- Table structure for table `saveditems`
--

CREATE TABLE `saveditems` (
  `saved_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `package` int(11) NOT NULL,
  `price` int(20) NOT NULL,
  `saved_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tourguide`
--

CREATE TABLE `tourguide` (
  `guide_id` int(11) NOT NULL,
  `guide_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `language` varchar(255) NOT NULL,
  `exp_years` int(11) NOT NULL,
  `guide_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tourguide`
--

INSERT INTO `tourguide` (`guide_id`, `guide_name`, `email`, `description`, `language`, `exp_years`, `guide_image`) VALUES
(1, 'Ko Toe Gyi', 'toegyi@gmail.com', 'Toe Gyi is an experienced and passionate tour guide with a deep knowledge of local culture, history, and landmarks. With over 5 years of experience in guiding tours across various regions, Toe Gyi is dedicated to providing memorable and informative experiences for travelers. Fluent in French, Spanish, English and Burmese, Toe Gyi is able to communicate effectively with a wide range of tourists and ensure they have an enriching experience.\r\n\r\nToe Gyi’s tours are known for their engaging storytelling, offering unique insights into the historical significance of each destination. Whether it\'s exploring ancient temples, discovering hidden gems, or experiencing local traditions, Toe Gyi brings a personal touch to every tour, making sure each guest feels welcomed and comfortable.', 'Burmese, English, French, Spanish', 10, 'pictures/guide/6794e59aadc22_kotoegyi.jpg'),
(2, 'Nyi Say', 'nyisay@gmail.com', 'Nyi Say is an experienced and passionate tour guide with a deep knowledge of local culture, history, and landmarks. With over 5 years of experience in guiding tours across various regions, Toe Gyi is dedicated to providing memorable and informative experiences for travelers. Fluent in French, Spanish, English and Burmese. Nyi Say is able to communicate effectively with a wide range of tourists and ensure they have an enriching experience.\r\nNyi Say’s tours are known for their engaging storytelling, offering unique insights into the historical significance of each destination. Whether it\'s exploring ancient temples, discovering hidden gems, or experiencing local traditions, Nyi Say brings a personal touch to every tour, making sure each guest feels welcomed and comfortable.', 'Taiwanese, Burmese, French, English', 5, 'pictures/guide/nyi_say.jpeg'),
(4, 'Michel', 'michel@gmail.com', 'Michel is an experienced and passionate cultural tour guide who has been exploring Tokyo’s rich history and vibrant traditions for over a decade. With a deep appreciation for Japanese culture, he takes pride in sharing the city’s unique blend of ancient temples, serene gardens, and cutting-edge modernity.\r\n\r\nAs you walk through the bustling streets of Tokyo with Michel, you’ll discover not only the iconic landmarks but also the hidden gems that many visitors overlook. Whether it’s guiding you through the sacred grounds of Meiji Shrine or introducing you to the intricate art of tea ceremonies in the heart of the city, Michel’s in-depth knowledge and storytelling skills bring the stories of Tokyo to life.\r\n\r\nWith a focus on immersive experiences, Michel ensures that each tour is tailored to the interests of the group, offering insights into Japanese history, art, architecture, and local traditions. His friendly and approachable manner makes him the perfect guide for anyone looking to experience the heart and soul of Tokyo.', 'Burmese, English, French, Spanish, Japanese', 12, 'pictures/guide/67758666e8858_tour-guide.jpg'),
(5, 'Anna Lee', 'annalee@gmail.com', 'Anna Lee is passionate about showcasing the local cuisine and arts, with years of expertise.', 'English, Korean, Japanese', 8, 'pictures/guide/678088180b586_actr1.jpg'),
(6, 'Johnny Doe', 'johnnydoe@gmail.com', 'John specializes in historical tours and storytelling, offering a detailed exploration of landmarks.', 'English, French, German', 7, 'pictures/guide/67808830aaaf7_act1.jpg'),
(7, 'Maria Gonzalez', 'maria.g@gmail.com', 'Maria brings a vibrant perspective to cultural tours, focusing on hidden gems.', 'Spanish, English, Portuguese', 6, 'pictures/guide/67808842897cd_actr2.jpg'),
(8, 'Hiroshi Tanaka', 'hiroshi.tanaka@gmail.com', 'Hiroshi’s tours highlight the rich traditions and modern facets of Japan.', 'Japanese, English', 15, 'pictures/guide/6780885506ac6_act4.jpg'),
(9, 'Emma Clark', 'emma.clark@gmail.com', 'Emma excels in providing family-friendly tours with engaging storytelling.', 'English, French', 9, 'pictures/guide/6780885d76ed6_actr3.jpg'),
(10, 'Liu Wei', 'liu.wei@gmail.com', 'Liu Wei is a seasoned guide offering immersive experiences in local culture and history.', 'Chinese, English', 11, 'pictures/guide/67808865a08f0_actr4.jpg'),
(11, 'Sofia Rossi', 'sofia.rossi@gmail.com', 'Sofia creates tailored tours that cater to art and history enthusiasts.', 'Italian, English, Spanish', 6, 'pictures/guide/6780886c8c067_actr1.jpg'),
(12, 'Carlos Mendes', 'carlos.mendes@gmail.com', 'Carlos specializes in adventure and nature tours, offering a dynamic experience.', 'Spanish, Portuguese, English', 8, 'pictures/guide/6780887f148be_act3.jpg'),
(13, 'Ayesha Khan', 'ayesha.khan@gmail.com', 'Ayesha provides tours focused on the intersection of culture and cuisine.', 'Urdu, English, Arabic', 5, 'pictures/guide/6780889c681b9_act4.jpg'),
(14, 'Tom Wilson', 'tom.wilson@gmail.com', 'Tom delivers educational tours with a focus on historical accuracy.', 'English, German', 14, 'pictures/guide/nyi_say.jpeg'),
(15, 'Linda Schmidt', 'linda.schmidt@gmail.com', 'Linda’s tours are known for their attention to detail and engaging content.', 'German, English', 13, 'pictures/guide/nyi_say.jpeg'),
(16, 'Fatima Ahmed', 'fatima.ahmed@gmail.com', 'Fatima specializes in tours that highlight local crafts and traditions.', 'Arabic, English', 7, 'pictures/guide/nyi_say.jpeg'),
(17, 'Ivan Petrov', 'ivan.petrov@gmail.com', 'Ivan offers detailed insights into local history and folklore.', 'Russian, English', 12, 'pictures/guide/nyi_say.jpeg'),
(18, 'Laura Martin', 'laura.martin@gmail.com', 'Laura’s tours focus on art history and cultural insights.', 'French, English, Italian', 10, 'pictures/guide/nyi_say.jpeg'),
(19, 'Chen Yong', 'chen.yong@gmail.com', 'Chen provides dynamic tours of urban landscapes and rural traditions.', 'Chinese, English', 9, 'pictures/guide/nyi_say.jpeg'),
(20, 'Grace Kim', 'grace.kim@gmail.com', 'Grace excels in tours that blend local heritage and culinary delights.', 'Korean, English, Japanese', 8, 'pictures/guide/nyi_say.jpeg'),
(21, 'Mohammed Ali', 'mohammed.ali@gmail.com', 'Mohammed’s tours bring history and culture to life through vivid storytelling.', 'Arabic, English, French', 6, 'pictures/guide/nyi_say.jpeg'),
(22, 'Ella Johnson', 'ella.johnson@gmail.com', 'Ella focuses on eco-friendly tours that highlight natural beauty.', 'English, Spanish', 7, 'pictures/guide/nyi_say.jpeg'),
(23, 'Juan Carlos', 'juan.carlos@gmail.com', 'Juan’s tours emphasize local music and dance traditions.', 'Spanish, English', 8, 'pictures/guide/nyi_say.jpeg'),
(24, 'Mei Lin', 'mei.lin@gmail.com', 'Mei’s tours showcase the intersection of tradition and modernity.', 'Chinese, English, Japanese', 12, 'pictures/guide/nyi_say.jpeg'),
(25, 'Dmitry Ivanov', 'dmitry.ivanov@gmail.com', 'Dmitry offers tours with a focus on architecture and history.', 'Russian, English, German', 14, 'pictures/guide/nyi_say.jpeg'),
(26, 'Sarah Lopez', 'sarah.lopez@gmail.com', 'Sarah specializes in cultural tours with an emphasis on local cuisine.', 'Spanish, English, Portuguese', 11, 'pictures/guide/nyi_say.jpeg'),
(27, 'Kenta Saito', 'kenta.saito@gmail.com', 'Kenta highlights traditional Japanese art and festivals in his tours.', 'Japanese, English', 10, 'pictures/guide/nyi_say.jpeg'),
(28, 'Amara Patel', 'amara.patel@gmail.com', 'Amara’s tours are known for their vibrant exploration of local traditions.', 'Hindi, English, Gujarati', 9, 'pictures/guide/nyi_say.jpeg'),
(29, 'Emily Davis', 'emily.davis@gmail.com', 'Emily provides tours that are tailored to family and group interests.', 'English, French', 6, 'pictures/guide/nyi_say.jpeg'),
(30, 'Ahmad Hussain', 'ahmad.hussain@gmail.com', 'Ahmad specializes in religious and spiritual tours.', 'Urdu, Arabic, English', 15, 'pictures/guide/nyi_say.jpeg'),
(31, 'Yuki Nakamura', 'yuki.nakamura@gmail.com', 'Yuki offers tours that delve deep into Japanese traditions.', 'Japanese, English', 13, 'pictures/guide/nyi_say.jpeg'),
(32, 'Sophia Brown', 'sophia.brown@gmail.com', 'Sophia provides a mix of historical and modern cultural tours.', 'English, French', 8, 'pictures/guide/nyi_say.jpeg'),
(33, 'Aliya Begum', 'aliya.begum@gmail.com', 'Aliya highlights the rich culinary heritage of the region.', 'Urdu, English', 6, 'pictures/guide/nyi_say.jpeg'),
(34, 'Victor Hugo', 'victor.hugo@gmail.com', 'Victor’s tours focus on literary and artistic landmarks.', 'French, English, Spanish', 11, 'pictures/guide/nyi_say.jpeg'),
(35, 'Ming Zhao', 'ming.zhao@gmail.com', 'Ming offers a modern perspective on cultural exploration.', 'Chinese, English', 9, 'pictures/guide/nyi_say.jpeg'),
(36, 'Isabella Cruz', 'isabella.cruz@gmail.com', 'Isabella provides vibrant and engaging tours for diverse groups.', 'Spanish, Portuguese, English', 7, 'pictures/guide/nyi_say.jpeg'),
(37, 'Paul White', 'paul.white@gmail.com', 'Paul focuses on eco-tourism and sustainable travel experiences.', 'English, French, Thailand', 14, 'pictures/guide/67808830aaaf7_act1.jpg'),
(38, 'Ravi Kumar', 'ravi.kumar@gmail.com', 'Ravi’s tours emphasize historical narratives and folklore.', 'Hindi, English', 12, 'pictures/guide/nyi_say.jpeg'),
(39, 'Maya Silva', 'maya.silva@gmail.com', 'Maya provides tours with a strong focus on the arts and performance traditions.', 'Spanish, English', 10, 'pictures/guide/nyi_say.jpeg'),
(40, 'Liam O’Connor', 'liam.oconnor@gmail.com', 'Liam excels in tours that blend cultural insights with scenic exploration.', 'English, Irish, French', 8, 'pictures/guide/nyi_say.jpeg'),
(41, 'Ko Bunny', 'bunny@gmail.com', 'he is very passionate and funny guide!', 'Burmese, English, French, Spanish', 10, 'pictures/guide/6794e6180f262_images (1).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `status` varchar(9) NOT NULL,
  `reset_password_code` int(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `phone`, `role`, `profile_image`, `password`, `created_at`, `status`, `reset_password_code`) VALUES
(1, 'admin', 'admin@gmail.com', '097941849971', 'admin', 'pictures/profile/6780856ef29e0_admin.jpg', '$2y$10$EmWL4eEQbPVoRMGs5qCWQeD4LxuRrt9Pzsu6y0vFcCG8PKrv08avK', '2025-01-07 06:52:45', 'approved', 0),
(2, 'Min Khant Kyaw Swar', 'mkks1986.mkks@gmail.com', '09794184997', 'customer', 'pictures/profile/6777f5126a1d5_bagan3.jpg', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-10 06:52:45', 'approved', 416406),
(3, 'Frost', 'frostwosix@gmail.com', '09827291821', 'customer', 'pictures/profile/677ad9a6a6937_profile.jpg', '$2y$10$EEPfgfe8wogFnI8pV7RqzOBN4dqqQ482/ru.lGwlV0MyL4hudoGLG', '2025-01-07 06:52:45', 'approved', NULL),
(4, 'Zwe Thuta Min Thein', 'zwethuta@gmail.com', '09821313131', 'customer', 'pictures/profile/6780914f4100f_kotoegyi.jpg', '$2y$10$dEqhtrGbNnU8HLIYCi8GC.uaaztgiEShW3NyehC3zMYpbWUlCYCZ2', '2024-12-10 06:52:45', 'approved', 0),
(5, 'Linn Myat', 'linnmyat@gmail.com', '09794184997', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$egApD4TvulmYGQHWXGHOA.vErfTKHR0ITSCXWMbH7fJCaBDmrwbha', '1/2/2025, 6:22:40 AM', 'approved', 0),
(6, 'johndoe', 'johndoe@example.com', '11234567890', 'customer', 'pictures/profile/67795edf30619_maxresdefault.jpg', '$2y$10$oRwhLqS/iQWRMEOiURude.8p0M5MD/5e0amiIXnBWPKMPb.9RPkJO', '2025-01-07 06:52:45', 'approved', 0),
(7, 'Jane Doe', 'janedoe@example.com', '091123457891', 'customer', 'pictures/profile/67807e57575a0_jane doe.jpg', '$2y$10$UUMEdmmbWRG9r8cpqShe4u7UdJplsZlKcm9q6IkPXJx6oamYKsh0y', '2025-01-07 06:52:45', 'approved', 0),
(8, 'Nyi Say', 'nyisay@gmail.com', '0979482728', 'customer', 'pictures/profile/67809067cff43_nyisay.jpg', '$2y$10$/lVvEWTVaHGCn/iUQW4ULuDdEFXhHkP3M0USaj8ezEIJHISjiwh3m', '2025-01-07 06:52:45', 'approved', 0),
(9, 'sarawong', 'sara.wong@example.com', '11234567893', 'customer', 'pictures/profile/67795e50c0e92_64c287907fbcec316902033dc8678978.jpg', '$2y$10$HzccX2sE1Tu1lgRwF3xOJOx8HUVhyxTQnLKbWy3h.hZ6oNRR6MD.K', '2025-01-07 06:52:45', 'approved', 0),
(10, 'robertjohnson', 'robert.johnson@example.com', '11234567894', 'customer', 'pictures/profile/677ad1f153be4_Lucas-De-Man-Fotograaf-Anne-Harbers-2-1024x683.jpg', '$2y$10$dmgt1KO151ZJPdqksxcBmuVz1mvbh4lH/oRRX6TWWwmhOKSaoykeK', '2025-01-02 06:22:40', 'approved', 0),
(11, 'Emily', 'emily.davis@example.com', '09 321213133', 'customer', 'pictures/profile/6784a38749065_actr1.jpg', '$2y$10$TcbED8EyEATW.7H/g35rv.v9yyg3jn9PtGtr0MTm6vmaUOnxyqMjS', '2025-01-04 06:22:40', 'approved', 0),
(12, 'daniellee', 'daniel.lee@example.com', '09 123131311', 'customer', 'pictures/profile/6784aca9ed15c_anyujin.png', '$2y$10$guV4.xN..Pe.PjsWBbaAX.2I.fyfQvz7PYDKHWpNvhw7dyDvkXeDS', '2025-01-02 06:22:40', 'approved', 0),
(13, 'Amanda', 'amanda.wilson@example.com', '11234567897', 'customer', 'pictures/profile/678bc9db3ae5a_winter.jpeg', '$2y$10$U4LeSmVS876ubo8zLON2m.NKs7XBgckGrhlwyS95X53M2bRVz/pEa', '2024-12-02 09:01:40', 'approved', 0),
(14, 'Bunny', 'charles.brown@example.com', '11234567898', 'customer', 'pictures/profile/678bffb263561_images (1).jpg', '$2y$10$ZuHu7S0stS.GdFg/4W.r.u/DqFyVokFqK4W0uSmtjDAfIZ/e9jfg.', '2025-02-01 12:22:40', 'approved', 0),
(15, 'ashleymartin', 'ashley.martin@example.com', '11234567899', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password10', '2025-01-02 02:11:40', 'approved', 0),
(16, 'kevinmoore', 'kevin.moore@example.com', '11234567900', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password11', '2025-01-01 11:22:40', 'approved', 0),
(17, 'laurawhite', 'laura.white@example.com', '11234567901', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password12', '2025-01-02 10:22:40', 'approved', 0),
(18, 'brianclark', 'brian.clark@example.com', '11234567902', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password13', '2025-01-03 06:22:40', 'approved', 0),
(19, 'victoriamartinez', 'victoria.martinez@example.com', '11234567903', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password14', '2025-01-02 06:22:40', 'approved', 0),
(20, 'christopherlopez', 'christopher.lopez@example.com', '11234567904', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password15', '2025-01-02 06:22:40', 'approved', 0),
(21, 'hannahgonzalez', 'hannah.gonzalez@example.com', '11234567905', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password16', '2025-01-02 07:22:40', 'approved', 0),
(22, 'nicholasyoung', 'nicholas.young@example.com', '11234567906', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password17', '2024-12-27 08:22:40', 'approved', 0),
(23, 'madisonking', 'madison.king@example.com', '11234567907', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password18', '2024-12-29 09:22:40', 'approved', 0),
(24, 'zacharyhill', 'zachary.hill@example.com', '11234567908', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password19', '2025-01-02 02:22:40', 'approved', 0),
(25, 'isabellarogers', 'isabella.rogers@example.com', '11234567909', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password20', '2025-01-02 06:22:40', 'approved', 0),
(26, 'davidtaylor', 'david.taylor@example.com', '11234567930', 'customer', '/pictures/profile/defaultProfile.png', 'hashed_password50', '2025-01-02 01:22:40', 'approved', 0),
(27, 'ingyin', 'ingyin@gmail.com', '09786993707', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$luoJJKApeXNm9yHkyy1TUONcYRvrskxWabRfNXRM8zJYw0.P7e.kq', '1/6/2025, 7:44:45 PM', 'approved', 0),
(28, 'Lynn Myat', 'lynnmyat@gmail.com', '09779689190', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$ixVLASZL9/BCbvGCV7VwauXjWbZuWwUt1YLacMXMCzpJxafIWtnbu', '1/7/2025, 9:11:22 PM', 'approved', 0),
(29, 'Ko Tin Sein', 'kotinsein@gmail.com', '728281718', 'customer', 'pictures/profile/6780a574355b1_act4.jpg', '$2y$10$zlet8LRBjpmO03rz9w47Y.zFe30T.uqvrMG9VUg/QPzGHGA9xfV9S', '1/9/2025, 8:43:05 PM', 'approved', 0),
(30, 'james_miles', 'justin03@hotmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-22 06:46:17', 'approved', 0),
(31, 'isabel_peck', 'davissamantha@reynolds-james.net', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-24 21:03:32', 'approved', 0),
(32, 'david_anderson', 'jeanette13@higgins-nguyen.biz', '48510885259', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-09 15:59:03', 'approved', 0),
(33, 'carol_hamilton', 'plopez@hotmail.com', '48435322294', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-19 04:13:09', 'approved', 0),
(34, 'raymond_grant', 'burgessevan@gmail.com', '13231381558', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-04 14:35:15', 'approved', 0),
(35, 'james_wise', 'agutierrez@moore-shaffer.biz', '81635819610', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-01 06:19:38', 'approved', 0),
(36, 'hailey_smith', 'kimberly75@taylor.net', '13291999002', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-13 17:20:44', 'approved', 0),
(37, 'jenna_edwards', 'hooddavid@johnson.com', '81440631399', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-19 01:18:47', 'approved', 0),
(38, 'jeffrey_valdez', 'gregorysalazar@ortiz.com', '48917677376', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-08 10:02:00', 'approved', 0),
(39, 'cheryl_espinoza', 'duranphilip@hotmail.com', '13472700662', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-22 09:39:32', 'approved', 0),
(40, 'lori_swanson', 'burnetttonya@hotmail.com', '48811618354', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-29 09:28:00', 'approved', 0),
(41, 'brandy_vincent', 'juliadunlap@king.info', '13340460828', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-18 03:02:09', 'approved', 0),
(42, 'alex_taylor', 'amythomas@brown-lopez.biz', '13861310241', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-07 12:33:58', 'approved', 0),
(43, 'gary_fields', 'jacksonalicia@lopez-bass.net', '81333533526', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-15 05:56:59', 'approved', 0),
(44, 'matthew_braun', 'timothy42@hotmail.com', '81599564451', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-09 20:37:43', 'approved', 0),
(45, 'ross_sanford', 'robin89@gmail.com', '13896515182', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-26 10:14:21', 'approved', 0),
(46, 'caroline_watson', 'suttontimothy@yahoo.com', '81258473351', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-25 21:51:30', 'approved', 0),
(47, 'shelby_thompson', 'bshelton@price.biz', '48951233820', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-08 16:10:02', 'approved', 0),
(48, 'angela_thomas', 'claytonjames@patterson.com', '48341749928', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-02 13:17:28', 'approved', 0),
(49, 'haley_barrett', 'wrightphillip@yahoo.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-11 05:54:12', 'approved', 0),
(50, 'jeffery_hawkins', 'alexander48@atkins.com', '48968994422', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-07 06:08:24', 'approved', 0),
(51, 'amy_vaughan', 'shannon62@sanchez.info', '81251957975', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-25 03:53:15', 'approved', 0),
(52, 'tina_cook', 'jonathan58@hotmail.com', '13553264894', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-22 01:32:11', 'approved', 0),
(53, 'james_kramer', 'fharrington@luna.info', '81191502778', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-10 09:12:17', 'approved', 0),
(54, 'sheryl_hernandez', 'maryjones@odom.com', '13368815374', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-23 00:37:55', 'approved', 0),
(55, 'deanna_martinez', 'lauren62@wilson.info', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-15 21:54:41', 'approved', 0),
(56, 'kathleen_murphy', 'elizabethsandoval@young.info', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-19 08:31:17', 'approved', 0),
(57, 'victoria_zimmerman', 'abigail99@hotmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-18 08:31:07', 'approved', 0),
(58, 'kevin_guerrero', 'handrews@yahoo.com', '81498419349', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-27 09:52:22', 'approved', 0),
(59, 'lisa_garcia', 'johnjenkins@hernandez.net', '81261374143', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-20 01:55:11', 'approved', 0),
(60, 'bethany_douglas', 'sarawong@dixon.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-25 08:13:52', 'approved', 0),
(61, 'patrick_baker', 'ryanfranco@gmail.com', '81683491476', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-10 06:57:50', 'approved', 0),
(62, 'elizabeth_tucker', 'aaron62@hotmail.com', '81421717720', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-30 01:45:30', 'approved', 0),
(63, 'justin_rodriguez', 'megangreen@yahoo.com', '13139644512', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-01 05:49:17', 'approved', 0),
(64, 'jennifer_torres', 'jessica91@gmail.com', '48123611334', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-19 11:30:55', 'approved', 0),
(65, 'paul_parker', 'torreskristi@hotmail.com', '81298732694', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-24 21:14:18', 'approved', 0),
(66, 'bonnie_harper', 'david98@king.biz', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-30 15:14:09', 'approved', 0),
(67, 'sean_hudson', 'baileydaniel@parker.com', '13070159011', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-30 23:17:08', 'approved', 0),
(68, 'kendra_soto', 'brooke32@yahoo.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-08 08:12:33', 'approved', 0),
(69, 'richard_ryan', 'craigcarrillo@yahoo.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-06 22:02:33', 'approved', 0),
(70, 'joe_spencer', 'elizabethanderson@gmail.com', '81260665084', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-14 07:40:12', 'approved', 0),
(71, 'katherine_sutton', 'justin33@hotmail.com', '81470626238', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-21 05:46:27', 'approved', 0),
(72, 'kara_cox', 'kirkdavila@hotmail.com', '81740331221', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-30 15:23:30', 'approved', 0),
(73, 'amber_thompson', 'daisy26@lee.org', '13029826302', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-16 19:26:49', 'approved', 0),
(74, 'paige_howard', 'ronald35@gmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-19 22:27:37', 'approved', 0),
(75, 'catherine_morrison', 'garciamatthew@hotmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-22 06:02:58', 'approved', 0),
(76, 'frank_neal', 'michael94@hughes-rush.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-08 15:23:12', 'approved', 0),
(77, 'jeffery_gonzales', 'weaverjohn@jennings-carlson.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-27 17:40:56', 'approved', 0),
(78, 'kathryn_mcbride', 'jessica04@sanford.net', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-07 07:25:49', 'approved', 0),
(79, 'david_smith', 'boyerkathryn@ramos.info', '81745331690', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-22 14:37:08', 'approved', 0),
(80, 'michael_lawson', 'vmartinez@hotmail.com', '48202960183', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-27 03:42:09', 'approved', 0),
(81, 'timothy_mcclure', 'riveramark@reyes.com', '81109318636', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-11 02:14:07', 'approved', 0),
(82, 'hannah_harris', 'catherine90@gmail.com', '13346694325', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-07-31 16:41:27', 'approved', 0),
(83, 'zachary_chase', 'ybray@valdez.com', '81167133125', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-11 17:39:26', 'approved', 0),
(84, 'cameron_smith', 'rodriguezjennifer@hotmail.com', '48365718953', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-20 15:25:02', 'approved', 0),
(85, 'heather_green', 'daltonray@bell.com', '48737987983', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-27 04:58:09', 'approved', 0),
(86, 'katie_meyer', 'popejill@kennedy.com', '81973020489', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-14 15:08:44', 'approved', 0),
(87, 'susan_norris', 'jose68@hotmail.com', '48187770835', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-03 11:28:21', 'approved', 0),
(88, 'devin_perez', 'wardtammy@castillo.org', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-19 21:38:15', 'approved', 0),
(89, 'kelly_brooks', 'andrewwhite@hill-schultz.com', '48297033832', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-03 04:58:40', 'approved', 0),
(90, 'virginia_owens', 'tina88@gmail.com', '48050020978', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-19 12:27:04', 'approved', 0),
(91, 'lori_olsen', 'handerson@gomez.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-03 10:42:49', 'approved', 0),
(92, 'kristen_johnson', 'lfaulkner@carter-pruitt.org', '48427205975', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-12 10:10:32', 'approved', 0),
(93, 'bradley_robbins', 'rangeldevon@yahoo.com', '48296564775', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-14 02:01:51', 'approved', 0),
(94, 'michelle_smith', 'sullivangeorge@wright.com', '13007382301', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-04 01:51:03', 'approved', 0),
(95, 'william_moreno', 'lori55@yahoo.com', '81801853053', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-30 01:02:36', 'approved', 0),
(96, 'noah_james', 'glennmaureen@mccarthy-walton.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-25 21:38:39', 'approved', 0),
(97, 'leslie_miller', 'wilsonkyle@sweeney.net', '13501084725', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-21 06:03:35', 'approved', 0),
(98, 'michael_yang', 'michaelsanford@yahoo.com', '48777094659', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-23 11:50:10', 'approved', 0),
(99, 'nathan_thompson', 'vincent12@anderson-anderson.com', '81714806571', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-26 16:46:14', 'approved', 0),
(100, 'claire_bernard', 'allen31@wilcox.info', '48057385237', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-11 07:33:32', 'approved', 0),
(101, 'derek_cruz', 'wjohnston@martin.com', '48577797594', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-14 00:57:17', 'approved', 0),
(102, 'christina_sullivan', 'hudsondevin@cruz.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-24 02:15:31', 'approved', 0),
(103, 'nicole_coleman', 'castilloangela@yahoo.com', '48269165273', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-06 19:14:19', 'approved', 0),
(104, 'kara_stark', 'jacob21@yahoo.com', '48821653729', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-12 18:32:11', 'approved', 0),
(105, 'michelle_brooks', 'bradley81@gmail.com', '48108330030', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-29 04:12:56', 'approved', 0),
(106, 'ruben_pratt', 'paulroberts@hotmail.com', '81578396594', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-08 07:26:10', 'approved', 0),
(107, 'timothy_mendez', 'danasmith@abbott-smith.net', '48807895685', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-05 04:45:39', 'approved', 0),
(108, 'shari_torres', 'qestes@carter.biz', '81032477513', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-24 06:58:16', 'approved', 0),
(109, 'mark_ray', 'marklewis@yahoo.com', '48998604369', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-15 16:36:54', 'approved', 0),
(110, 'devin_dudley', 'austinbryant@perez.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-12 02:10:59', 'approved', 0),
(111, 'caroline_velazquez', 'smithandrew@fisher-ware.com', '13732542052', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-09 05:00:06', 'approved', 0),
(112, 'kaitlyn_fritz', 'brian94@wolfe.com', '81319056176', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-13 23:11:20', 'approved', 0),
(113, 'robert_rivera', 'lberry@huerta.com', '13086337782', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-14 14:06:33', 'approved', 0),
(114, 'kimberly_diaz', 'johnrogers@hotmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-14 22:25:09', 'approved', 0),
(115, 'dustin_velasquez', 'michelle57@pugh.biz', '48132832482', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-26 07:08:44', 'approved', 0),
(116, 'donald_gonzalez', 'kaitlyn71@hotmail.com', '48650252929', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-11-26 22:21:24', 'approved', 0),
(117, 'devin_ware', 'dmurphy@roberts.com', '48018308709', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-16 15:01:50', 'approved', 0),
(118, 'richard_chambers', 'warecharles@garcia.net', '48973669835', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-20 09:35:31', 'approved', 0),
(119, 'nathan_jones', 'jonesdavid@jackson-taylor.com', '13306939585', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-05 04:15:04', 'approved', 0),
(120, 'thomas_collins', 'tracy26@coleman.com', '48561444213', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-03 04:29:04', 'approved', 0),
(121, 'mark_spence', 'nmorgan@hotmail.com', '48529296846', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-26 01:14:01', 'approved', 0),
(122, 'edward_cruz', 'cjackson@horton.com', '81320957652', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-05 21:07:41', 'approved', 0),
(123, 'karen_ramos', 'brownwilliam@yahoo.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-12-03 20:14:53', 'approved', 0),
(124, 'jeremy_walker', 'thompsonregina@mccoy.com', '13919297023', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2025-01-11 18:50:53', 'approved', 0),
(125, 'timothy_williams', 'danielrose@gmail.com', '13030612965', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-08-06 07:08:45', 'approved', 0),
(126, 'lisa_ray', 'ekim@bentley.net', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-15 02:49:07', 'approved', 0),
(127, 'sierra_dorsey', 'martinsharon@davis.org', '81511839396', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-08 19:15:13', 'approved', 0),
(128, 'david_walsh', 'dwayne61@pruitt.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-09-16 20:51:00', 'approved', 0),
(129, 'jessica_oconnor', 'michelle22@gmail.com', '7{random:10}', 'customer', '/pictures/profile/defaultProfile.png', '$2y$10$JUc1BsQiHg5R684uMfAkI.lLLbDWoXhZI2k9sAV0RedlY1VDu8zCq', '2024-10-15 23:25:59', 'approved', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_on`
--
ALTER TABLE `add_on`
  ADD PRIMARY KEY (`add_on_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_user_id` (`user`),
  ADD KEY `fk_booking_package` (`package`),
  ADD KEY `fk_add_on` (`add_on`),
  ADD KEY `fk_discount` (`discount`),
  ADD KEY `fk_payment_method` (`payment_method`),
  ADD KEY `fk_source_location_booking` (`source_location`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `destination`
--
ALTER TABLE `destination`
  ADD PRIMARY KEY (`destination_id`),
  ADD KEY `fk_category` (`category`),
  ADD KEY `fk_location_id` (`location`);

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `favorite_destinations`
--
ALTER TABLE `favorite_destinations`
  ADD PRIMARY KEY (`favorite_destination_id`),
  ADD KEY `user` (`user`),
  ADD KEY `destination` (`destination`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`),
  ADD KEY `fk_region` (`region`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`package_id`),
  ADD KEY `destination` (`destination`),
  ADD KEY `tour_guide` (`tour_guide`);

--
-- Indexes for table `package_info`
--
ALTER TABLE `package_info`
  ADD PRIMARY KEY (`package_info_id`),
  ADD KEY `source_location` (`source_location`),
  ADD KEY `package` (`package`);

--
-- Indexes for table `passport_info`
--
ALTER TABLE `passport_info`
  ADD PRIMARY KEY (`passport_info_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`region_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_review` (`user`),
  ADD KEY `fk_review_destination` (`destination`);

--
-- Indexes for table `saveditems`
--
ALTER TABLE `saveditems`
  ADD PRIMARY KEY (`saved_id`),
  ADD KEY `fk_user_saved_items` (`user`),
  ADD KEY `fk_aved_package` (`package`);

--
-- Indexes for table `tourguide`
--
ALTER TABLE `tourguide`
  ADD PRIMARY KEY (`guide_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_on`
--
ALTER TABLE `add_on`
  MODIFY `add_on_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `destination`
--
ALTER TABLE `destination`
  MODIFY `destination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favorite_destinations`
--
ALTER TABLE `favorite_destinations`
  MODIFY `favorite_destination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `package_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `package_info`
--
ALTER TABLE `package_info`
  MODIFY `package_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=448;

--
-- AUTO_INCREMENT for table `passport_info`
--
ALTER TABLE `passport_info`
  MODIFY `passport_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `region_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `saveditems`
--
ALTER TABLE `saveditems`
  MODIFY `saved_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `tourguide`
--
ALTER TABLE `tourguide`
  MODIFY `guide_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_add_on` FOREIGN KEY (`add_on`) REFERENCES `add_on` (`add_on_id`),
  ADD CONSTRAINT `fk_booking_package` FOREIGN KEY (`package`) REFERENCES `package` (`package_id`),
  ADD CONSTRAINT `fk_discount` FOREIGN KEY (`discount`) REFERENCES `discount` (`discount_id`),
  ADD CONSTRAINT `fk_payment_method` FOREIGN KEY (`payment_method`) REFERENCES `payment` (`payment_id`),
  ADD CONSTRAINT `fk_source_location_booking` FOREIGN KEY (`source_location`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `favorite_destinations`
--
ALTER TABLE `favorite_destinations`
  ADD CONSTRAINT `favorite_destinations_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `favorite_destinations_ibfk_2` FOREIGN KEY (`destination`) REFERENCES `destination` (`destination_id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `fk_region` FOREIGN KEY (`region`) REFERENCES `region` (`region_id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
