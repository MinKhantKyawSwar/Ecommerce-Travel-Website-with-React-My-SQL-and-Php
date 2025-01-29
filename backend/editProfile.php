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
            // Get POST data including user_id
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : null;
            $username = isset($_POST['username']) ? $_POST['username'] : null;
            $email = isset($_POST['email']) ? $_POST['email'] : null;
            $phone = isset($_POST['phone']) ? $_POST['phone'] : null;

            // Ensure user_id is provided
            if (!$user_id) {
                echo json_encode(['status' => 0, 'message' => 'User ID is required']);
                exit;
            }

            // Connect to the database
            $conn = $db->connect();

            // Fetch the current profile image and other user data based on user_id
            $sql1 = "SELECT profile_image FROM users WHERE user_id = :user_id";
            $stmt = $conn->prepare($sql1);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                echo json_encode(['status' => 0, 'message' => 'User not found']);
                exit;
            }

            // Initialize the profile image variable
            $profile_image = !empty($user["profile_image"]) ? $user["profile_image"] : null;

            // Check if the file is uploaded and process the new profile image
            if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === 0) {
                // Get file details
                $file = $_FILES['profile_image'];
                $fileName = basename($file['name']);
                $saveLocation = 'pictures/profile/'; // Directory to save the image
                $targetFilePath = $saveLocation . uniqid() . '_' . $fileName; // Unique name for the file

                // Validate the file type
                $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
                if (!in_array($fileType, ['jpg', 'jpeg', 'png'])) {
                    echo json_encode(['status' => 0, 'message' => 'Invalid file type']);
                    exit;
                }

                // Move the uploaded file to the target directory
                if (move_uploaded_file($file['tmp_name'], $targetFilePath)) {
                    // If a new file is uploaded, unlink the previous profile image
                    if (!empty($user["profile_image"]) && file_exists($user["profile_image"])) {
                        unlink($user["profile_image"]);
                    }
                    $profile_image = $targetFilePath; // Update profile image path
                } else {
                    echo json_encode(['status' => 0, 'message' => 'File upload failed']);
                    exit;
                }
            }

            // Prepare the SQL statement to update user data
            $sql = "UPDATE users SET username = :username, email = :email, phone = :phone, profile_image = :profile_image WHERE user_id = :user_id";
            $stmt = $conn->prepare($sql);

            // Bind the parameters to the prepared statement
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':profile_image', $profile_image); // Bind the profile image path

            // Execute the statement
            $success = $stmt->execute();

            // Send the response back
            if ($success) {
                $response = ['status' => 1, 'message' => 'User updated successfully'];
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
?>
