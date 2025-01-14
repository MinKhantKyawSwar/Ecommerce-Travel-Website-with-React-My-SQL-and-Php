<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

include 'dbconnect.php';
$db = new dbconnect;

// Check if user_id is passed via GET request
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

    try {
        // Connect to the database
        $conn = $db->connect();

        // Prepare SQL query to fetch customer details
        $sql = "SELECT * FROM users WHERE user_id = :user_id LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();

        // Fetch user data
        $customer = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($customer) {
            // If customer exists, return data
            $response = [
                'status' => 1,
                'message' => 'Customer found',
                'data' => $customer
            ];
        } else {
            // If customer not found
            $response = [
                'status' => 0,
                'message' => 'Customer not found',
                'data' => $user_id
            ];
        }
    } catch (PDOException $e) {
        // Handle errors
        $response = [
            'status' => 0,
            'message' => 'Database error: ' . $e->getMessage()
        ];
    }
} else {
    // If user_id is not provided
    $response = [
        'status' => 0,
        'message' => 'No user_id provided'
    ];
}

// Return response as JSON
echo json_encode($response);
?>
