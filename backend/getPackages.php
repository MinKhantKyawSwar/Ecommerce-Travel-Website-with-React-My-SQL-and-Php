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
                $getAllPackages = "SELECT 
                                        package.*,
                                        MIN(package_info.price) AS least_price,
                                        location.*,
                                        region.*
                                    FROM package
                                JOIN 
                                    package_info ON package_info.package = package.package_id
                                JOIN
                                    destination ON package.destination = destination.destination_id
                                JOIN
                                    location ON location.location_id = destination.location
                                JOIN
                                    region ON region.region_id = location.region
                                WHERE destination.destination_id = :destination_id
                                GROUP BY package.package_id
                                ORDER BY least_price ASC";
                $stmt = $conn->prepare($getAllPackages);
                $stmt->bindParam(':destination_id', $destination_id, PDO::PARAM_INT);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Destination-ID']) && isset($headers['Package'])) {
                $destination_id = $headers['Destination-ID'];

                // Connection to database
                $conn = $db->connect();
                $getAllPackages = "SELECT 
                                        package.*,
                                        package_info.*,
                                        location.*,
                                        region.*
                                    FROM package
                                JOIN 
                                    package_info ON package_info.package = package.package_id
                                JOIN
                                    destination ON package.destination = destination.destination_id
                                JOIN
                                    location ON location.location_id = destination.location
                                JOIN
                                    region ON region.region_id = location.region
                                WHERE package.destination = :destination_id";
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
                    package.description As package_description,
                    destination.*,
                    tourguide.*,
                    tourguide.description As guide_description,
                    package_info.*
                FROM 
                    package
                JOIN 
                    destination ON package.destination = destination.destination_id
                JOIN 
                    tourguide ON tourguide.guide_id = package.tour_guide
                JOIN 
                    package_info ON package_info.package = package.package_id
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
            $activitiesTargetFilePath = $packageSaveLocation . uniqid() . '_' . $activities_image_fileName; // Unique name for the file

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
                $flight_description = $_POST['flight_description'];;
                $flight_image = $flightTargetFilePath;
                $facilities = $_POST['facilities'];
                $facilities_image = $facilitiesTargetFilePath;
                $meals = $_POST['meals'];
                $meals_image = $mealsTargetFilePath;
                $activities = $_POST['activities'];
                $activities_image = $activitiesTargetFilePath;
                $duration = $_POST['duration'];
                $destination = $_POST['destination'];
                $tour_guide = $_POST['guide_id'];

                // Connect to the database
                $conn = $db->connect();

                // Prepare the SQL statement to insert new destination
                $sql = "INSERT INTO package(package_name, description,flight_description, flight_image, facilities, facilities_image, meals, meals_image, activities, activities_image, duration, destination, tour_guide) VALUES 
                             (:package_name, :description,  :flight_description, :flight_image, :facilities, :facilities_image, :meals, :meals_image, :activities, :activities_image, :duration, :destination, :tour_guide)";
                $stmt = $conn->prepare($sql);

                // Bind the parameters to the prepared statement
                $stmt->bindParam(':package_name', $package_name);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':flight_description', $flight_description);
                $stmt->bindParam(':flight_image', $flight_image);
                $stmt->bindParam(':facilities', $facilities);
                $stmt->bindParam(':facilities_image', $facilities_image);
                $stmt->bindParam(':meals', $meals);
                $stmt->bindParam(':meals_image', $meals_image);
                $stmt->bindParam(':activities', $activities);
                $stmt->bindParam(':activities_image', $activities_image);
                $stmt->bindParam(':duration', $duration);
                $stmt->bindParam(':destination', $destination);
                $stmt->bindParam(':tour_guide', $tour_guide);

                // Execute the statement
                $success = $stmt->execute();


                // Get the last inserted ID
                $lastInsertId = $conn->lastInsertId();

                // Send the response back
                if ($success) {
                    $response = ['status' => 1, 'message' => 'Package added successfully', 'data' =>  $lastInsertId];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to add package'];
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
            // Check if "Package-Id" header exists
            if (isset($headers['Package-Id'])) {
                $package_id = $headers['Package-Id'];
         
            // Retrieve all data

            $conn = $db->connect();
            $deletePackage = "DELETE FROM package_info WHERE package= :package_id";
            $stmt = $conn->prepare($deletePackage);
            $stmt->bindParam(':package_id', $package_id);
            $status1 = $stmt->execute();


            $deletePackage = "DELETE FROM package WHERE package_id= :package_id";
            $stmt = $conn->prepare($deletePackage);
            $stmt->bindParam(':package_id', $package_id);
            $status2 = $stmt->execute();


            if ($status1 && $status2) {
                $response = ['status' => 1, 'message' => "Package successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete Package!"];
            }
        } else if (isset($headers['Package-Info-Id'])) {
                $package_info_id = $headers['Package-Info-Id'];
            // Retrieve all data

            $conn = $db->connect();
            $deletePackage = "DELETE FROM package_info WHERE package_info_id= :package_info_id";
            $stmt = $conn->prepare($deletePackage);
            $stmt->bindParam(':package_info_id', $package_info_id);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Package Details successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete Package Details!"];
            }
        }
        else{
            $response = ['status' => 0, 'message' => "Id is missing!"];
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
