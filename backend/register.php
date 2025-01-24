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
            $data = json_decode($eData);
            $username = $data->username;
            $email = $data->email;
            $phone = $data->phone;
            $role = $data->role;
            
            $password = $data->password;
            $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
            
            $created_at = $data->created_at;
            $profile_image = $data->profile_image;
            $status = $data->status;

            // connection to database
            $conn = $db->connect();

            //checking user name or email is already exists
            $checkUser = "SELECT * FROM users WHERE username = :username OR email = :email";
            $stmt = $conn->prepare($checkUser);
            $stmt->bindParam(':username', $data->username);
            $stmt->bindParam(':email', $data->email);
            $stmt->execute();
            $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existingUser) {
                header("Status: 409");
                // conflict (user already exist code = 6 (custom))
                $response = ['status' => 6, 'message' => "User or email already exists"];
            } else {
                // adding data into database
                $sql = "INSERT INTO users (username, email, phone,role,profile_image, password, created_at, status) VALUES (:username, :email, :phone, :role, :profile_image, :password, :created_at, :status)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':phone', $phone);
                $stmt->bindParam(':role', $role);
                $stmt->bindParam(':profile_image', $profile_image);
                $stmt->bindParam(':password', $hashedpassword);
                $stmt->bindParam(':created_at', $created_at);
                $stmt->bindParam(":status", $status);
                $status = $stmt->execute();

                if ($status) {
                    $response = ['status' => 1, 'message' => "Account Created Successfully!"];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to create account!"];
                }
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
