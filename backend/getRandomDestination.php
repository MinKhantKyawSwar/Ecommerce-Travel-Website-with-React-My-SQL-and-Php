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
            // Connection to database
            $headers = getallheaders();

            if (isset($headers['Country']) && isset($headers['Category']) && isset($headers['Destination_Id'])) {
                $country = $headers['Country'];
                $category = $headers['Category'];
                $destination_id = $headers['Destination_Id'];
                $conn = $db->connect();

                // Query to fetch destinations based on country and category
                $getRandomDestinations = "SELECT 
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
                                            region ON location.region = region.region_id
                                      WHERE 
                                            (location.country = :country OR category.category_id = :category) AND destination.destination_id != :destination_id";

                $stmt = $conn->prepare($getRandomDestinations);
                $stmt->bindParam(':country', $country);
                $stmt->bindParam(':category', $category);
                $stmt->bindParam(':destination_id', $destination_id);
                $stmt->execute();
                $destination = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($destination) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $destination];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to find!"];
                }
            } else {
                $response = ['status' => 0, 'message' => "Country or Category header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Database Error: " . $e->getMessage()];
        } catch (Exception $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
