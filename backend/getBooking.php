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
            if (isset($headers['Destination_Id'])) {
                $destination_Id = $headers['Destination_Id'];

                // Connection to database
                $conn = $db->connect();
                $getBookingInfo = "SELECT 
                                    booking.*, 
                                    users.*,
                                    location.*,
                                    region.*,
                                    package.*,
                                    package_info.*,
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
                                    location ON booking.source_location = location.location_id
                                JOIN 
                                    region ON location.region = region.region_id
                                JOIN 
                                    payment ON booking.payment_method = payment.payment_id
                                JOIN 
                                    add_on ON booking.add_on= add_on.add_on_id
                                JOIN 
                                    discount ON booking.discount = discount.discount_id
                                JOIN 
                                    package_info ON package_info.package = package.package_id
                                WHERE 
                                    destination = :destination_Id";
                $stmt = $conn->prepare($getBookingInfo);
                $stmt->bindParam(':destination_Id', $destination_Id, PDO::PARAM_INT);
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
            } else if (isset($headers['Location_info']) && isset($headers['Package_Id'])) {
                $travel_date = $headers['Location_info'];
                $package_id = $headers['Package_Id'];

                // Connection to database
                $conn = $db->connect();
                $getCityInfo = "SELECT * FROM location 
                                 JOIN package_info ON package_info.source_location = location.location_id  
                                 WHERE travel_date = :travel_date AND
                                        package_info.package = :package_id";
                $stmt = $conn->prepare($getCityInfo);
                $stmt->bindParam(':travel_date', $travel_date, PDO::PARAM_STR);
                $stmt->bindParam(':package_id', $package_id, PDO::PARAM_STR);
                $stmt->execute();

                $city = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($city) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $city];
                } else {
                    $response = ['status' => 0, 'message' => "No packages found."];
                }
            } else if (isset($headers['Availability']) && isset($headers['TravelDate'])) {

                $id = $headers['Availability'];
                $travel_date = $headers['TravelDate'];

                // Connection to database
                $conn = $db->connect();

                $getAvailabilityInfo = "SELECT * FROM package_info WHERE package = :id AND travel_date = :travel_date";
                $stmt = $conn->prepare($getAvailabilityInfo);

                // Bind parameters
                $stmt->bindParam(':id', $id, PDO::PARAM_INT); // Corrected to bind to :id
                $stmt->bindParam(':travel_date', $travel_date); // Use PDO::PARAM_STR for date

                // Execute the statement
                $stmt->execute();

                // Fetch all available people
                $available_people = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if ($available_people) {
                    $response = ['status' => 1, 'message' => "Data found", 'data' => $available_people];
                } else {
                    $response = ['status' => 0, 'message' => "No package found"];
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
                empty($data->user_id) || empty($data->package) || empty($data->city) ||
                empty($data->booking_date) || empty($data->travel_date) ||
                empty($data->payment_method) || empty($data->number_of_people) ||
                empty($data->add_on) || empty($data->discount) || empty($data->total_price)
            ) {
                throw new Exception("All fields are required.");
            }

            // Assign variables
            $user = $data->user_id;
            $package = (int) $data->package;
            $source_location = (int) $data->city;
            $booking_date = $data->booking_date;
            $travel_date = $data->travel_date;
            $formattedDate = (new DateTime($travel_date))->format('Y-m-d');
            $payment_method = $data->payment_method;
            $number_of_people = (int) $data->number_of_people;
            $add_on = $data->add_on;
            $discount = $data->discount;
            $total_price = $data->total_price;

            // Connection to database
            $conn = $db->connect();

            // Check availability
            $getAvailabilitySql = "SELECT number_of_available_people 
                                       FROM package_info 
                                       WHERE travel_date = :travel_date 
                                       AND source_location = :source_location 
                                       AND package = :package";
            $stmt = $conn->prepare($getAvailabilitySql);
            $stmt->bindParam(':travel_date', $formattedDate);
            $stmt->bindParam(':source_location', $source_location);
            $stmt->bindParam(':package', $package);
            $stmt->execute();

            $number_of_available_people_row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Check if data is found
            if (!$number_of_available_people_row) {
                throw new Exception("No availability data found for the specified package, date, and location.");
            }

            $number_of_available_people = (int) $number_of_available_people_row['number_of_available_people'];

            // Total people left after booking
            $total_people = $number_of_available_people - $number_of_people;

            if ($total_people < 0) {
                $response = ['status' => 0, 'message' => "Not enough availability. Only {$number_of_available_people} spots left."];
            } else {
                // Update availability
                $updateAvailabilitySql = "UPDATE package_info 
                                              SET number_of_available_people = :total_people 
                                              WHERE travel_date = :travel_date 
                                              AND source_location = :source_location 
                                              AND package = :package";
                $stmt = $conn->prepare($updateAvailabilitySql);
                $stmt->bindParam(':total_people', $total_people);
                $stmt->bindParam(':travel_date', $formattedDate);
                $stmt->bindParam(':source_location', $source_location);
                $stmt->bindParam(':package', $package);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Available People updated successfully'];
                } else {
                    throw new Exception("Failed to update available people.");
                }
                $booking_status = "pending";

                // Insert booking
                $sql = "INSERT INTO booking(user, package, source_location, booking_date, travel_date, payment_method, number_of_people, add_on, discount, total_price, booking_status) 
                            VALUES (:user, :package, :source_location, :booking_date, :travel_date, :payment_method, :number_of_people, :add_on, :discount, :total_price, :booking_status)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':user', $user);
                $stmt->bindParam(':package', $package);
                $stmt->bindParam(':source_location', $source_location);
                $stmt->bindParam(':booking_date', $booking_date);
                $stmt->bindParam(':travel_date', $formattedDate);
                $stmt->bindParam(':payment_method', $payment_method);
                $stmt->bindParam(':number_of_people', $number_of_people);
                $stmt->bindParam(':add_on', $add_on);
                $stmt->bindParam(':discount', $discount);
                $stmt->bindParam(':total_price', $total_price);
                $stmt->bindParam(':booking_status', $booking_status);
                if ($stmt->execute()) {
                    $booking_id = $conn->lastInsertId();

                    // Insert passport data
                    $sqlPassport = "INSERT INTO passport_info (booking_id, full_name, passport_number, expiration_date) 
                                    VALUES (:booking_id, :full_name, :passport_number, :expiration_date)";
                    $stmtPassport = $conn->prepare($sqlPassport);

                    foreach ($data->passports as $passport) {
                        $stmtPassport->bindParam(':booking_id', $booking_id);
                        $stmtPassport->bindParam(':full_name', $passport->fullName);
                        $stmtPassport->bindParam(':passport_number', $passport->passportNumber);
                        $stmtPassport->bindParam(':expiration_date', $passport->expirationDate);

                        if (!$stmtPassport->execute()) {
                            throw new Exception("Failed to insert passport information for {$passport->fullName}");
                        }
                    }

                    // Insert notification for successful payment and waiting admin approval
                    $message = "Payment is successful and your booking is waiting for admin approval";
                    $noti_status = "unread";
                    $created_at = date("Y-m-d H:i:s");

                    $updateNotification = "INSERT INTO notifications (user, message, noti_status, created_at, updated_at) 
                                           VALUES (:user, :message, :noti_status, :created_at, :updated_at)";
                    $updatestmt = $conn->prepare($updateNotification);
                    $updatestmt->bindParam(":user", $user, PDO::PARAM_INT);
                    $updatestmt->bindParam(":message", $message, PDO::PARAM_STR);
                    $updatestmt->bindParam(":noti_status", $noti_status, PDO::PARAM_STR);
                    $updatestmt->bindParam(":created_at", $created_at, PDO::PARAM_STR);
                    $updatestmt->bindParam(":updated_at", $created_at, PDO::PARAM_STR);

                    if ($updatestmt->execute()) {
                        $response = ['status' => 1, 'message' => "Successfully Booked! Notification added successfully!"];
                    } else {
                        throw new Exception("Failed to add notification. Booking was successful.");
                    }
                } else {
                    throw new Exception("Failed to create booking! Please try again.");
                }
            }
        } catch (Exception $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Database Error: " . $e->getMessage()];
        }

        // Return the response as JSON
        echo json_encode($response);
        break;
    default:
        echo json_encode(['status' => 0, 'message' => 'Invalid request method']);
        break;
}
