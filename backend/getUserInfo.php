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
            if (isset($_GET['id']) && is_numeric($_GET['id'])) {
                $id = intval($_GET['id']);
                $getOneUserInfo = "SELECT * FROM users where user_id = :id";
                $stmt = $conn->prepare($getOneUserInfo);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $userInfo = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($usersInfo) {

                    $response = ['status' => 1, 'message' => "Data found", 'data' => $userInfo];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to find!"];
                }
            } else {
                // Query to fetch all destinations
                $getAllUsersInfo = "SELECT * FROM users where role = 'customer'";
                $stmt = $conn->prepare($getAllUsersInfo);
                $stmt->execute();
                $allUsersInfo = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all rows

                if (!empty($allUsersInfo)) {
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'data' => $allUsersInfo
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'message' => "No ysers found"
                    ];
                }
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
