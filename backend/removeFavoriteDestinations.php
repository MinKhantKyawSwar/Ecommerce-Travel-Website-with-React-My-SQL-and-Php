<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php'; // Assuming you have a DB connection class
$db = new dbconnect;

$eData = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        try {
            // Parse the incoming request data
            $data = json_decode($eData);
            $user_id = $data->user_id; // User ID from the request
            $destination_id = $data->destination_id; // Package ID from the request

            // Connect to the database
            $conn = $db->connect();

            // Query to delete the saved package
            $deleteSavedPackage = "DELETE FROM favorite_destinations WHERE user = :user_id AND destination = :destination_id";
            $stmt = $conn->prepare($deleteSavedPackage);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':destination_id', $destination_id, PDO::PARAM_INT);

            // Execute the query
            $stmt->execute();

            // Check if a row was deleted
            if ($stmt->rowCount() > 0) {
                $response = [
                    'status' => 1,
                    'message' => "Favorite Destination removed successfully."
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "Destination not found or already removed."
                ];
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
?>
