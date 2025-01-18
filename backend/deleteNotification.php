<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

include 'dbconnect.php';

try {
    $db = new dbconnect;
    $conn = $db->connect();

    // Get raw POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Debugging: Log input data
    file_put_contents('php://stderr', print_r($data, true));

    // Check if `notification_id` or `user_id` is provided
    if (isset($data['notification_id'])) {
        $notification_id = intval($data['notification_id']); // Sanitize input

        // Delete specific notification by ID
        $stmt = $conn->prepare("DELETE FROM notifications WHERE notification_id = :notification_id");
        $stmt->bindParam(':notification_id', $notification_id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'status' => 1,
                'message' => 'Notification deleted successfully.',
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Notification not found or already deleted.',
            ]);
        }
    } elseif (isset($data['user_id'])) {
        $user_id = intval($data['user_id']); // Sanitize input

        // Delete all notifications for a specific user
        $stmt = $conn->prepare("DELETE FROM notifications WHERE user_id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'status' => 1,
                'message' => 'All notifications for the user deleted successfully.',
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'No notifications found for the user.',
            ]);
        }
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'Invalid input: notification_id or user_id is required.',
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'status' => 0,
        'message' => 'Database error: ' . $e->getMessage(),
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 0,
        'message' => 'Error: ' . $e->getMessage(),
    ]);
}
