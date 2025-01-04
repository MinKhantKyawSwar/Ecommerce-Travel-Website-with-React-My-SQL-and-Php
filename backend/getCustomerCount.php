<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include database connection
include 'dbconnect.php';
$db = new dbconnect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        try {
            // Connection to database
            $conn = $db->connect();

            // Query to count customers
            $getCustomerCount = "SELECT COUNT(*) FROM users WHERE role = 'customer';";
            $stmt = $conn->prepare($getCustomerCount);
            $stmt->execute();

            // Fetch count value directly
            $customerCount = $stmt->fetchColumn();

            if ($customerCount !== false) {
                $response = [
                    'status' => 1,
                    'message' => "Data found",
                    'data' => ['customer_count' => $customerCount]
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "No customers found"
                ];
            }
        } catch (PDOException $e) {
            $response = [
                'status' => 0,
                'message' => "Database error: " . $e->getMessage()
            ];
        }
        break;

    default:
        $response = [
            'status' => 0,
            'message' => 'Invalid request method'
        ];
        break;
}

// Output response as JSON
header('Content-Type: application/json');
echo json_encode($response);
