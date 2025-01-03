<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$db = new dbconnect;

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        try {
            // Read POST data
            $username = $_POST['username'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
    
            // Connect to the database
            $conn = $db->connect();
    
            // Fetch the current profile image
            $sql1 = "SELECT profile_image FROM users WHERE email = :email";
            $stmt = $conn->prepare($sql1);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $product = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // Initialize the profile image variable
            $profile_image = !empty($product["profile_image"]) ? $product["profile_image"] : null;
    
            // Check if the file is uploaded
            if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === 0) {
                // Get the file details
                $file = $_FILES['profile_image'];
                $fileName = basename($file['name']);
                $saveLocation = 'pictures/profile/'; // Directory to save the image
                $targetFilePath = $saveLocation . uniqid() . '_' . $fileName; // Unique name for the file
    
                // Check if the file is an image (optional)
                $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }
    
                // Move the uploaded file to the target directory
                if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
                    // If a new file is uploaded, unlink the previous profile image
                    if (!empty($product["profile_image"]) && file_exists($product["profile_image"])) {
                        unlink($product["profile_image"]);
                    }
                    $profile_image = $targetFilePath;  // Update the profile image path
                } else {
                    echo json_encode(['status' => 0, 'message' => 'File upload failed']);
                    exit;
                }
            }
    
            // Prepare the SQL statement to update user data
            $sql = "UPDATE users SET username = :username, email = :email, phone = :phone, profile_image = :profile_image WHERE email = :email";
            $stmt = $conn->prepare($sql);
    
            // Bind the parameters to the prepared statement
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':profile_image', $profile_image); // Bind the profile image path (could be null)
    
            // Execute the statement
            $success = $stmt->execute();
            // Send the response back
            if ($success) {
                $response = ['status' => 1, 'message' => 'User  updated successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to update user'];
            }
    
            echo json_encode($response);
    
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Error: ' . $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(['status' => 0, 'message' => 'Unsupported request method']);
        break;
}