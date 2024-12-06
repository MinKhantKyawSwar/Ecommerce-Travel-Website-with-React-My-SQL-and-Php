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
            if (isset($headers['Destination-ID'])) {
                $destination_id = $headers['Destination-ID'];

                // Connection to database
                $conn = $db->connect();
                $getAllPackages = "SELECT * FROM Package WHERE destination = :destination_id";
                $stmt = $conn->prepare($getAllPackages);
                $stmt->bindParam(':destination_id', $destination_id, PDO::PARAM_INT);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found.", "destination" => $destination_id];
                }
            } else if (isset($headers['Package-Id'])) {
                $package_id = $headers['Package-Id'];

                $conn = $db->connect();
                $getPackageDetails = "
                SELECT 
                    package.*, 
                    destination.destination_name, 
                    destination.country, 
                    destination.region, 
                    destination.accommodation, 
                    destination.accommodation_image,
                    tourguide.guide_name,
                    tourguide.language,
                    tourguide.exp_years,
                    tourguide.guide_image,
                    tourguide.description
                FROM 
                    package
                JOIN 
                    destination ON package.destination = destination.destination_id
                JOIN 
                    tourguideassignment ON package.package_id = tourguideassignment.package_id
                JOIN 
                    tourguide ON tourguideassignment.guide_id = tourguide.guide_id
                WHERE 
                    package.package_id = :package_id;

            ";
                $stmt = $conn->prepare($getPackageDetails);
                $stmt->bindParam(':package_id', $package_id, PDO::PARAM_INT);
                $stmt->execute();

                $packageDetail = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packageDetail) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packageDetail];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found.", "package_id" => $package_id];
                }
            } else {
                $response = ['status' => 0, 'message' => "Destination-ID header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
