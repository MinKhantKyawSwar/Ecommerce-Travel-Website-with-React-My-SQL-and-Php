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

            $city = $_POST['city'];
            $country = $_POST['country'];
            $region = $_POST['region'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            $accommodation = $_POST['accommodation'];
            $id = $_POST['id'];

            // Connect to the database
            $conn = $db->connect();

            // Check if the location already exists
            $checkExistLocationSql = "SELECT `location_id` FROM `location` WHERE `city` = :city AND `country` = :country AND `region` = :region";
            $stmt = $conn->prepare($checkExistLocationSql);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':country', $country);
            $stmt->bindParam(':region', $region);
            $stmt->execute();
            $location = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($location) {
                // Location exists, use the existing location_id
                $location_id = $location['location_id'];
            } else {
                // Location does not exist, insert it into the database
                $insertLocationSql = "INSERT INTO `location` (`city`, `country`, `region`) VALUES (:city, :country, :region)";
                $stmt = $conn->prepare($insertLocationSql);
                $stmt->bindParam(':city', $city);
                $stmt->bindParam(':country', $country);
                $stmt->bindParam(':region', $region);
                $stmt->execute();
                $location_id = $conn->lastInsertId();
            }

            // Fetch the current images to unlink them if they exist
            $sql1 = "SELECT destination_image, destination_second_image, destination_third_image, accommodation_image FROM destination WHERE destination_id = :id";
            $stmt = $conn->prepare($sql1);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $currentImages = $stmt->fetch(PDO::FETCH_ASSOC);

            // Initialize file paths
            $destinationSaveLocation = 'pictures/destination_image/';
            $accommodationSaveLocation = 'pictures/accommodation/';

            // Process each image upload
            $destinationTargetFilePath = !empty($_FILES['destination_image']['name']) ? $destinationSaveLocation . uniqid() . '_' . basename($_FILES['destination_image']['name']) : $currentImages['destination_image'];
            $secondDestinationTargetFilePath = !empty($_FILES['destination_second_image']['name']) ? $destinationSaveLocation . uniqid() . '_' . basename($_FILES['destination_second_image']['name']) : $currentImages['destination_second_image'];
            $thirdDestinationTargetFilePath = !empty($_FILES['destination_third_image']['name']) ? $destinationSaveLocation . uniqid() . '_' . basename($_FILES['destination_third_image']['name']) : $currentImages['destination_third_image'];
            $accommodationTargetFilePath = !empty($_FILES['accommodation_image']['name']) ? $accommodationSaveLocation . uniqid() . '_' . basename($_FILES['accommodation_image']['name']) : $currentImages['accommodation_image'];

            // Move the uploaded files to the target directory if they are uploaded
            if (!empty($_FILES['destination_image']['name'])) {
                move_uploaded_file($_FILES['destination_image']['tmp_name'], $destinationTargetFilePath);
            }
            if (!empty($_FILES['destination_second_image']['name'])) {
                move_uploaded_file($_FILES['destination_second_image']['tmp_name'], $secondDestinationTargetFilePath);
            }
            if (!empty($_FILES['destination_third_image']['name'])) {
                move_uploaded_file($_FILES['destination_third_image']['tmp_name'], $thirdDestinationTargetFilePath);
            }
            if (!empty($_FILES['accommodation_image']['name'])) {
                move_uploaded_file($_FILES['accommodation_image']['tmp_name'], $accommodationTargetFilePath);
            }

            // Prepare the SQL statement to update the destination
            $sql = "UPDATE destination 
                    SET location = :location_id , description = :description,
                        category = :category, accommodation = :accommodation, destination_image = :destination_image,
                        destination_second_image = :destination_second_image, destination_third_image = :destination_third_image,
                        accommodation_image = :accommodation_image 
                    WHERE destination_id = :id";
            $stmt = $conn->prepare($sql);

            // Bind the parameters to the prepared statement
            $stmt->bindParam(':location_id', $location_id);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':category', $category);
            $stmt->bindParam(':accommodation', $accommodation);
            $stmt->bindParam(':destination_image', $destinationTargetFilePath);
            $stmt->bindParam(':destination_second_image', $secondDestinationTargetFilePath);
            $stmt->bindParam(':destination_third_image', $thirdDestinationTargetFilePath);
            $stmt->bindParam(':accommodation_image', $accommodationTargetFilePath);
            $stmt->bindParam(':id', $id);

            // Execute the statement
            $success = $stmt->execute();

            // Send the response back
            if ($success) {
                $response = ['status' => 1, 'message' => 'Destination updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update destination'];
            }

            echo json_encode($response);
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
