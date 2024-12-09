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
    case "GET":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            // Check if "User -Id" header exists
            if (isset($headers['Destination-Id'])) {
                $destination_id = $headers['Destination-Id'];

                $conn = $db->connect();
                $getReviews = "SELECT review.*, users.*
                                from review 
                                 JOIN 
                                    users ON review.user = users.user_id
                                where destination = :destination_id";
                $stmt = $conn->prepare($getReviews);
                $stmt->bindParam(':destination_id', $destination_id, PDO::PARAM_INT); // Corrected binding
                $stmt->execute();

                $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($reviews) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $reviews];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "User-Id header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "POST":
        try {
            // Retrieve all headers
            $data = json_decode($eData);
            $user = $data->user;
            $package = $data->package;
            $saved_at = $data->saved_at;

            $conn = $db->connect();
            $setSavedItems = "INSERT INTO saveditems (user, package, saved_at) VALUES (:user, :package, :saved_at)";
            $stmt = $conn->prepare($setSavedItems);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':package', $package);
            $stmt->bindParam(':saved_at', $saved_at);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Item Successfully saved!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to save item!"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
