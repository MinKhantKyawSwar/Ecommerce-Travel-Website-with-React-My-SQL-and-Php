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

    // Check if `notification_id` and `status` are provided
    if (isset($data['notification_id']) && isset($data['noti_status'])) {
        $notification_id = intval($data['notification_id']); // Sanitize input
        $noti_status = htmlspecialchars($data['noti_status']); // Sanitize input

        // Update the notification status
        $stmt = $conn->prepare("
            UPDATE notifications 
            SET noti_status = :noti_status 
            WHERE notification_id = :notification_id
        ");
        $stmt->bindParam(':notification_id', $notification_id, PDO::PARAM_INT);
        $stmt->bindParam(':noti_status', $noti_status, PDO::PARAM_STR);
        $stmt->execute();

        // Check if the update was successful
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'status' => 1,
                'message' => 'Notification updated successfully.',
            ]);
        } else {
            echo json_encode([
                'status' => 0,
                'message' => 'Failed to update notification. It may not exist or is already updated.',
            ]);
        }
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'Invalid input: notification_id or status is missing.',
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
