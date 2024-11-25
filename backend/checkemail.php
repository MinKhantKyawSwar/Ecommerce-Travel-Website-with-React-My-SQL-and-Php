<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type");

    $conn = new mysqli("localhost", "ecommtest","1234","ser");
    if (mysqli_connect_error()){
        echo mysqli_connect_error();
        exit();
    }
    else{
        $eData = file_get_contents("php://input");
        $dData = json_decode($eData, true);

        $user = $dData['email'];

        if($email != ""){
            $sql = "SELECT * FROM email WHERE email='$email'";
            $res = mysqli_query($conn, $sql);
            if(mysqli_num_rows($res) !=0){
                $result = "Email is already Taken!";
            }
            else{
                $result = "";
            }
        }
        else {
            $result ="";
        }

        $conn -> close();
        $response[] = array("result" => $result);
        echo json_encode($responese);
    }
?>