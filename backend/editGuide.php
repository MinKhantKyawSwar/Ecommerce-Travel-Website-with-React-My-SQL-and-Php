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

            $guide_name = $_POST['guide_name'];
            $email = $_POST['email'];
            $description = $_POST['description'];
            $language = $_POST['language'];;
            $exp_years = $_POST['exp_years'];
            $id = $_POST['id'];

            // Connect to the database
            $conn = $db->connect();

            // Fetch the current images to unlink them if they exist
            $sql1 = "SELECT guide_image FROM tourguide WHERE guide_id = :id";
            $stmt = $conn->prepare($sql1);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $currentImages = $stmt->fetch(PDO::FETCH_ASSOC);

            // Initialize file paths
            $guideSaveLocation = 'pictures/guide/'; // Directory to save the image

            // Process each image upload
            $guideImageFilePath = !empty($_FILES['guide_image']['name']) ? $guideSaveLocation . uniqid() . '_' . basename($_FILES['guide_image']['name']) : $currentImages['guide_image'];

            // Move the uploaded files to the target directory if they are uploaded
            if (!empty($_FILES['guide_image']['name'])) {
                move_uploaded_file($_FILES['guide_image']['tmp_name'], $guideImageFilePath);
            }


            // Prepare the SQL statement to update the destination
            $sql = "UPDATE tourguide 
                    SET guide_name=:guide_name,email =:email,description=:description,language=:language,
                        exp_years=:exp_years,guide_image=:guide_image 
                    WHERE guide_id = :id";
            $stmt = $conn->prepare($sql);

            // Bind the parameters to the prepared statement
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':guide_name', $guide_name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':language', $language);
            $stmt->bindParam(':exp_years', $exp_years);
            $stmt->bindParam(':guide_image', $guideImageFilePath);


            // Execute the statement
            $success = $stmt->execute();

            // Send the response back
            if ($success) {
                $response = ['status' => 1, 'message' => 'Guide Information updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update Guide Information'];
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
