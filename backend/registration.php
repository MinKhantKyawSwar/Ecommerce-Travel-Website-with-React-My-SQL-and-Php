<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");
    // header("Access-Control-Allow-Headers: Content-Type");

    $server = "localhost";
    $port = 3306;
    $user = "root";
    $password = "";
    try {
        $conn = new PDO("mysql:host=$server;port=$port;dbname=ecommtest", $user, $password);
        echo "Successfully Connected!";
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    if (isset($dData['user'], $dData['email'], $dData['password'])) {
        $user = $dData['user'];
        $email = $dData['email'];
        $password = $dData['password'];
        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
    
        if ($user !== "" && $email !== "" && $password !== "") {
            try {
                // Use prepared statements to prevent SQL injection
                $sql = "INSERT INTO user (user, email, pass) VALUES (:user, :email, :password)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $hashedpassword);
    
                if ($stmt->execute()) {
                    $result = "You have registered successfully!";
                } else {
                    $result = "Registration failed.";
                }
            } catch (PDOException $e) {
                $result = "Error: " . $e->getMessage();
            }
        } else {
            $result = "All fields are required!";
        }
    } else {
        $result = "Invalid input!";
    }
    
    // Close the connection
    $conn = null;
    // Send response
    $response = $result;
    echo $response;
    echo json_encode($response);
?>