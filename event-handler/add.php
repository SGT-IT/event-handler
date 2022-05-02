<?php
    include_once('config.php');

    $event = $_POST["event"];
    $address = $_POST["address"];
    $md = $_POST["md"];
    $wd = $_POST["wd"];
    $ymd = $_POST["ymd"];
    $ywd = $_POST["ywd"];

    $s_md = $_POST["s_md"];
    $s_wd = $_POST["s_wd"];
    $s_ymd = $_POST["s_ymd"];
    $s_ywd = $_POST["s_ywd"];

    $ref_id = $_POST["ref_id"];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, "utf8");
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $usesql = "INSERT INTO oth_event_recorder (oth_event, oth_address, oth_md, oth_wd, oth_ymd, oth_ywd, oth_s_md, oth_s_wd, oth_s_ymd, oth_s_ywd) 
    VALUES ('".$event."', '".$address."', '".$md."', '".$wd."', '".$ymd."', '".$ywd."', '".$s_md."', '".$s_wd."', '".$s_ymd."', '".$s_ywd."')";

    $checkPass = false;
    if ($conn->query($usesql) === TRUE) {
        $checkPass = true;
    }

    $sqlSelect = "SELECT * FROM oth_event_recorder WHERE oth_event='" . $event . "' AND oth_address='" . $address . "' 
    AND oth_md='" . $md . "' 
    AND oth_wd='" . $wd . "' 
    AND oth_ymd='" . $ymd . "' 
    AND oth_ywd='" . $ywd . "' 
    AND oth_s_md='" . $s_md . "' 
    AND oth_s_wd='" . $s_wd . "' 
    AND oth_s_ymd='" . $s_ymd . "' 
    AND oth_s_ywd='" . $s_ywd . "' ORDER BY oth_id DESC LIMIT 1";
    $resultSelect = $conn->query($sqlSelect);

    if ($resultSelect->num_rows > 0 && $checkPass) {
        $row = $resultSelect->fetch_assoc();

        if ($ref_id != '-') {
            $usesqlUpdate = "UPDATE oth_event_recorder SET 
            oth_address='".$address."-".$row["oth_id"]."'
            WHERE oth_id='".$ref_id."'";
            $conn->query($usesqlUpdate);
        }

        $response["error_code"] = 200;
        $response["error_msg"] = "success";
        $response["results"] = $row["oth_id"];
    } else {
        $response["error_code"] = 500;
        $response["error_msg"] = "fail";
        $response["message"] = $conn->error;
    }

    $conn->close();
    echo json_encode($response);
?>