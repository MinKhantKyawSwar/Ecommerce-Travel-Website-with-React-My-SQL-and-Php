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
                $package_id = $headers['Packages-Id'];
                // Connection to database
                $conn = $db->connect();
                $getTravelDate = "SELECT travel_date FROM available_people WHERE package = :package_id";
                $stmt = $conn->prepare($getTravelDate);
                $stmt->bindParam(':package_id', $package_id, PDO::PARAM_INT);
                $stmt->execute();

                // Fetch all results
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($result) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $result];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "Header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
