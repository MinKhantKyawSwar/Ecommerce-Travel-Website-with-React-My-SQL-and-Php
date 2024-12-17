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
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Package-Id'])) {
                $package_id = (int) $headers['Package-Id'];

                $conn = $db->connect();
                $getPackageDetails = "
                SELECT 
                    package.*, 
                    destination.destination_name, 
                    destination.country, 
                    destination.region, 
                    destination.accommodation, 
                    destination.accommodation_image,
                    tourguide.guide_id,
                    tourguide.guide_name,
                    tourguide.language,
                    tourguide.exp_years,
                    tourguide.guide_image,
                    tourguide.description As guide_description
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
                    $response = ['status' => 0, 'message' => "No packages found.", "package_id" => $packageDetail];
                }
            } else {
                $response = ['status' => 0, 'message' => "Destination-ID header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    case "POST":
        try {
            // Initialize an array to hold error messages
            $uploadErrors = [];
            
            if (!isset($_FILES['flight_image']) || $_FILES['flight_image']['error'] !== 0) {
                $uploadErrors[] = "Flight image is missing or there was an upload error.";
            }
            if (!isset($_FILES['facilities_image']) || $_FILES['facilities_image']['error'] !== 0) {
                $uploadErrors[] = "Facilities image is missing or there was an upload error.";
            }
            if (!isset($_FILES['meals_image']) || $_FILES['meals_image']['error'] !== 0) {
                $uploadErrors[] = "Meals image is missing or there was an upload error.";
            }
            if (!isset($_FILES['activities_image']) || $_FILES['activities_image']['error'] !== 0) {
                $uploadErrors[] = "Activities image is missing or there was an upload error.";
            }

            // If there are any upload errors, return them
            if (!empty($uploadErrors)) {
                echo json_encode(['status' => 0, 'message' => implode(' ', $uploadErrors)]);
                exit;
            }

            // Proceed with file processing if no errors
            $packageSaveLocation = 'pictures/package/'; // Directory to save the image

            // Get the file details
            $flight_image_file = $_FILES['flight_image'];
            $flight_image_fileName = basename($flight_image_file['name']);
            $flightTargetFilePath = $packageSaveLocation . uniqid() . '_' . $flight_image_fileName; // Unique name for the file

            // Get the file details
            $facilities_image_file = $_FILES['facilities_image'];
            $facilities_image_fileName = basename($facilities_image_file['name']);
            $facilitiesTargetFilePath = $packageSaveLocation . uniqid() . '_' . $facilities_image_fileName; // Unique name for the file

            // Get the file details
            $meals_image_file = $_FILES['meals_image'];
            $meals_image_fileName = basename($meals_image_file['name']);
            $mealsTargetFilePath = $packageSaveLocation . uniqid() . '_' . $meals_image_fileName; // Unique name for the file

            // Get the file details
            $activities_image_file = $_FILES['activities_image'];
            $activities_image_fileName = basename($activities_image_file['name']);
            $activitiesTargetFilePath = $accommodationSaveLocation . uniqid() . '_' . $activities_image_fileName; // Unique name for the file

            // Check if the file is an image (optional)
            $fileTypes = ['jpg', 'jpeg', 'png'];
            $fileType1 = strtolower(pathinfo($flightTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType1, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for destination image.']);
                exit;
            }
            $fileType2 = strtolower(pathinfo($facilitiesTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType2, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for second destination image.']);
                exit;
            }
            $fileType3 = strtolower(pathinfo($mealsTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType3, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for third destination image.']);
                exit;
            }
            $fileType4 = strtolower(pathinfo($activitiesTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType4, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for accommodation image.']);
                exit;
            }

            // Move the uploaded file to the target directory
            if (
                move_uploaded_file($flight_image_file['tmp_name'], $flightTargetFilePath) &&
                move_uploaded_file($facilities_image_file['tmp_name'], $facilitiesTargetFilePath) &&
                move_uploaded_file($meals_image_file['tmp_name'], $mealsTargetFilePath) &&
                move_uploaded_file($activities_image_file['tmp_name'], $activitiesTargetFilePath)
            ) {
                // Read POST data
                $package_name = $_POST['package_name'];
                $description = $_POST['description'];
                $price = $_POST['price'];
                $other_region_price = $_POST['other_region_price'];
                $flight_description = $_POST['flight_description'];
                $accommodation = $_POST['accommodation'];
                $flight_image = $flightTargetFilePath;
                $facilities = $_POST['facilities'];
                $facility_image = $facilitiesTargetFilePath;
                $meals = $_POST['meals'];
                $meals_image = $mealsTargetFilePath;
                $activities = $_POST['activities'];
                $activities_image = $activitiesTargetFilePath;
                $activities = $_POST['activities'];
                $duration = $_POST['duration'];


                // Connect to the database
                $conn = $db->connect();

                // Prepare the SQL statement to insert new destination
                $sql = "INSERT INTO destination (destination_name, country, region, description, category, accommodation, destination_image, destination_second_image, destination_third_image, accommodation_image) 
                                     VALUES (:destination_name, :country, :region, :description, :category, :accommodation, :destination_image, :destination_second_image, :destination_third_image, :accommodation_image)";
                $stmt = $conn->prepare($sql);

                // Bind the parameters to the prepared statement
                $stmt->bindParam(':destination_name', $destination_name);
                $stmt->bindParam(':country', $country);
                $stmt->bindParam(':region', $region);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':category', $category);
                $stmt->bindParam(':accommodation', $accommodation);
                $stmt->bindParam(':destination_image', $destination_image);
                $stmt->bindParam(':destination_second_image', $destination_second_image);
                $stmt->bindParam(':destination_third_image', $destination_third_image);
                $stmt->bindParam(':accommodation_image', $accommodation_image);

                // Execute the statement
                $success = $stmt->execute();
                // Send the response back
                if ($success) {
                    $response = ['status' => 1, 'message' => 'Destination added successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to add destination'];
                }

                echo json_encode($response);
            } else {
                echo json_encode(['status' => 0, 'message' => 'File upload failed']);
            }
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;
    case "DELETE":
        try {
            $headers = getallheaders();
            // Check if "User -Id" header exists
            if (isset($headers['Destination_Id'])) {
                $destination_id = $headers['Destination_Id'];
            }
            // Retrieve all data

            $conn = $db->connect();
            $deleteDestination = "DELETE FROM destination WHERE destination_id= :destination_id";
            $stmt = $conn->prepare($deleteDestination);
            $stmt->bindParam(':destination_id', $destination_id);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Destination successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete Destination!"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
