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
        
                // Insert the new review into the review table
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
                    // Review successfully added, now calculate the average rating for the destination
                    $getAvgReview = "
                        SELECT
                            ROUND(AVG(review.rating),1) AS average_rating
                        FROM
                            review
                        JOIN
                            destination ON review.destination = destination.destination_id
                        JOIN 
                            users ON users.user_id = review.user
                        JOIN 
                            location ON location.location_id = destination.location
                        WHERE review.destination = :destination";
                    $stmt2 = $conn->prepare($getAvgReview);
                    $stmt2->bindParam(":destination", $destination);
                    $stmt2->execute();
        
                    // Fetch the calculated average rating
                    $result = $stmt2->fetch(PDO::FETCH_ASSOC);
                    $average_rating = $result['average_rating'];
        
                    if ($average_rating !== null) {
                        // Update the destination with the new average rating
                        $updateAvgReview = "UPDATE destination SET rating = :average_rating WHERE destination_id = :destination_id";
                        $stmt3 = $conn->prepare($updateAvgReview);
                        $stmt3->bindParam(":average_rating", $average_rating); // Bind the average_rating correctly
                        $stmt3->bindParam(":destination_id", $destination); // Use the correct parameter for destination_id
                        $status3 = $stmt3->execute();
                    }
        
                    // Prepare the response
                    $response = ['status' => 1, 'message' => "Review successfully given!"];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to save item!"];
                }
            } catch (Exception $e) {
                $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
            }
            echo json_encode($response);
            break;
        
    case "PUT":
        try {
            $data = json_decode(json: $eData);
            $review_id = $data->review_id;
            $review_title = $data->reviewTitle;
            $description = $data->description;
            $rating = $data->rating;
            $created_at = $data->created_at;
            $user = $data->userId;
            $destination = $data->destination;

            $conn = $db->connect();
            $updateReview = "UPDATE review SET review_title = :review_title, description = :description, rating = :rating WHERE review_id = :review_id AND destination = :destination";
            $stmt = $conn->prepare($updateReview);
            $stmt->bindParam(':review_title', $review_title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':destination', $destination);
            $stmt->bindParam(':review_id', $review_id, PDO::PARAM_INT);
            $status = $stmt->execute();

            if ($status) {
                  // Review successfully added, now calculate the average rating for the destination
                  $getAvgReview = "
                  SELECT
                      ROUND(AVG(review.rating),1) AS average_rating
                  FROM
                      review
                  JOIN
                      destination ON review.destination = destination.destination_id
                  JOIN 
                      users ON users.user_id = review.user
                  JOIN 
                      location ON location.location_id = destination.location
                  WHERE review.destination = :destination";
              $stmt2 = $conn->prepare($getAvgReview);
              $stmt2->bindParam(":destination", $destination);
              $stmt2->execute();
  
              // Fetch the calculated average rating
              $result = $stmt2->fetch(PDO::FETCH_ASSOC);
              $average_rating = $result['average_rating'];
  
              if ($average_rating !== null) {
                  // Update the destination with the new average rating
                  $updateAvgReview = "UPDATE destination SET rating = :average_rating WHERE destination_id = :destination_id";
                  $stmt3 = $conn->prepare($updateAvgReview);
                  $stmt3->bindParam(":average_rating", $average_rating); // Bind the average_rating correctly
                  $stmt3->bindParam(":destination_id", $destination); // Use the correct parameter for destination_id
                  $status3 = $stmt3->execute();
              }

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
                  // Review successfully added, now calculate the average rating for the destination
                  $getAvgReview = "
                  SELECT
                      ROUND(AVG(review.rating),1) AS average_rating
                  FROM
                      review
                  JOIN
                      destination ON review.destination = destination.destination_id
                  JOIN 
                      users ON users.user_id = review.user
                  JOIN 
                      location ON location.location_id = destination.location
                  WHERE review.destination = :destination";
              $stmt2 = $conn->prepare($getAvgReview);
              $stmt2->bindParam(":destination", $destination);
              $stmt2->execute();
  
              // Fetch the calculated average rating
              $result = $stmt2->fetch(PDO::FETCH_ASSOC);
              $average_rating = $result['average_rating'];
  
              if ($average_rating !== null) {
                  // Update the destination with the new average rating
                  $updateAvgReview = "UPDATE destination SET rating = :average_rating WHERE destination_id = :destination_id";
                  $stmt3 = $conn->prepare($updateAvgReview);
                  $stmt3->bindParam(":average_rating", $average_rating); // Bind the average_rating correctly
                  $stmt3->bindParam(":destination_id", $destination); // Use the correct parameter for destination_id
                  $status3 = $stmt3->execute();
              }

                $response = ['status' => 1, 'message' => "Review successfully deleted!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to delete review!"];
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
