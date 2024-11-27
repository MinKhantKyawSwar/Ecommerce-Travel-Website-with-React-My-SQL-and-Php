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
                } else{
                    header("Status: 401");
                    $response = ['status' => 1, 'message' => "Login successful"];
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
}
?>
