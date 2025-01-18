<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include 'dbconnect.php';

try {
    // Initialize database connection
    $db = new dbconnect;
    $conn = $db->connect();

    // Get the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if `user_id` is provided
    if (isset($data['user_id'])) {
        $user_id = intval($data['user_id']); // Sanitize input

        // Fetch notifications for the given user
        $stmt = $conn->prepare("
            SELECT notification_id, message, noti_status, created_at 
            FROM notifications 
            WHERE user = :user_id 
            ORDER BY created_at DESC
        ");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return response with notifications
        echo json_encode([
            'status' => 1,
            'notifications' => $notifications,
        ]);
    } else {
        // Invalid input response
        echo json_encode([
            'status' => 0,
            'message' => 'Invalid input: user_id is missing.',
        ]);
    }
} catch (PDOException $e) {
    // Handle database errors
    echo json_encode([
        'status' => 0,
        'message' => 'Database error: ' . $e->getMessage(),
    ]);
} catch (Exception $e) {
    // Handle general errors
    echo json_encode([
        'status' => 0,
        'message' => 'Error: ' . $e->getMessage(),
    ]);
}
