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
            // Retrieve all headers
            $data = json_decode($eData);
            $user = $data->user;
            $destination = $data->destination;
            $saved_at = $data->saved_at;

            $conn = $db->connect();
            // Check if the package is already saved by the user
            $checkDestination = "SELECT * FROM favorite_destinations WHERE user = :user AND destination = :destination";
            $stmt = $conn->prepare($checkDestination);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':destination', $destination);
            $stmt->execute();
            $existingDestination = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingDestination) {
                $response = ['status' => 2, 'message' => "destination already saved!"];
            } else {
                $setFavoriteItems = "INSERT INTO favorite_destinations (user, destination, saved_at) VALUES (:user, :destination, :saved_at)";
                $stmt = $conn->prepare($setFavoriteItems);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':destination', $destination);
                $stmt->bindParam(':saved_at', $saved_at);
                $status = $stmt->execute();

                if ($status) {
                    $response = ['status' => 1, 'message' => "Destination successfully favorite!"];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to save package!"];
                }
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    case "GET":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            // Check if "User -Id" header exists
            if (isset($headers['User-Id'])) {
                $user_id = $headers['User-Id'];

                $conn = $db->connect();
                $getFavoriteDestinations = "
                        SELECT DISTINCT
                            favorite_destinations.*,
                            destination.*,
                            location.*
                        FROM 
                            favorite_destinations
                        JOIN 
                            destination ON destination.destination_id = favorite_destinations.destination
                        JOIN 
                            users ON users.user_id = favorite_destinations.user
                        JOIN 
                            location ON location.location_id = destination.location
                        WHERE 
                            favorite_destinations.user = :user_id;";
                $stmt = $conn->prepare($getFavoriteDestinations);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();

                $favoriteDestination = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($favoriteDestination) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $favoriteDestination];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "User-Id header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            // Check if "User -Id" header exists
            if (isset($headers['Saved-Destination-Id'])) {
                $savedDestinationId = $headers['Saved-Destination-Id'];

                $conn = $db->connect();
                $deleteSavedPackages = "Delete from favorite_destinations where favorite_destination_id = :destination_id";
                $stmt = $conn->prepare($deleteSavedPackages);
                $stmt->bindParam(':destination_id', $savedDestinationId, PDO::PARAM_INT);


                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => "Saved Package deleted"];
                } else {
                    $response = ['status' => 0, 'message' => "No saved package found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "User-Id header missing."];
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