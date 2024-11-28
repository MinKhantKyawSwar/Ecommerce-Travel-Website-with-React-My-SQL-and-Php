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
    switch($method){
        case "POST":
            try{
                $data = json_decode($eData);
                $username = $data->username;
                $email = $data->email;
                $role = $data->role;
                $phone = $data->phone;
                $password = $data->password;
                $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
                $country = $data->country;
                $city = $data->city;
                $Tour_Package = $data->Tour_Package;
                $profile_image = $data->profile_image;
                $Created_At = $data->Created_At;

                // connection to database
                $conn = $db->connect();

                //checking user name or email is already exists
                $checkUser = "SELECT * FROM customers WHERE username = :username OR email = :email";
                $stmt = $conn->prepare($checkUser);
                $stmt->bindParam(':username', $data->username);
                $stmt->bindParam(':email', $data->email);
                $stmt->execute();
                $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

                if($existingUser){
                    header("Status: 409");
                    // conflict (user already exist code = 6 (custom))
                    $response = ['status' => 6, 'message' => "User or email already exists"];
                }
                else{
                    // adding data into database
                    $sql = "INSERT INTO customers (username, role, email, phone, password, country, city, Tour_Package,profile_image, Created_At) VALUES (:username, :role, :email, :phone, :password, :country, :city, :Tour_Package, :profile_image, :Created_At)";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':username', $username);
                    $stmt->bindParam(':role', $role);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':phone', $phone);
                    $stmt->bindParam(':password', $hashedpassword);  
                    $stmt->bindParam(':country', $country);
                    $stmt->bindParam(':city', $city);
                    $stmt->bindParam(':Tour_Package', $Tour_Package);
                    $stmt->bindParam(':profile_image', $profile_image);
                    $stmt->bindParam(':Created_At', $Created_At);
                    $status = $stmt->execute();

                    if ($status) {
                        $response = ['status' => 1, 'message' => "Account Created Successfully!"];
                    } else {
                        $response= ['status' => 0, 'message' => "Failed to create account!"];
                    }
                }


            } catch (PDOException $e) {
                $response = ['status' => 0, 'message' => "Error: " . $e->getMessage()];
            }
            echo json_encode($response);
            break; 
    }
?>