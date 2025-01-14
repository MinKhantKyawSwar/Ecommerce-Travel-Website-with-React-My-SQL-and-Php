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
    case "POST":
        try {
            $data = json_decode($eData);
            $userId = $data->user_id;

            // Connect to the database
            $conn = $db->connect();

            // Toggle user status
            $sql = "UPDATE users 
                    SET status = CASE 
                                   WHEN status = 'approved' THEN 'ban' 
                                   WHEN status = 'ban' THEN 'approved' 
                                   ELSE status 
                                 END 
                    WHERE user_id = :id";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $response = [
                    'status' => 1,
                    'message' => "User status updated successfully."
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "Failed to update user status."
                ];
            }
        } catch (PDOException $e) {
            $response = [
                'status' => 0,
                'message' => "An error occurred: " . $e->getMessage()
            ];
        }

        // Return the response
        echo json_encode($response);

        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
