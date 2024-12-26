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
            $data = json_decode($eData);

            // connection to database
            $conn = $db->connect();

            // Query to fetch all destinations
            $getAllCategories = "SELECT * FROM category";
            $stmt = $conn->prepare($getAllCategories);
            $stmt->execute();
            $allCategories = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($allCategories)) {
                $response = [
                    'status' => 1,
                    'message' => "Data found",
                    'data' => $allCategories
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "No destinations found"
                ];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
