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
            $data = json_decode($eData);

            // connection to database
            $conn = $db->connect();
            if (isset($_GET['id']) && is_numeric($_GET['id'])) {
                $id = intval($_GET['id']);
                $getAllDestination = "SELECT 
                                            destination.*,
                                            category.*,
                                            location.*,
                                            region.*
                                      FROM 
                                            destination
                                      JOIN 
                                            category ON destination.category = category.category_id
                                      JOIN 
                                            location ON destination.location = location.location_id
                                        JOIN
                                            region ON location.region = region.region_id
                                      where destination_id = :id";
                $stmt = $conn->prepare($getAllDestination);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $destination = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($destination) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $destination];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to find!"];
                }
            } else {
                // Query to fetch all destinations
                $getAllDestinations = "SELECT 
              destination.*,
              category.*,
              location.*,
              region.*
        FROM 
              destination
        JOIN 
              category ON destination.category = category.category_id
        JOIN 
              location ON destination.location = location.location_id
        JOIN
              region ON location.region = region.region_id";
                $stmt = $conn->prepare($getAllDestinations);
                $stmt->execute();
                $allDestinations = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows

                if (!empty($allDestinations)) {
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'data' => $allDestinations
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'message' => "No destinations found"
                    ];
                }
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

            // Check if the files are uploaded and handle errors
            if (!isset($_FILES['destination_image']) || $_FILES['destination_image']['error'] !== 0) {
                $uploadErrors[] = 'Destination image is missing or there was an upload error.';
            }
            if (!isset($_FILES['destination_second_image']) || $_FILES['destination_second_image']['error'] !== 0) {
                $uploadErrors[] = 'Second destination image is missing or there was an upload error.';
            }
            if (!isset($_FILES['destination_third_image']) || $_FILES['destination_third_image']['error'] !== 0) {
                $uploadErrors[] = 'Third destination image is missing or there was an upload error.';
            }
            if (!isset($_FILES['accommodation_image']) || $_FILES['accommodation_image']['error'] !== 0) {
                $uploadErrors[] = "Accommodation image is missing or there was an upload error.";
            }

            // If there are any upload errors, return them
            if (!empty($uploadErrors)) {
                echo json_encode(['status' => 0, 'message' => implode(' ', $uploadErrors)]);
                exit;
            }

            // Proceed with file processing if no errors
            $destinationSaveLocation = 'pictures/destination_image/'; // Directory to save the image
            $accommodationSaveLocation = 'pictures/accommodation/'; // Directory to save the image

            // Get the file details
            $destination_image_file = $_FILES['destination_image'];
            $destination_image_fileName = basename($destination_image_file['name']);
            $destinationTargetFilePath = $destinationSaveLocation . uniqid() . '_' . $destination_image_fileName; // Unique name for the file

            // Get the file details
            $destination_second_image_file = $_FILES['destination_second_image'];
            $destination_second_image_fileName = basename($destination_second_image_file['name']);
            $secondDestinationTargetFilePath = $destinationSaveLocation . uniqid() . '_' . $destination_second_image_fileName; // Unique name for the file

            // Get the file details
            $destination_third_image_file = $_FILES['destination_third_image'];
            $destination_third_image_fileName = basename($destination_third_image_file['name']);
            $thirdDestinationTargetFilePath = $destinationSaveLocation . uniqid() . '_' . $destination_third_image_fileName; // Unique name for the file

            // Get the file details
            $accommodation_image_file = $_FILES['accommodation_image'];
            $accommodation_image_fileName = basename($accommodation_image_file['name']);
            $accommodationTargetFilePath = $accommodationSaveLocation . uniqid() . '_' . $accommodation_image_fileName; // Unique name for the file

            // Check if the file is an image (optional)
            $fileTypes = ['jpg', 'jpeg', 'png'];
            $fileType1 = strtolower(pathinfo($destinationTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType1, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for destination image.']);
                exit;
            }
            $fileType2 = strtolower(pathinfo($secondDestinationTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType2, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for second destination image.']);
                exit;
            }
            $fileType3 = strtolower(pathinfo($thirdDestinationTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType3, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for third destination image.']);
                exit;
            }
            $fileType4 = strtolower(pathinfo($accommodationTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType4, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for accommodation image.']);
                exit;
            }

            // Move the uploaded file to the target directory
            if (
                move_uploaded_file($destination_image_file['tmp_name'], $destinationTargetFilePath) &&
                move_uploaded_file($destination_second_image_file['tmp_name'], $secondDestinationTargetFilePath) &&
                move_uploaded_file($destination_third_image_file['tmp_name'], $thirdDestinationTargetFilePath) &&
                move_uploaded_file($accommodation_image_file['tmp_name'], $accommodationTargetFilePath)
            ) {
                // Read POST data
                $country = $_POST['country'];
                $city = $_POST['city'];
                $region = $_POST['region'];
                $description = $_POST['description'];
                $category = $_POST['category'];
                $accommodation = $_POST['accommodation'];
                $destination_image = $destinationTargetFilePath;
                $destination_second_image = $secondDestinationTargetFilePath;
                $destination_third_image = $thirdDestinationTargetFilePath;
                $accommodation_image = $accommodationTargetFilePath;

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

                // Prepare the SQL statement to insert new destination
                $sql = "INSERT INTO destination ( location, description, category, accommodation, destination_image, destination_second_image, destination_third_image, accommodation_image) 
                                 VALUES (:location_id, :description, :category, :accommodation, :destination_image, :destination_second_image, :destination_third_image, :accommodation_image)";
                $stmt = $conn->prepare($sql);

                // Bind the parameters to the prepared statement
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':category', $category);
                $stmt->bindParam(':accommodation', $accommodation);
                $stmt->bindParam(':destination_image', $destination_image);
                $stmt->bindParam(':destination_second_image', $destination_second_image);
                $stmt->bindParam(':destination_third_image', $destination_third_image);
                $stmt->bindParam(':accommodation_image', $accommodation_image);
                $stmt->bindParam(':location_id', $location_id);


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
            // Check if "destination" header exists
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
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
