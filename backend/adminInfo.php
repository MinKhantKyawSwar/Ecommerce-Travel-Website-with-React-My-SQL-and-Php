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
             if (isset($headers['User_Id'])) {
                $user_id = (int) $headers['User_Id'];

                // Connection to database
                $conn = $db->connect();
                $getAdminData = "SELECT * from users where user_id = :user_id";
                $stmt = $conn->prepare($getAdminData);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();

                $adminData = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($adminData) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $adminData];
                } else {
                    $response = ['status' => 0, 'message' => "No data found."];
                }
            } else {
                $response = ['status' => 0, 'message' => "Header missing."];
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;

    case "POST":
        try {
            // Decode the JSON data
            $data = json_decode($eData);

            // Validate required fields
            if (
                empty($data->user_id) || empty($data->package) || empty($data->booking_date) ||
                empty($data->city) || empty($data->country) || empty($data->region) ||
                empty($data->payment_method) || empty($data->number_of_people) ||
                empty($data->add_on) || empty($data->discount) || empty($data->total_price)
            ) {
                throw new Exception("All fields are required.");
            }

            // Assign variables
            $user = $data->user_id;
            $package = $data->package;
            $booking_date = $data->booking_date;
            $city = $data->city;
            $country = $data->country;
            $region = $data->region;
            $payment_method = $data->payment_method;
            $number_of_people = $data->number_of_people;
            $add_on = $data->add_on;
            $discount = $data->discount;
            $total_price = $data->total_price;

            // Connection to database
            $conn = $db->connect();

            // Adding data into database
            $sql = "INSERT INTO booking(user, package, booking_date, city, country, region, payment_method, number_of_people, add_on, discount, total_price) VALUES 
                (:user, :package, :booking_date, :city, :country, :region, :payment_method, :number_of_people, :add_on, :discount, :total_price)";

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':user', $user);
            $stmt->bindParam(':package', $package);
            $stmt->bindParam(':booking_date', $booking_date);
            $stmt->bindParam(':city', $city);
            $stmt->bindParam(':country', $country);
            $stmt->bindParam(':region', $region);
            $stmt->bindParam(':payment_method', $payment_method);
            $stmt->bindParam(':number_of_people', $number_of_people);
            $stmt->bindParam(':add_on', $add_on);
            $stmt->bindParam(':discount', $discount);
            $stmt->bindParam(':total_price', $total_price);

            // Execute the statement
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => "Successfully Booked!"];
            } else {
                $response = ['status' => 0, 'message' => "Failed to create booking! Please try again."];
            }
        } catch (Exception $e) {
            // Catch general exceptions
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        } catch (PDOException $e) {
            // Catch database-related exceptions
            $response = ['status' => 0, 'message' => "Database Error: " . $e->getMessage()];
        }

        // Return the response as JSON
        echo json_encode($response);
        break;
        default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
