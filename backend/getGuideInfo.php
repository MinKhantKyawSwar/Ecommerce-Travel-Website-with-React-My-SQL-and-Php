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
            if (isset($headers['Guide-Id'])) {
                $guide_id = $headers['Guide-Id'];

                // Connection to database
                $conn = $db->connect();
                $getGuideInfo = "SELECT * FROM tourguide WHERE guide_id = :guide_id";
                $stmt = $conn->prepare($getGuideInfo);
                $stmt->bindParam(':guide_id', $guide_id, PDO::PARAM_INT);
                $stmt->execute();

                $guideInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($guideInfo) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $guideInfo];
                } else {
                    $response = ['status' => 0, 'message' => "No guide found."];
                }
            } else {
                // Connection to database
                $conn = $db->connect();
                $getGuideInfo = "SELECT * FROM tourguide";
                $stmt = $conn->prepare($getGuideInfo);
                $stmt->execute();

                $guide = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($guide) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $guide];
                } else {
                    $response = ['status' => 0, 'message' => "No guide found."];
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

            if (!isset($_FILES['guide_image']) || $_FILES['guide_image']['error'] !== 0) {
                $uploadErrors[] = "Guide image is missing or there was an upload error.";
            }

            // If there are any upload errors, return them
            if (!empty($uploadErrors)) {
                echo json_encode(['status' => 0, 'message' => implode(' ', $uploadErrors)]);
                exit;
            }

            // Proceed with file processing if no errors
            $guideSaveLocation = 'pictures/guide/'; // Directory to save the image

            // Get the file details
            $guide_image_file = $_FILES['guide_image'];
            $guide_image_fileName = basename($guide_image_file['name']);
            $guideTargetFilePath = $guideSaveLocation . uniqid() . '_' . $guide_image_fileName; // Unique name for the file

            // Check if the file is an image (optional)
            $fileTypes = ['jpg', 'jpeg', 'png'];
            $fileType1 = strtolower(pathinfo($guideTargetFilePath, PATHINFO_EXTENSION));
            if (!in_array($fileType1, $fileTypes)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid file type for Guide image.']);
                exit;
            }


            // Move the uploaded file to the target directory
            if (
                move_uploaded_file($guide_image_file['tmp_name'], $guideTargetFilePath)
            ) {
                // Read POST data
                $guide_name = $_POST['guide_name'];
                $email = $_POST['email'];
                $description = $_POST['description'];
                $language = $_POST['language'];
                $exp_years = $_POST['exp_years'];
                $guide_image = $guideTargetFilePath;

                // Connect to the database
                $conn = $db->connect();

                // Prepare the SQL statement to insert new destination
                $sql = "INSERT INTO tourguide (guide_name, email, description, language, exp_years, guide_image) VALUES (:guide_name, :email, :description, :language, :exp_years, :guide_image)";
                $stmt = $conn->prepare($sql);

                // Bind the parameters to the prepared statement
                $stmt->bindParam(':guide_name', $guide_name);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':description', $description);
                $stmt->bindParam(':language', $language);
                $stmt->bindParam(':exp_years', $exp_years);
                $stmt->bindParam(':guide_image', $guide_image);


                // Execute the statement
                $success = $stmt->execute();
                // Send the response back
                if ($success) {
                    $response = ['status' => 1, 'message' => 'Guide added successfully'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to add guide.'];
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
            // Check if "Guide-Id" header exists
            if (isset($headers['Guide-Id'])) {
                $guide_id = $headers['Guide-Id'];
            }
            // Retrieve all data

            $conn = $db->connect();
            $deletePackage = "DELETE FROM tourguide WHERE guide_id= :guide_id";
            $stmt = $conn->prepare($deletePackage);
            $stmt->bindParam(':guide_id', $guide_id);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Guide Information is successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete guide information!"];
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
