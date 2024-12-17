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

            $package_name = $_POST['package_name'];
            $description = $_POST['description'];
            $price = $_POST['price'];
            $other_region_price = $_POST['other_region_price'];
            $flight_description = $_POST['flight_description'];;
            $facilities = $_POST['facilities'];
            $meals = $_POST['meals'];
            $activities = $_POST['activities'];
            $duration = $_POST['duration'];
            $destination = $_POST['destination'];
            $tour_guide = $_POST['guide_id'];
            $id = $_POST['id'];

            // Connect to the database
            $conn = $db->connect();

            // Fetch the current images to unlink them if they exist
            $sql1 = "SELECT flight_image, facilities_image, meals_image, activities_image FROM package WHERE package_id = :id";
            $stmt = $conn->prepare($sql1);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $currentImages = $stmt->fetch(PDO::FETCH_ASSOC);

            // Initialize file paths
            $packageSaveLocation = 'pictures/package/'; // Directory to save the image

            // Process each image upload
            $flightTargetFilePath = !empty($_FILES['flight_image']['name']) ? $packageSaveLocation . uniqid() . '_' . basename($_FILES['flight_image']['name']) : $currentImages['flight_image'];
            $facilitiesTargetFilePath = !empty($_FILES['facilities_image']['name']) ? $packageSaveLocation . uniqid() . '_' . basename($_FILES['facilities_image']['name']) : $currentImages['facilities_image'];
            $mealsTargetFilePath = !empty($_FILES['meals_image']['name']) ? $packageSaveLocation . uniqid() . '_' . basename($_FILES['meals_image']['name']) : $currentImages['meals_image'];
            $activitiesTargetFilePath = !empty($_FILES['activities_image']['name']) ? $packageSaveLocation . uniqid() . '_' . basename($_FILES['activities_image']['name']) : $currentImages['activities_image'];

            // Move the uploaded files to the target directory if they are uploaded
            if (!empty($_FILES['flight_image']['name'])) {
                move_uploaded_file($_FILES['flight_image']['tmp_name'], $flightTargetFilePath);
            }
            if (!empty($_FILES['facilities_image']['name'])) {
                move_uploaded_file($_FILES['facilities_image']['tmp_name'], $facilitiesTargetFilePath);
            }
            if (!empty($_FILES['meals_image']['name'])) {
                move_uploaded_file($_FILES['meals_image']['tmp_name'], $mealsTargetFilePath);
            }
            if (!empty($_FILES['activities_image']['name'])) {
                move_uploaded_file($_FILES['activities_image']['tmp_name'], $activitiesTargetFilePath);
            }

            // Prepare the SQL statement to update the destination
            $sql = "UPDATE package 
                    SET package_name=:package_name,description=:description,price =:price,other_region_price=:other_region_price,
                        flight_description=:flight_description,flight_image=:flight_image,facilities=:facilities,
                        facilities_image=:facilities_image,meals=:meals,meals_image=:meals_image,activities=:activities,
                        activities_image=:activities_image,duration=:duration,destination=:destination,tour_guide=:tour_guide 
                    WHERE package_id = :id";
            $stmt = $conn->prepare($sql);

            // Bind the parameters to the prepared statement
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':package_name', $package_name);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':other_region_price', $other_region_price);
            $stmt->bindParam(':flight_description', $flight_description);
            $stmt->bindParam(':flight_image', $flightTargetFilePath);
            $stmt->bindParam(':facilities', $facilities);
            $stmt->bindParam(':facilities_image', $facilitiesTargetFilePath);
            $stmt->bindParam(':meals', $meals);
            $stmt->bindParam(':meals_image', $mealsTargetFilePath);
            $stmt->bindParam(':activities', $activities);
            $stmt->bindParam(':activities_image', $activitiesTargetFilePath);
            $stmt->bindParam(':duration', $duration);
            $stmt->bindParam(':destination', $destination);
            $stmt->bindParam(':tour_guide', $tour_guide);

            // Execute the statement
            $success = $stmt->execute();

            // Send the response back
            if ($success) {
                $response = ['status' => 1, 'message' => 'Package updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update Package'];
            }

            echo json_encode($response);
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;
}
