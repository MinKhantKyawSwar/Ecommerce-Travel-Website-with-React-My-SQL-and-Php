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
            // Decode the input data
            $data = json_decode($eData, true);

            // Validate input
            if (!isset($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid or missing email']);
                exit;
            }

            if (!isset($data['password']) || strlen($data['password']) < 6) {
                echo json_encode(['status' => 0, 'message' => 'Password must be at least 6 characters long']);
                exit;
            }

            $email = $data['email'];
            $password = $data['password'];
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Connect to the database
            $conn = $db->connect();

            // Update the password
            $sql = "UPDATE users SET password = :password WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hashedPassword);

            $status = $stmt->execute();

            // Check update status
            if ($status && $stmt->rowCount() > 0) {
                $response = ['status' => 1, 'message' => "Password reset successfully"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to reset password or email not found"];
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