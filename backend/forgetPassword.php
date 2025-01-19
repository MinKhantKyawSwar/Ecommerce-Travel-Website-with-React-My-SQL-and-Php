<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require './PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/PHPMailer-master/src/SMTP.php';
require './PHPMailer-master/PHPMailer-master/src/Exception.php';

include 'dbConnect.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
    $db = new dbConnect();
    $conn = $db->connect();

    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['action'])) {
        echo json_encode(['status' => 0, 'message' => 'Action is required!']);
        exit;
    }

    switch ($data['action']) {
        case 'forgotPassword':
            if (empty($data['email'])) {
                echo json_encode(['status' => 0, 'message' => 'Email is required.']);
                exit;
            }
        
            $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
            if (!$email) {
                echo json_encode(['status' => 0, 'message' => 'Invalid email format.']);
                exit;
            }
        
            $sql = "SELECT user_id, email FROM users WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
        
            if ($stmt->rowCount() === 0) {
                echo json_encode(['status' => 0, 'message' => 'Email not found!']);
                exit;
            }
        
            $resetCode = rand(100000, 999999);
        
            $updateStmt = $conn->prepare("UPDATE users SET reset_password_code = :reset_password_code WHERE email = :email");
            $updateStmt->bindParam(':reset_password_code', $resetCode);
            $updateStmt->bindParam(':email', $email);
            $updateStmt->execute();
        
            $subject = "Password Reset Request";
            $message = "<p>Dear customer,</p>
                        <p>We received a request to reset your password. Please use the following code:</p>
                        <p><strong>$resetCode</strong></p>
                        <p>If you did not request a password reset, please ignore this email.</p>
                        <p>Thank you for using Trailblazers.</p>";
        
            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'frostattwitter@gmail.com';
                $mail->Password = 'hbbm vkxw dbjv ruiy'; // Use environment variable for security
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;
        
                $mail->setFrom('frostattwitter@gmail.com', 'Trailblazers');
                $mail->addAddress($email);
        
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body = $message;
        
                $status = $mail->send();
        
                if ($status) {
                    echo json_encode(['status' => 1, 'message' => 'Reset code sent to email!']);
                } else {
                    echo json_encode(['status' => 0, 'message' => 'Failed to send email.']);
                }
            } catch (Exception $e) {
                error_log('Mailer Error: ' . $mail->ErrorInfo);
                echo json_encode(['status' => 0, 'message' => 'Failed to send email.']);
            }
            break;
        


        case 'resetPassword':
            if (empty($data)) {
                echo json_encode(['status' => 0, 'message' => 'No input data received.']);
                exit;
            }

            if (empty($data['email']) || empty($data['newPassword']) || empty($data['resetCode'])) {
                echo json_encode(['status' => 0, 'message' => 'Email, new password, and reset code are required.']);
                exit;
            }

            $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
            $newPassword = $data['newPassword'];
            $resetCode = $data['resetCode'];

            if (!$email || !ctype_digit($resetCode) || strlen($resetCode) !== 6) {
                echo json_encode(['status' => 0, 'message' => 'Invalid email or reset code format.']);
                exit;
            }

            $stmt = $conn->prepare("SELECT user_id FROM users WHERE email = :email AND reset_password_code = :reset_password_code");
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':reset_password_code', $resetCode);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                echo json_encode(['status' => 0, 'message' => 'Invalid reset code or email.']);
                exit;
            }

            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            $updateStmt = $conn->prepare("UPDATE users SET password = :password, reset_password_code = NULL WHERE email = :email");
            $updateStmt->bindParam(':password', $hashedPassword);
            $updateStmt->bindParam(':email', $email);

            if ($updateStmt->execute()) {
                echo json_encode(['status' => 1, 'message' => 'Password reset successfully!']);
            } else {
                echo json_encode(['status' => 0, 'message' => 'Failed to reset password.']);
            }
            break;

        default:
            echo json_encode(['status' => 0, 'message' => 'Invalid action!']);
    }
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(['status' => 0, 'message' => 'Database error occurred.']);
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    echo json_encode(['status' => 0, 'message' => 'An error occurred.']);
}
