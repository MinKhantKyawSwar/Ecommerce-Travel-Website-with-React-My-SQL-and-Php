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

            // Get the current month's customer count
            $currentMonthQuery = "
                SELECT COUNT(*) AS customer_count
                FROM users
                WHERE role = 'customer'
                  AND DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m');
            ";
            $stmt = $conn->prepare($currentMonthQuery);
            $stmt->execute();
            $currentMonthCount = $stmt->fetchColumn();

            // Get the previous month's customer count
            $previousMonthQuery = "
                SELECT COUNT(*) AS customer_count
                FROM users
                WHERE role = 'customer'
                  AND DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%Y-%m');
            ";
            $stmt = $conn->prepare($previousMonthQuery);
            $stmt->execute();
            $previousMonthCount = $stmt->fetchColumn();

            if ($currentMonthCount !== false && $previousMonthCount !== false) {
                $difference = $currentMonthCount - $previousMonthCount;
                $percentChange = $previousMonthCount > 0 ? ($difference / $previousMonthCount) * 100 : 0;

                $response = [
                    'status' => 1,
                    'message' => "Data found",
                    'data' => [
                        'current_month_count' => $currentMonthCount,
                        'previous_month_count' => $previousMonthCount,
                        'difference' => $difference,
                        'percent_change' => round($percentChange, 2)
                    ]
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "No data available for comparison"
                ];
            }
        } catch (PDOException $e) {
            $response = [
                'status' => 0,
                'message' => "Database error: " . $e->getMessage()
            ];
        }
        echo json_encode($response);
        break;

    default:
        $response = [
            'status' => 0,
            'message' => 'Invalid request method'
        ];
        echo json_encode($response);
        break;
}
?>
