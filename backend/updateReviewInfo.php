<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';

$db = new dbconnect();
$eData = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "PUT":
        try {
            // Decode the JSON input data
            $data = json_decode($eData);

            if (!isset($data->totalRating, $data->destination)) {
                throw new Exception("Missing required parameters: totalRating or destination.");
            }

            $rating = $data->totalRating;
            $destination_id = $data->destination;

            // Validate input data
            if (!is_numeric($rating) || !is_numeric($destination_id)) {
                throw new Exception("Invalid data type for totalRating or destination.");
            }

            // Connect to the database
            $conn = $db->connect();

            // Update query
            $addReviews = "UPDATE destination 
                           SET rating = :rating 
                           WHERE destination_id = :destination_id;";
            $stmt = $conn->prepare($addReviews);

            // Bind parameters
            $stmt->bindParam(':destination_id', $destination_id);
            $stmt->bindParam(':rating', $rating);

            // Execute the statement
            $status = $stmt->execute();

            // Check if the row was updated
            if ($status ) {
                $response = ['status' => 1, 'message' => "Review added successfully."];
            } else {
                $response = ['status' => 0, 'message' => "No review was added. Destination ID might not exist."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Database error: " . $e->getMessage()];
        } catch (Exception $e) {
            $response = ['status' => 0, 'message' => $e->getMessage()];
        }
        echo json_encode($response);
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
