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
    echo  $eData;
    $method = $_SERVER['REQUEST_METHOD'];
    switch($method){
        case "POST":
            try{
                $data = json_decode($eData);
                $password = $data->password;
                $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

                $sql = "SELECT * FROM USER WHERE = {:user, :email, :password}";
                $conn = $objDb->connect();
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':user', $data->user);
                $stmt->bindParam(':email', $data->email);
                $stmt->bindParam(':password', $hashedpassword);
                
                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => "Login Successfully"];
                } else {
                    $response= ['status' => 0, 'message' => "Failed to create account"];
                }
            } catch (PDOException $e) {
                $response = "Error: " . $e->getMessage();
            }
            break;
        }
          // Close the connection
?>