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
            if (isset($headers['Package_Id'])) {
                $package_id = $headers['Package_Id'];

                // Connection to database
                $conn = $db->connect();
                $getBookingInfo = "SELECT 
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
                                    payment ON booking.payment_method = package.payment_id
                                JOIN 
                                    add_on ON booking.add_on= add_on.add_on_id
                                JOIN 
                                    discount ON booking.discount = discount.discount_id
                                WHERE 
                                    destination = :destination_id";
                $stmt = $conn->prepare($getAllPackages);
                $stmt->bindParam(':destination_id', $getBookingInfo, PDO::PARAM_INT);
                $stmt->execute();

                $packages = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packages) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packages];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found.", "destination" => $destination_id];
                }
            } else if (isset($headers['Region'])) {

                // Connection to database
                $conn = $db->connect();
                $getRegionInfo = "SELECT * from region";
                $stmt = $conn->prepare($getRegionInfo);
                $stmt->execute();

                $region = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($region) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $region];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Payment'])) {

                // Connection to database
                $conn = $db->connect();
                $getPaymentInfo = "SELECT * from payment";
                $stmt = $conn->prepare($getPaymentInfo);
                $stmt->execute();

                $payment = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($payment) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $payment];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Add_on'])) {
                // Connection to database
                $conn = $db->connect();
                $getAddOnInfo = "SELECT * from add_on";
                $stmt = $conn->prepare($getAddOnInfo);
                $stmt->execute();

                $add_on = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($add_on) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $add_on];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Discount'])) {

                // Connection to database
                $conn = $db->connect();
                $getDiscountInfo = "SELECT * from discount";
                $stmt = $conn->prepare($getDiscountInfo);
                $stmt->execute();

                $discount = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($discount) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $discount];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Package-Id'])) {
                $package_id = (int) $headers['Package-Id'];

                $conn = $db->connect();
                $getPackageDetails = "
                SELECT 
                    package.*, 
                    destination.destination_name, 
                    destination.country, 
                    destination.region, 
                    destination.accommodation, 
                    destination.accommodation_image,
                    tourguide.guide_name,
                    tourguide.language,
                    tourguide.exp_years,
                    tourguide.guide_image,
                    tourguide.description
                FROM 
                    package
                JOIN 
                    destination ON package.destination = destination.destination_id
                JOIN 
                    tourguideassignment ON package.package_id = tourguideassignment.package_id
                JOIN 
                    tourguide ON tourguideassignment.guide_id = tourguide.guide_id
                WHERE 
                    package.package_id = :package_id;

            ";
                $stmt = $conn->prepare($getPackageDetails);
                $stmt->bindParam(':package_id', $package_id, PDO::PARAM_INT);
                $stmt->execute();

                $packageDetail = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($packageDetail) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $packageDetail];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found.", "package_id" => $packageDetail];
                }
            } else if (isset($headers['User_Id'])) {
                $user_id = (int) $headers['User_Id'];

                // Connection to database
                $conn = $db->connect();
                $getBookedData = "SELECT 
                                    booking.*,
                                    package.*,
                                    destination.*,
                                    add_on.*
                                    from booking 
                                    JOIN 
                                        package ON package.package_id = booking.package
                                    JOIN 
                                        destination ON destination.destination_id = package.destination
                                    JOIN 
                                        add_on ON add_on.add_on_id = booking.add_on
                                    where booking.user = :user_id";
                $stmt = $conn->prepare($getBookedData);
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();

                $bookingData = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($bookingData) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $bookingData];
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
}
