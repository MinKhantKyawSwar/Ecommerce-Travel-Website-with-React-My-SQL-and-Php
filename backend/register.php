<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");
    include 'dbconnect.php';
    $objDb = new dbconnect;

    $eData = file_get_contents('php://input');
    // $eData = file_get_contents("php://input");
    // $dData = json_decode($eData, true);

    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            try{
                $data = json_decode($eData);
                $password = $data->password;
                $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
                  
                $checkUser = "SELECT * FROM user (user, email, pass) where user = $user OR email = $email";
                $sql = "INSERT INTO user (user, email, pass) VALUES (:user, :email, :password)";
                $conn = $objDb->connect();
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':user', $data->user);
                $stmt->bindParam(':email', $data->email);
                $stmt->bindParam(':password', $hashedpassword);
                
            $status = $stmt->execute();
            echo $status;
                if ($status) {
                    $response = ['status' => 1, 'message' => "Account Created Successfully"];
                } else {
                    $response= ['status' => 0, 'message' => "Failed to create account"];
                }
            } catch (PDOException $e) {
                $response = "Error: " . $e->getMessage();
            }
            echo json_encode($response);
            break; 
    }
          // Close the connection
?>