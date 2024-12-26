<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");

include 'dbconnect.php';
$db = new dbconnect;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        try {
            // Read POST data
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data || !is_array($data)) {
                echo json_encode(['status' => 0, 'message' => 'Invalid input data']);
                exit;
            }

            // Connect to the database
            $conn = $db->connect();

            foreach ($data as $entry) {
                $country = $entry['country'] ?? null;
                $city = $entry['city'] ?? null;
                $region = $entry['region'] ?? null;
                $price = $entry['price'] ?? null;
                $travel_date = $entry['travel_date'] ?? null;
                $number_of_available_people = $entry['number_of_available_people'] ?? null;
                $package = $entry['package'] ?? null;

                if (!$country || !$city || !$region || !$price || !$travel_date || !$number_of_available_people || !$package) {
                    echo json_encode(['status' => 0, 'message' => 'Missing required fields in one or more entries']);
                    exit;
                }

                // Check if the location already exists
                $checkExistLocationSql = "SELECT `location_id` FROM `location` WHERE `city` = :city AND `country` = :country AND `region` = :region";
                $stmt = $conn->prepare($checkExistLocationSql);
                $stmt->bindParam(':city', $city);
                $stmt->bindParam(':country', $country);
                $stmt->bindParam(':region', $region);
                $stmt->execute();
                $location = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($location) {
                    // Location exists, use the existing location_id
                    $location_id = $location['location_id'];
                } else {
                    // Location does not exist, insert it into the database
                    $insertLocationSql = "INSERT INTO `location` (`city`, `country`, `region`) VALUES (:city, :country, :region)";
                    $stmt = $conn->prepare($insertLocationSql);
                    $stmt->bindParam(':city', $city);
                    $stmt->bindParam(':country', $country);
                    $stmt->bindParam(':region', $region);
                    $stmt->execute();
                    $location_id = $conn->lastInsertId();
                }

                // Prepare the SQL statement to insert new destination
                $sql = "INSERT INTO `package_info`(`source_location`, `price`, `travel_date`, `number_of_available_people`, `package`) 
                        VALUES (:location_id, :price, :travel_date, :number_of_available_people, :package)";
                $stmt = $conn->prepare($sql);

                // Bind the parameters to the prepared statement
                $stmt->bindParam(':location_id', $location_id, PDO::PARAM_INT);
                $stmt->bindParam(':price', $price);
                $stmt->bindParam(':travel_date', $travel_date);
                $stmt->bindParam(':number_of_available_people', $number_of_available_people, PDO::PARAM_INT);
                $stmt->bindParam(':package', $package);

                // Execute the statement
                $stmt->execute();
            }

            echo json_encode(['status' => 1, 'message' => 'All package details added successfully']);
        } catch (PDOException $e) {
            echo json_encode(['status' => 0, 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;
    case "GET":
        try {
            $headers = getallheaders();
            if (isset($headers['Package_Id'])) {
                $package_id = (int)$headers['Package_Id'];
                // connection to database
                $conn = $db->connect();

                // Query to fetch all destinations
                $getPackageDetailInfo = "SELECT 
                                            package_info.*,
                                            location.*, 
                                            package.* 
                                        FROM package_info 
                                        JOIN 
                                            location 
                                        ON 
                                            package_info.source_location = location.location_id 
                                        JOIN 
                                            package 
                                        ON 
                                            package_info.package = package.package_id 
                                        where 
                                            package_info.package = :package_id";
                $stmt = $conn->prepare($getPackageDetailInfo);
                $stmt->bindParam(':package_id', $package_id, PDO::PARAM_INT);
                $stmt->execute();
                $PackageDetailInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (!empty($PackageDetailInfo)) {
                    $response = [
                        'status' => 1,
                        'message' => "Data found",
                        'data' => $PackageDetailInfo
                    ];
                } else {
                    $response = [
                        'status' => 0,
                        'message' => "No destinations found"
                    ];
                }
            }
        } catch (PDOException $e) {
            $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
        }
        echo json_encode($response);
        break;
    case "DELETE":

        try {
            $headers = getallheaders();
            if (isset($headers['Package-Info-Id'])) {
                $package_info_id = (int)$headers['Package-Info-Id'];
                $conn = $db->connect();
                $deletePackage = "DELETE FROM package_info WHERE package_info_id= :package_info_id";
                $stmt = $conn->prepare($deletePackage);
                $stmt->bindParam(':package_info_id', $package_info_id, PDO::PARAM_INT);
                $status = $stmt->execute();

                if ($status) {
                    $response = ['status' => 1, 'message' => "Package Data Information is successfully deleted!"];
                } else {
                    $response = ['status' => 0, 'message' => "Failed to delete Package Data information!"];
                }
            } else {
                $response = ['status' => 0, 'message' => "Package Data information not found!"];
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
