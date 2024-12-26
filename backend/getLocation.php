
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$db = new dbconnect;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            // Check if "Destination-ID" header exists
            if (isset($headers['Location'])) {

                $location_id = $headers['Location'];
                // Connection to database
                $conn = $db->connect();
                $getAllLocation = "SELECT *
                                    FROM location
                                    where location_id = :location_id";
                $stmt = $conn->prepare($getAllLocation);
                $stmt->bindParam(':location_id', $location_id, PDO::PARAM_INT);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else  if (isset($headers['Country'])) {

                // Connection to database
                $conn = $db->connect();
                $getAllCountries = "SELECT DISTINCT country FROM location";
                $stmt = $conn->prepare($getAllCountries);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else {
                // Connection to database
                $conn = $db->connect();
                $getAllLocation = "SELECT * FROM location";
                $stmt = $conn->prepare($getAllLocation);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    case "POST":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            // Check if "Destination-ID" header exists
            if (isset($headers['Location'])) {

                $location_id = $headers['Location'];
                // Connection to database
                $conn = $db->connect();
                $getAllLocation = "SELECT *
                                        FROM location
                                        where location_id = :location_id";
                $stmt = $conn->prepare($getAllLocation);
                $stmt->bindParam(':location_id', $location_id, PDO::PARAM_INT);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
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
