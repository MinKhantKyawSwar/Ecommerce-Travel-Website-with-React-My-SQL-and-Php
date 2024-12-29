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
            $getAllDestinations = "SELECT 
                                            destination.*,
                                            category.*,
                                            location.*,
                                            region.*,
                                            package.*,
                                            package_info.*
                                      FROM 
                                            destination
                                      JOIN 
                                            category ON destination.category = category.category_id
                                      JOIN 
                                            location ON destination.location = location.location_id
                                      JOIN 
                                            package ON package.destination = destination.destination_id
                                      JOIN 
                                            package_info ON package_info.package = package.package_id
                                      JOIN
                                            region ON location.region = region.region_id";
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

    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
