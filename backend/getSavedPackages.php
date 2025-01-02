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
            $package = $data->package;
            $least_price = $data->least_price;
            $saved_at = $data->saved_at;

            $conn = $db->connect();
            // Check if the package is already saved by the user
            $checkPackage = "SELECT * FROM saveditems WHERE user = :user AND package = :package";
            $stmt = $conn->prepare($checkPackage);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':package', $package);
            $stmt->execute();
            $existingPackage = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingPackage) {
                $response = ['status' => 2, 'message' => "Package already saved!"];
            } else {
                $setSavedItems = "INSERT INTO saveditems (user, package, price, saved_at) VALUES (:user, :package, :least_price, :saved_at)";
                $stmt = $conn->prepare($setSavedItems);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':package', $package);
                $stmt->bindParam(':saved_at', $saved_at);
                $stmt->bindParam(':least_price', $least_price);
                $status = $stmt->execute();

                if ($status) {
                    $response = ['status' => 1, 'message' => "Package Successfully saved!"];
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
                $getSavedPackages = "
                        SELECT DISTINCT
                            saveditems.*,
                            package.*,
                            package_info.price,
                            destination.destination_image,
                            destination.*,
                            location.*
                        FROM 
                            saveditems
                        JOIN 
                            package ON package.package_id = saveditems.package
                        JOIN 
                            package_info ON package_info.package = package.package_id
                        JOIN 
                            users ON users.user_id = saveditems.user
                        JOIN 
                            destination ON destination.destination_id = package.destination
                        JOIN 
                            location ON location.location_id = destination.location
                        WHERE 
                            saveditems.user = :user_id AND
                            package_info.price = saveditems.price;
                    ";
                $stmt = $conn->prepare($getSavedPackages);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT); // Corrected binding
                $stmt->execute();

                $savedPackages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($savedPackages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $savedPackages];
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
            if (isset($headers['Saved-PackageId'])) {
                $saved_packageId = $headers['Saved-PackageId'];

                $conn = $db->connect();
                $deleteSavedPackages = "Delete from saveditems where saved_id = :package_id";
                $stmt = $conn->prepare($deleteSavedPackages);
                $stmt->bindParam(':package_id', $saved_packageId);


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