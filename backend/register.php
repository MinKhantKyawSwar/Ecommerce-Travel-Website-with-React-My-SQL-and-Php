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
    switch($method){
        case "POST":
            try{
                $data = json_decode($eData);
                $user = $data->user;
                $email = $data->email;
                $password = $data->password;
                $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

                // connection to database
                $conn = $objDb->connect();

                //checking user name or email is already exists
                $checkUser = "SELECT * FROM user WHERE user = :user OR email = :email";
                $stmt = $conn->prepare($checkUser);
                $stmt->bindParam(':user', $data->user);
                $stmt->bindParam(':email', $data->email);
                $stmt->execute();
                $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

                if($existingUser){
                    header("Status: 409");
                    // conflict (user already exist code = 6 (custom))
                    $response = ['status' => 6, 'message' => "User or email already exists"];
                }
                else{
                    // adding data into database
                    $sql = "INSERT INTO user (user, email, pass) VALUES (:user, :email, :password)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':user', $data->user);
                    $stmt->bindParam(':email', $data->email);
                    $stmt->bindParam(':password', $hashedpassword);  
                    $status = $stmt->execute();

                    if ($status) {
                        $response = ['status' => 1, 'message' => "Account Created Successfully"];
                    } else {
                        $response= ['status' => 0, 'message' => "Failed to create account"];
                    }
                }


            } catch (PDOException $e) {
                $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
            }
            echo json_encode($response);
            break; 
    }
          // Close the connection
?>