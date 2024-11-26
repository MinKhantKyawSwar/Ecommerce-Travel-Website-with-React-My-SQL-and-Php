<?php

Class dbconnect{
    private $server = "localhost";
    private $port = 3306;
    private $user = "root";
    private $password = "";
    private $dbname="ecommtest";

    public function connect(){
        try {
            $conn = new PDO('mysql:host=' .$this->server. ';port='.$this->port .';dbname='.$this->dbname, $this -> user, $this-> password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Database Error: " . $e->getMessage();
        }
            }

}


?>