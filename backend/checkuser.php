<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type");

    include 'dbconnect.php';
    $objDb = new dbconnect;
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);


    $user = isset($dData['user']) ? trim($dData['user']) : "";

    if (!empty($user)) {
        $user = $data->user;
        // Prepare and execute the query securely using prepared statements
        $sql = "SELECT * FROM user WHERE user = 'user'";
        $conn = $objDb->connect();
        $stmt = $conn->prepare($sql);
        $stmt->execute(['user' => $user->user]);
        $result = $stmt->fetch();

        if ($result > 0) {
            $response = ["result" => "Username is already Taken!"];
        } else {
            $response = ["result" => ""]; // Username is available
        }
    } else {
        $response = ["result" => "Username is empty"];
    }

// Return the JSON response
echo json_encode($response);
?>