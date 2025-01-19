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

            // Query to fetch five random reviews with 5 stars
            $getRandomFiveUserReview = "
                SELECT 
                    review.*, 
                    users.username, 
                    location.city, 
                    location.country, 
                    destination.*
                FROM review
                JOIN users ON users.user_id = review.user
                JOIN destination ON destination.destination_id = review.destination
                JOIN location ON location.location_id = destination.location
                WHERE review.rating = 5
                GROUP BY destination.destination_id
                ORDER BY RAND()
                LIMIT 5
                ";
            $stmt = $conn->prepare($getRandomFiveUserReview);
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
                    'message' => "No reviews found"
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
