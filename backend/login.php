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
            $email = $data->email;
            $password = $data->password;

            // Connection to database
            $conn = $db->connect();

            // Check if the user exists
            $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            $hashedPassword = $user['password'];
            // Verify the password
            if (!password_verify($password, $hashedPassword)) {
                $response = ['status' => 0, 'message' => "Invalid password"];
            } else {
                if (strtolower($user['status']) === "approved") { // Case-insensitive check for 'ban'
                    $tokenData = [
                        'id' => $user['user_id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'exp' => time() + (86400)
                    ];
    
                    $token = base64_encode(json_encode($tokenData));
                    $response = ['status' => 1, 'message' => "Login successful", 'token' => $token, 'id' => $user['user_id'], 'email' => $user['email']];
                } else {
                    $response = [
                        'status' => 2,
                        'message' => "Your account has been suspended for some reason! Please contact our customer service for more information."
                    ];
                }
            }

            if (!$user) {
                $response = ['status' => 0, 'message' => "User not found"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "GET": {
            $headers = apache_request_headers();

            if (!isset($headers['Authorization'])) {
                return null;
            }

            $token = str_replace('Bearer ', '', $headers['Authorization']);

            $recievedToken = json_decode(base64_decode($token), true);

            $id = $recievedToken['id'];
            $exp = $recievedToken['exp'];

            if (isset($$id) && isset($exp)) {
                if ($exp < time()) {
                    return null;
                }
                return $id;
            }
            if (!$id) {
                $response = ['status' => 0, 'message' => "Invalid token"];
            }

            try {
                $conn = $db->connect();
                $sql = "SELECT * FROM users where user_id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();

                $customer = $stmt->fetch(PDO::FETCH_ASSOC);
                // echo $customer['username'];

                if ($customer) {
                    $response = ['status' => 1, 'message' => "User exists.", "customer" => $customer];
                } else {
                    $response = ['status' => 0, 'message' => "User Does not Exist."];
                }
                $response;
            } catch (PDOException $e) {
                $response = ['status' => 0, 'message' => "Error Occurs", 'error' => $e->getMessage()];
            }
            echo json_encode($response);
            break;
        }

    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
