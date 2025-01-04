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
                $getTotalCount = "SELECT SUM(total_price) as total_price FROM booking";
                $stmt = $conn->prepare($getTotalCount);
                $stmt->execute();

                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'total_price' => $result['total_price']];
                } else {
                    $response = ['status' => 0, 'message' => "No booking found."];
                }
            }
            else if (isset($headers['Total_Revenue_Each_Day'])) { 
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
            }
            
            else {
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
