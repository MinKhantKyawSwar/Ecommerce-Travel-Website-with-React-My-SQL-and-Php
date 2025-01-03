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
            if (isset($headers['Recipt'])) {
                $booking_id = $headers['Recipt'];
                $conn = $db->connect();
                $getTransactionInfo = "SELECT 
                                            booking.*,
                                            users.*,
                                            package.*,
                                            location.*,
                                            region.*,
                                            payment.*,
                                            add_on.add_on as add_ons
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
                                            add_on ON booking.add_on = add_on.add_on_id
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
                                    region ON booking.region = region.region_id
                                JOIN 
                                    payment ON booking.payment_method = payment.payment_id
                                JOIN 
                                    add_on ON booking.add_on = add_on.add_on_id
                                JOIN 
                                    discount ON booking.discount = discount.discount_id;";
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
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
