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
            // Check if "Destination-Id" header exists
            if (isset($headers['Destination-Id'])) {
                $destination_id = $headers['Destination-Id'];

                $conn = $db->connect();
                $getReviews = "SELECT review.*, users.*
                                FROM review 
                                JOIN users ON review.user = users.user_id
                                WHERE destination = :destination_id";
                $stmt = $conn->prepare($getReviews);
                $stmt->bindParam(':destination_id', $destination_id, PDO::PARAM_INT);
                $stmt->execute();

                $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($reviews) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $reviews];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "Destination-Id header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "POST":
        try {
            // Retrieve all data
            $data = json_decode($eData);
            $review_title = $data->reviewTitle;
            $description = $data->description;
            $rating = $data->rating;
            $created_at = $data->created_at;
            $user = $data->userId;
            $destination = $data->destination;

            $conn = $db->connect();
            $setSavedItems = "INSERT INTO review (review_title, description, rating, created_at, user, destination) VALUES 
            (:review_title, :description, :rating, :created_at, :user, :destination)";
            $stmt = $conn->prepare($setSavedItems);
            $stmt->bindParam(':review_title', $review_title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':created_at', $created_at);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':destination', $destination);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Review Successfully given!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to save item!"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "PUT":
        try {
            // Retrieve all data
            $data = json_decode($eData);
            $review_id = $data->reviewId; // ID of the review to update
            $review_title = $data->reviewTitle;
            $description = $data->description;
            $rating = $data->rating;

            $conn = $db->connect();
            $updateReview = "UPDATE review SET review_title = :review_title, description = :description, rating = :rating WHERE id = :review_id";
            $stmt = $conn->prepare($updateReview);
            $stmt->bindParam(':review_title', $review_title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':review_id', $review_id, PDO::PARAM_INT);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Review successfully updated!"];
            } else {
                $response = ['status' => 0, ' message' => "Failed to update review!"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        try {
            $headers = getallheaders();
            // Check if "User -Id" header exists
            if (isset($headers['Review_Id'])) {
                $reviewId = $headers['Review_Id'];
            }
            // Retrieve all data

            $conn = $db->connect();
            $deleteReview = "DELETE FROM review WHERE review_id= :review_id";
            $stmt = $conn->prepare($deleteReview);
            $stmt->bindParam(':review_id', $reviewId);
            $status = $stmt->execute();

            if ($status) {
                $response = ['status' => 1, 'message' => "Review successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete review!"];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
}
