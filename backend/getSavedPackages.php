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
            $saved_at = $data->saved_at;

            $conn = $db->connect();
            $setSavedItems = "INSERT INTO saveditems (user, package, saved_at) VALUES (:user, :package, :saved_at)";
            $stmt = $conn->prepare($setSavedItems);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':package', $package);
            $stmt->bindParam(':saved_at', $saved_at);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Item Successfully saved!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to save item!"];
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
                        SELECT 
                            saveditems.*,
                            package.package_name,
                            package.price,
                            destination.destination_image,
                            destination.destination_name
                        FROM 
                            saveditems
                        JOIN 
                            package ON package.package_id = saveditems.package
                        JOIN 
                            users ON users.user_id = saveditems.user
                        JOIN 
                            destination ON destination.destination_id = package.destination
                        WHERE 
                            saveditems.user = :user_id;
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
}
