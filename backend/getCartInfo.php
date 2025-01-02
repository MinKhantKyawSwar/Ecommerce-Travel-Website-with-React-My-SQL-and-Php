<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

include 'dbconnect.php';  // Ensure your database connection file is included
$db = new dbconnect();    // Create a new instance of your dbconnect class

$eData = file_get_contents('php://input');  // Get the raw POST data if necessary

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Get user_id from query parameters
            if (isset($_GET['user_id'])) {
                $user_id = $_GET['user_id'];
            } else {
                echo json_encode(['status' => 0, 'message' => 'User ID is missing']);
                exit;
            }

            // Connection to database
            $conn = $db->connect();

            // SQL query to count the saved items for the given user
            $query = "SELECT COUNT(*) as item_count
                      FROM saveditems
                      WHERE user = :user_id";

            // Prepare and execute the query
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the count result
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                // Return the saved items count
                $response = [
                    'status' => 1,
                    'message' => 'Data found',
                    'data' => $result
                ];
            } else {
                // If no saved items found
                $response = [
                    'status' => 0,
                    'message' => 'No saved items found'
                ];
            }
        } catch (PDOException $e) {
            // Handle error if something goes wrong
            $response = [
                'status' => 0,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }

        // Send the response as JSON
        echo json_encode($response);
        break;

    default:
        // Handle unsupported request methods
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
