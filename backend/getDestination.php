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
                $getAllDestination = "SELECT * FROM destination where destination_id = :id";
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
                $getAllDestinations = "SELECT * FROM destination";
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
            // Check if the file is uploaded
            if (isset($_FILES['destination_image']) && $_FILES['destination_image']['error'] === 0 &&
            isset($_FILES['destination_second_image']) && $_FILES['destination_second_image']['error'] === 0 &&
            isset($_FILES['destination_third_image']) && $_FILES['destination_third_image']['error'] === 0 &&
            isset($_FILES['accommodation_image']) && $_FILES['accommodation_image']['error'] === 0
            ) {

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
                $fileType1 = strtolower(pathinfo($destinationTargetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType1, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }
                $fileType2 = strtolower(pathinfo($secondDestinationTargetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType2, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }
                $fileType3 = strtolower(pathinfo($thirdDestinationTargetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType3, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }
                $fileType4 = strtolower(pathinfo($accommodationTargetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType4, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }
                

                // Move the uploaded file to the target directory
                if (move_uploaded_file($destination_image_file['tmp_name'], $destinationTargetFilePath) &&
                move_uploaded_file($destination_second_image_file['tmp_name'], $secondDestinationTargetFilePath) &&
                move_uploaded_file($destination_third_image_file['tmp_name'], $thirdDestinationTargetFilePath) &&
                move_uploaded_file($accommodation_image_file['tmp_name'], $accommodationTargetFilePath)
                ) {
                    // Read POST data
                    $destination_name = $_POST['destination_name'];
                    $country = $_POST['country'];
                    $region = $_POST['region'];
                    $description = $_POST['description'];
                    $category = $_POST['category'];
                    $accommodation = $_POST['accommodation'];
                    $destination_image = $destinationTargetFilePath;
                    $destination_second_image = $secondDestinationTargetFilePath;
                    $destination_third_image = $thirdDestinationTargetFilePath;
                    $accommodation_image = $accommodationTargetFilePath;

                    echo $destination_image;

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
            } else {
                echo json_encode(['status' => 0, 'message' => 'No file uploaded or upload error']);
            }
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;
}
