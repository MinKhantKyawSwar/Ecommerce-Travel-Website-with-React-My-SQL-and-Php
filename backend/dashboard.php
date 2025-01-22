<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$db = new dbconnect;
$eData = file_get_contents('php://input');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            if (isset($headers['Packages-Id'])) {
                // Connection to database
                $conn = $db->connect();
                $getPackages = "SELECT COUNT(*) as total_packages FROM package";
                $stmt = $conn->prepare($getPackages);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'total_packages' => $result['total_packages']];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Total_Income'])) {
                // Connection to database
                $conn = $db->connect();

                // Get current and previous month date ranges
                $currentDate = new DateTime();
                $currentMonthStart = (clone $currentDate)->modify('first day of this month')->format('Y-m-d'); // Start of current month
                $currentMonthEnd = (clone $currentDate)->modify('last day of this month')->format('Y-m-d'); // End of current month

                // Calculate previous month start and end
                $previousMonthStart = (clone $currentDate)->modify('first day of last month')->format('Y-m-d'); // Start of previous month
                $previousMonthEnd = (clone $currentDate)->modify('last day of last month')->format('Y-m-d'); // End of previous month

                // Query to get total income for the current month
                $getCurrentMonthIncome = "SELECT SUM(total_price) as total_price FROM booking WHERE booking_date BETWEEN :currentMonthStart AND :currentMonthEnd";
                $stmt = $conn->prepare($getCurrentMonthIncome);
                $stmt->bindParam(':currentMonthStart', $currentMonthStart);
                $stmt->bindParam(':currentMonthEnd', $currentMonthEnd);
                $stmt->execute();
                $currentMonthResult = $stmt->fetch(PDO::FETCH_ASSOC);

                // Query to get total income for the previous month
                $getPreviousMonthIncome = "SELECT SUM(total_price) as total_price FROM booking WHERE booking_date BETWEEN :previousMonthStart AND :previousMonthEnd";
                $stmt = $conn->prepare($getPreviousMonthIncome);
                $stmt->bindParam(':previousMonthStart', $previousMonthStart);
                $stmt->bindParam(':previousMonthEnd', $previousMonthEnd);
                $stmt->execute();
                $previousMonthResult = $stmt->fetch(PDO::FETCH_ASSOC);

                // Query to get total income for all time
                $getTotalIncome = "SELECT SUM(total_price) as total_price FROM booking";
                $stmt = $conn->prepare($getTotalIncome);
                $stmt->execute();
                $totalIncomeResult = $stmt->fetch(PDO::FETCH_ASSOC);

                // Calculate the income difference between the current and previous months
                $currentMonthIncome = $currentMonthResult['total_price'] ? $currentMonthResult['total_price'] : 0;
                $previousMonthIncome = $previousMonthResult['total_price'] ? $previousMonthResult['total_price'] : 0;
                $difference = $currentMonthIncome - $previousMonthIncome;

                // Check if the current month's income is higher
                $isHigher = $difference > 0;

                // Prepare response
                if ($currentMonthIncome !== false && $previousMonthIncome !== false && $totalIncomeResult) {
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'data' => [
                            'current_month_income' => $currentMonthIncome,
                            'previous_month_income' => $previousMonthIncome,
                            'total_income' => $totalIncomeResult['total_price'],
                            'difference' => $difference,
                            'is_higher' => $isHigher, // True if current month income is higher
                        ]
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'message' => "No bookings found for the specified months."
                    ];
                }
            } else if (isset($headers['Total_Revenue_Each_Day'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each day
                $getTotalCount = "
                    SELECT DATE(booking_date) as booking_day, SUM(total_price) as total_price 
                    FROM booking 
                    GROUP BY DATE(booking_date)
                    ORDER BY booking_day DESC";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'daily_revenue' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No booking found."];
                }
            } else if (isset($headers['Total_Revenue_Each_Month'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each month
                $getTotalCount = "
                    SELECT DATE_FORMAT(booking_date, '%Y-%m') as booking_month, SUM(total_price) as total_price 
                    FROM booking 
                    GROUP BY booking_month
                    ORDER BY booking_month DESC";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'monthly_revenue' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No booking found."];
                }
            } else if (isset($headers['Total_Revenue_Each_Year'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each year
                $getTotalCount = "
                    SELECT YEAR(booking_date) as booking_year, SUM(total_price) as total_price 
                    FROM booking 
                    GROUP BY booking_year
                    ORDER BY booking_year DESC";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'yearly_revenue' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No booking found."];
                }
            } else if (isset($headers['Total_Payment_Count'])) {
                // Connection to database
                $conn = $db->connect();
            
                // SQL query to calculate the total count of payments by payment method
                $getTotalCount = "
                    SELECT payment.payment_name, COUNT(*) as payment_count
                    FROM booking
                    JOIN payment ON payment.payment_id = booking.payment_method
                    GROUP BY payment.payment_name
                    ORDER BY payment_count DESC";
            
                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();
            
                // Use fetchAll to retrieve all rows
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
                if ($result && count($result) > 0) {
                    $response = ['status' => 1, 'message' => "Data found", 'total_payment_count' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No payments found."];
                }
            }
            else if (isset($headers['Total_Travelers_Per_Destination'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total travelers for each destination
                $getTotalCount = "
                    SELECT location.city as city, location.country as country, SUM(number_of_people) AS total_travelers
                    FROM booking
                    JOIN location on location.location_id = booking.source_location
                    GROUP BY location.city, location.country
                    ORDER BY total_travelers DESC";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    // Prepare the data for the donut chart
                    $chartData = [];
                    foreach ($result as $row) {
                        $chartData[] = [
                            'label' => $row['city'] . ', ' . $row['country'], // Combine city and country as the label
                            'value' => $row['total_travelers']
                        ];
                    }

                    // Send response with chart data
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'chart_data' => $chartData
                    ];
                } else {
                    $response = ['status' => 0, 'message' => "No bookings found."];
                }
            } else if (isset($headers['Total_Destination'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each day
                $getTotalCount = " SELECT
                        COUNT(*) AS destination_count
                    FROM
                        destination";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No data found."];
                }
            } else if (isset($headers['Total_Spent_Customers'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each day
                $getTotalCount = "SELECT 
                                    users.username,
                                    SUM(booking.total_price) AS total_spent
                                FROM 
                                    booking
                                JOIN 
                                    users ON users.user_id = booking.user
                                JOIN 
                                    package ON package.package_id = booking.package
                                GROUP BY 
                                    users.username
                                ORDER BY 
                                    total_spent DESC
                                LIMIT 10;";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No customers found."];
                }
            } else if (isset($headers['Average_Rating'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each day
                $getTotalCount = "SELECT
                                    location.city,
                                    location.country,
                                    ROUND(AVG(review.rating)) AS average_rating
                                FROM
                                    review
                                JOIN
                                    destination ON review.destination = destination.destination_id
                                JOIN 
                                    users ON users.user_id = review.user
                                JOIN 
                                    location ON location.location_id = destination.location
                                GROUP BY
                                    location.city, location.country
                                ORDER BY
                                    average_rating DESC
                                LIMIT 10;";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No customers found."];
                }
            } else if (isset($headers['User_Account_Creation'])) {
                // Connection to database
                $conn = $db->connect();

                // SQL query to calculate total revenue for each day
                $getTotalCount = "
                    SELECT
                        DATE(created_at) AS date,
                        COUNT(*) AS accounts_created
                    FROM
                        users
                    WHERE
                        created_at >= CURDATE() - INTERVAL DAYOFMONTH(CURDATE())-1 DAY
                        AND created_at < CURDATE() + INTERVAL 1 MONTH 
                    GROUP BY
                        DATE(created_at)
                    ORDER BY
                        DATE(created_at) ASC;";

                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'daily_account_creation' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No booking found."];
                }
            } else if (isset($headers['Top_Destinations'])) {
                // Connection to database
                $conn = $db->connect();

                // Get the current date and calculate dynamic date ranges
                $currentDate = new DateTime();
                $currentMonthStart = (clone $currentDate)->modify('first day of this month')->format('Y-m-d'); // Start of current month
                $currentMonthEnd = (clone $currentDate)->modify('last day of this month')->format('Y-m-d'); // End of current month

                // Calculate previous month start and end
                $previousMonthStart = (clone $currentDate)->modify('first day of last month')->format('Y-m-d'); // Start of previous month
                $previousMonthEnd = (clone $currentDate)->modify('last day of last month')->format('Y-m-d'); // End of previous month

                // SQL query to calculate total revenue for each day with dynamic date range
                $getTotalCount = "SELECT 
                                    city,
                                    country,
                                    COUNT(number_of_people) AS total_travellers
                                FROM 
                                    booking
                                JOIN 
                                    package on package.package_id = booking.package
                                JOIN 
                                    destination on destination.destination_id = package.destination
                                JOIN 
                                    location on location.location_id = destination.location
                            -- WHERE 
                --                  booking_date BETWEEN :previousMonthStart AND :currentMonthEnd
                                GROUP BY 
                                    city
                                ORDER BY 
                                    total_travellers DESC
                                LIMIT 10;";

                $stmt = $conn->prepare($getTotalCount);
                // Bind the dynamic date parameters
                // $stmt->bindParam(':previousMonthStart', $previousMonthStart);
                // $stmt->bindParam(':currentMonthEnd', $currentMonthEnd);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No bookings found."];
                }
            } else if (isset($headers['Top_Packages'])) {
                // Connection to database
                $conn = $db->connect();

                // Get the current date and calculate dynamic date ranges
                // Connection to database
                $conn = $db->connect();

                // Get the current date and calculate dynamic date ranges
                $currentDate = new DateTime();
                $currentMonthStart = (clone $currentDate)->modify('first day of this month')->format('Y-m-d'); // Start of current month
                $currentMonthEnd = (clone $currentDate)->modify('last day of this month')->format('Y-m-d'); // End of current month

                // Calculate previous month start and end
                $previousMonthStart = (clone $currentDate)->modify('first day of last month')->format('Y-m-d'); // Start of previous month
                $previousMonthEnd = (clone $currentDate)->modify('last day of last month')->format('Y-m-d'); // End of previous month

                // SQL query to calculate total bookings for each package for dynamic date range
                $getTotalCount = "SELECT 
                    package.package_id,
                    package.package_name,
                    COUNT(number_of_people) AS total_travellers
                  FROM 
                    booking
                  JOIN 
                    package on package.package_id = booking.package
                --   WHERE 
                --     booking_date BETWEEN :previousMonthStart AND :currentMonthEnd
                  GROUP BY 
                    package.package_id
                  ORDER BY 
                    total_travellers DESC
                  LIMIT 10;";

                $stmt = $conn->prepare($getTotalCount);
                // $stmt->bindParam(':previousMonthStart', $previousMonthStart);
                // $stmt->bindParam(':currentMonthEnd', $currentMonthEnd);
                $stmt->execute();

                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No bookings found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "Header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
