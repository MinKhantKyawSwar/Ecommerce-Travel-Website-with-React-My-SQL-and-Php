<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$objDb = new dbconnect;

$eData = file_get_contents('php://input');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "POST":
        try {
            $data = json_decode($eData);
            $email = $data->email;
            $password = $data->password;

            // Connection to database
            $conn = $objDb->connect();

            // Check if the user exists
            $sql = "SELECT * FROM user WHERE email = :email LIMIT 1";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            $hashedPassword = $user['pass'];
            // Verify the password
            if (!password_verify($password, $hashedPassword)) {
                $response = ['status' => 0, 'message' => "Invalid password"];
            } else {
                $tokenData = [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'exp' => time() + (86400) // Token expiration (1 day)
                ];

                $token = base64_encode(json_encode($tokenData));
                $response = ['status' => 1, 'message' => "Login successful",'token' => $token, 'user_id' => $user['id']];
            }

            if (!$user) {
                header("Status: 404");
                $response = ['status' => 0, 'message' => "User not found"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "GET":
        $headers = apache_request_headers();

        if (!isset($headers['Authorization'])) {
            return null;
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);


        $recievedToken = json_decode(base64_decode($token), true);
        $id = $recievedToken['id'];
        $exp = $recievedToken['exp'];

        if (isset($id) && isset($exp)) {

            if ($exp < time()) {
                return null;
            }

            return $id;
        }

        if (!$id) {
            $response = ['status' => 0, 'message' => "Invalid token"];
        }

        try {
            $sql = "SELECT id, name, email FROM user where id = :id";
            $conn = $objDb->connect();
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":id", $userId);
            $stmt->execute();

            if ($stmt->rowCount() == 0) {
                $response = ['status' => 0, 'message' => "User Not Found"];
            }

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $response = ['status' => 1, 'message' => "User Found", "user" => $user];
        } catch (PDOException $e) {
            return $response = ['status' => 0, 'message' => "Database Error", 'error' => $e->getMessage()];
        }
}
