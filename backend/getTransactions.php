<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require './PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/PHPMailer-master/src/SMTP.php';
require './PHPMailer-master/PHPMailer-master/src/Exception.php';

include 'dbconnect.php';
$db = new dbconnect;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$eData = file_get_contents('php://input');

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        try {
            // Retrieve all headers
            $headers = getallheaders();
            if (isset($headers['Recipt'])) {
                $booking_id = $headers['Recipt'];
                $conn = $db->connect();
                $getTransactionInfo = "SELECT
                                            booking.*,
                                            users.*,
                                            package.*,
                                            package_info.price as unit_price,
                                            location.*,
                                            region.*,
                                            payment.*,
                                            add_on.price as add_ons,
                                            booking.total_price as final_price,
                                            GROUP_CONCAT(passport_info.full_name) AS full_names,
                                            GROUP_CONCAT(passport_info.passport_number) AS passport_numbers
                                        FROM 
                                            booking
                                        JOIN
                                            users ON users.user_id = booking.user
                                        JOIN 
                                            package ON package.package_id = booking.package
                                        JOIN 
                                            location ON location.location_id = booking.source_location
                                        JOIN 
                                            region ON region.region_id = location.region
                                        JOIN 
                                            payment ON booking.payment_method = payment.payment_id
                                        JOIN 
                                            package_info ON package_info.package = package.package_id
                                        JOIN 
                                            add_on ON booking.add_on = add_on.add_on_id
                                        JOIN 
                                            passport_info ON booking.booking_id = passport_info.booking_id
                                    where 
                                        booking.booking_id = :booking_id;";
                $stmt = $conn->prepare($getTransactionInfo);
                $stmt->bindParam(':booking_id', $booking_id);

                $stmt->execute();

                $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($transactions) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $transactions];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['User'])) {
                $user = $headers['User'];
                $conn = $db->connect();
                $getTransactionInfo = "SELECT 
                                            booking.*,
                                            users.*,
                                            package.*,
                                            location.*,
                                            region.*
                                        FROM 
                                            booking
                                        JOIN
                                            users ON users.user_id = booking.user
                                        JOIN 
                                            package ON package.package_id = booking.package
                                        JOIN 
                                            location ON location.location_id = booking.source_location
                                        JOIN 
                                            region ON region.region_id = location.region
                                        WHERE 
                                            booking.user = :user
                                        ORDER BY 
                                            booking.booking_id DESC
                                        LIMIT 1;";
                $stmt = $conn->prepare($getTransactionInfo);
                $stmt->bindParam(':user', $user);

                $stmt->execute();

                $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($user) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $user];
                } else {
                    $response = ['status' => 0, 'message' => "No Transactions found.", 'data' => $user];
                }
            } else {
                // Connection to database
                $conn = $db->connect();
                $getTransactionInfo = "SELECT 
                                    booking.*, 
                                    users.*,
                                    region.*,
                                    location.*,
                                    package.*,
                                    payment.*,
                                    add_on.*,
                                    discount.*
                                FROM 
                                    booking
                                JOIN 
                                    users ON booking.user = users.user_id
                                JOIN 
                                    package ON booking.package = package.package_id
                                JOIN 
                                    location ON location.location_id = booking.source_location
                                JOIN 
                                    region ON location.region = region.region_id
                                JOIN 
                                    payment ON booking.payment_method = payment.payment_id
                                JOIN 
                                    add_on ON booking.add_on = add_on.add_on_id
                                JOIN 
                                    discount ON booking.discount = discount.discount_id
                                ORDER BY 
                                        booking.booking_id DESC;";
                $stmt = $conn->prepare($getTransactionInfo);
                $stmt->execute();

                $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($transactions) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $transactions];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
        case "POST":
            try {
                // Parse incoming JSON data
                $data = json_decode(file_get_contents('php://input'), true);
        
                // Validate input data
                if (isset($data['booking_status'], $data['booking_id'], $data['user_id'], $data['email'])) {
                    $booking_status = $data['booking_status'];
                    $booking_id = $data['booking_id'];
                    $user_id = $data['user_id'];
                    $email = $data['email'];
        
                    // Database connection
                    $conn = $db->connect();
        
                    // Update booking status
                    $updateTransactionInfo = "UPDATE booking SET booking_status = :booking_status WHERE booking_id = :booking_id";
                    $stmt = $conn->prepare($updateTransactionInfo);
                    $stmt->bindParam(":booking_status", $booking_status, PDO::PARAM_STR);
                    $stmt->bindParam(":booking_id", $booking_id, PDO::PARAM_STR);
        
                    if ($stmt->execute()) {
                        // Prepare notification message based on booking status
                        $message = ($booking_status === "approved")
                            ? "Admin has approved your booking! Thank you for choosing to travel with us!"
                            : "Admin has denied your booking. There is something wrong with your payment! Please rebook and check if you sent the correct payment amount to us.";
        
                        $noti_status = "unread";
                        $created_at = date("Y-m-d H:i:s");
        
                        // Insert notification
                        $updateNotification = "INSERT INTO notifications (user, message, noti_status, created_at, updated_at) 
                                               VALUES (:user, :message, :noti_status, :created_at, :updated_at)";
                        $updatestmt = $conn->prepare($updateNotification);
                        $updatestmt->bindParam(":user", $user_id, PDO::PARAM_INT);
                        $updatestmt->bindParam(":message", $message, PDO::PARAM_STR);
                        $updatestmt->bindParam(":noti_status", $noti_status, PDO::PARAM_STR);
                        $updatestmt->bindParam(":created_at", $created_at, PDO::PARAM_STR);
                        $updatestmt->bindParam(":updated_at", $created_at, PDO::PARAM_STR);
        
                        if ($updatestmt->execute()) {
                            $getBookingData = "SELECT 
                                booking.*, 
                                users.*, 
                                package.*, 
                                location.*, 
                                region.* 
                            FROM 
                                booking 
                            JOIN 
                                users ON users.user_id = booking.user 
                            JOIN 
                                package ON package.package_id = booking.package 
                            JOIN 
                                location ON location.location_id = booking.source_location 
                            JOIN 
                                region ON region.region_id = location.region 
                            WHERE 
                                booking.booking_id = :booking_id";
                            $stmt2 = $conn->prepare($getBookingData);
                            $stmt2->bindParam(':booking_id', $booking_id);
                            $stmt2->execute();
                            $bookingData = $stmt2->fetch(PDO::FETCH_ASSOC);
        
                            if ($bookingData) {
                                $subject = "Booking Status";
                                $message = ($booking_status === "approved")
                                    ? "<h2>Dear customer,</h2>
                                        <p>Your booking is successfully approved by the admin!</p>
                                        <h3>Booking Details:</h3>
                                        <p><strong>Booking ID:</strong> {$bookingData['booking_id']}</p>
                                        <p><strong>Package:</strong> {$bookingData['package_name']}</p>
                                        <p><strong>Location:</strong> {$bookingData['city']},{$bookingData['country']}</p>
                                        <p><strong>Total Travellers:</strong> {$bookingData['number_of_people']}</p>
                                        <p><strong>Total Price:</strong> {$bookingData['total_price']}</p>
                                        <p><strong>Status:</strong> Approved</p>
                                        <p>Thank you for using Trailblazers.</p>"
                                    : "<h2>Dear customer,</h2>
                                        <p>We are sorry to inform you that your booking is denied by the admin! There is something wrong with your payment! Please rebook and check if you sent the correct payment amount to us.</p>
                                        <p>Thank you for using Trailblazers.</p>";
        
                                // Send the email
                                $mail = new PHPMailer(true);
                                try {
                                    $mail->isSMTP();
                                    $mail->Host = 'smtp.gmail.com';
                                    $mail->SMTPAuth = true;
                                    $mail->Username = 'frostattwitter@gmail.com';
                                    $mail->Password = 'hbbm vkxw dbjv ruiy'; 
                                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                                    $mail->Port = 587;
        
                                    $mail->setFrom('frostattwitter@gmail.com', 'Trailblazers');
                                    $mail->addAddress($email);
        
                                    $mail->isHTML(true);
                                    $mail->Subject = $subject;
                                    $mail->Body = $message;
        
                                    if ($mail->send()) {
                                        // Success response
                                        echo json_encode(['status' => 1, 'message' => 'Booking status updated successfully, mail sent, and notification added.']);
                                    } else {
                                        // Email failed to send
                                        echo json_encode(['status' => 0, 'message' => 'Failed to send email.']);
                                    }
                                } catch (Exception $e) {
                                    error_log('Mailer Error: ' . $mail->ErrorInfo);
                                    echo json_encode(['status' => 0, 'message' => 'Failed to send email.']);
                                }
                            } else {
                                throw new Exception("Failed to fetch booking data.");
                            }
                        } else {
                            throw new Exception("Failed to add notification.");
                        }
                    } else {
                        throw new Exception("Failed to update booking status.");
                    }
                } else {
                    // Invalid input response
                    echo json_encode([
                        'status' => 0,
                        'message' => 'Invalid input. Required fields are missing (booking_status, booking_id, user_id).'
                    ]);
                }
            } catch (PDOException $e) {
                // Database error response
                echo json_encode([
                    'status' => 0,
                    'message' => "Database error: " . $e->getMessage()
                ]);
            } catch (Exception $e) {
                // General error response
                echo json_encode([
                    'status' => 0,
                    'message' => "Error: " . $e->getMessage()
                ]);
            }
            break;
        



    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
