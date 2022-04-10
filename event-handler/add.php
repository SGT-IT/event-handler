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

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, "utf8");
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM oth_event_recorder WHERE oth_event='" . $event . "' AND oth_address='" . $address . "'";
    $result = $conn->query($sql);
    $usesql = "";

    if ($result->num_rows <= 0) {
        $usesql = "INSERT INTO oth_event_recorder (oth_event, oth_address, oth_md, oth_wd, oth_ymd, oth_ywd, oth_s_md, oth_s_wd, oth_s_ymd, oth_s_ywd) 
        VALUES ('".$event."', '".$address."', '".$md."', '".$wd."', '".$ymd."', '".$ywd."', '".$s_md."', '".$s_wd."', '".$s_ymd."', '".$s_ywd."')";;
    } else {
        $usesql = "UPDATE oth_event_recorder SET 
            oth_md=oth_md + ".$md.",
            oth_wd=oth_wd + ".$wd.",
            oth_ymd=oth_ymd + ".$ymd.",
            oth_ywd=oth_ywd + ".$ywd.",
            oth_s_md=oth_s_md + ".$s_md.",
            oth_s_wd=oth_s_wd + ".$s_wd.",
            oth_s_ymd=oth_s_ymd + ".$s_ymd.",
            oth_s_ywd=oth_s_ywd + ".$s_ywd." 
        WHERE oth_event='".$event."' AND oth_address='".$address."'";
    }

    if ($conn->query($usesql) === TRUE) {
        $response["error_code"] = 200;
        $response["error_msg"] = "success";
        $response["results"] = $row["other_int"];
    } else {
        $response["error_code"] = 500;
        $response["error_msg"] = "fail";
        $response["message"] = $conn->error;
    }

    $conn->close();
    echo json_encode($response);
?>