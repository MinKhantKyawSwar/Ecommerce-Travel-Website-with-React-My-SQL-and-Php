<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$db = new dbconnect;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Connection to database
            $conn = $db->connect();
            $getGuideInfo = "SELECT * FROM tourguide";
            $stmt = $conn->prepare($getGuideInfo);
            $stmt->execute();

            $guide = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($guide) {
                $response = ['status' => 1, 'message' => "Data found", 'data' => $guide];
            } else {
                $response = ['status' => 0, 'message' => "No guide found."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
