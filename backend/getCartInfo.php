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
            $user_id = $data->user_id;
            // connection to database
            $conn = $db->connect();
            $getALlCartItemCount = "SELECT 
                            COUNT(*) as item_count
                          FROM 
                            saveditems
                          JOIN 
                            users On users.user_id = saveditems.user
                          WHERE 
                            users.user_id = :user_id";
            $stmt = $conn->prepare($getALlCartItemCount);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();
            $itemCount = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch the count

            if ($itemCount && $itemCount['item_count'] > 0) {
                $response = [
                    'status' => 1,
                    'message' => "Data found",
                    'data' => $itemCount
                ];
            } else {
                $response = [
                    'status' => 0,
                    'message' => "No items found"
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
