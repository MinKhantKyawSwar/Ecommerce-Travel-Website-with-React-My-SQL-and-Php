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
            $data = json_decode($eData);

            // connection to database
            $conn = $db->connect();
            if (isset($_GET['id']) && is_numeric($_GET['id'])) {
                $id = intval($_GET['id']);
                $getAllDestination = "SELECT * FROM destination where destination_id = :id";
                $stmt = $conn->prepare($getAllDestination);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $destination = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($destination) {

                    $response = ['status' => 1, 'message' => "Data found", 'data' => $destination];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to find!"];
                }
            } else {
                // Query to fetch all destinations
                $getAllDestinations = "SELECT * FROM destination";
                $stmt = $conn->prepare($getAllDestinations);
                $stmt->execute();
                $allDestinations = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows

                if (!empty($allDestinations)) {
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'data' => $allDestinations
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'message' => "No destinations found"
                    ];
                }
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    case "POST":
        try {
            $data = json_decode($eData);

            // connection to database
            $conn = $db->connect();

            // Query to fetch all destinations
            $getAllDestinations = "SELECT * FROM destination";
            $stmt = $conn->prepare($getAllDestinations);
            $stmt->execute();
            $allDestinations = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows

            if (!empty($allDestinations)) {
                $response = [
                    'status' => 1,
                    'message' => "Data found",
                    'data' => $allDestinations
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "No destinations found"
                ];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
