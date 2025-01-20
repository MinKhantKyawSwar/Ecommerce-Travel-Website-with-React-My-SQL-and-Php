<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

require_once 'dbconnect.php';
$db = new dbconnect;

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Check if the "query" parameter exists in the URL query string
            if (isset($_GET['query'])) {
                $query = "%" . $_GET['query'] . "%"; // Add wildcards for partial matching

                // Connection to the database
                $conn = $db->connect();

                // SQL query to search both city and country
                $searchDestinations = "
                    SELECT destination.destination_id, location.city, location.country
                    FROM destination
                    JOIN location ON location.location_id = destination.location
                    WHERE location.city LIKE :query OR location.country LIKE :query
                    LIMIT 10
                ";

                // Prepare and execute the query
                $stmt = $conn->prepare($searchDestinations);
                $stmt->bindParam(':query', $query, PDO::PARAM_STR);
                $stmt->execute();

                // Fetch the results
                $destinations = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($destinations) {
                    $response = ['status' => 1, 'message' => "Destinations found", 'data' => $destinations];
                } else {
                    $response = ['status' => 0, 'message' => "No destinations found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "Missing 'query' parameter in the URL."];
            }
        } catch (Exception $e) {
            // Handle any exceptions
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        break;

    // Additional methods (POST, PUT, DELETE) can go here if needed

    default:
        $response = ['status' => 0, 'message' => "Method not allowed"];
        break;
}

// Output the response as JSON
echo json_encode($response);

