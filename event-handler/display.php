<?php
    include_once('config.php');

    $event = $_POST["event"];
    $address = $_POST["address"];
    $md = 0;
    $wd = 0;
    $ymd = 0;
    $ywd = 0;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, "utf8");
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $addressPieces = explode(",", $address);
    $addressQuery = "'".implode("','", $addressPieces)."'";
    
    $sql = "SELECT * FROM oth_event_recorder WHERE oth_event='" . $event . "' AND oth_address IN (" . $addressQuery . ")";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $md = $row["oth_md"];
            $wd = $row["oth_wd"];
            $ymd = $row["oth_ymd"];
            $ywd = $row["oth_ywd"];

            $s_md = $row["oth_s_md"];
            $s_wd = $row["oth_s_wd"];
            $s_ymd = $row["oth_s_ymd"];
            $s_ywd = $row["oth_s_ywd"];
        }

        $response["error_code"] = 200;
        $response["error_msg"] = "success";
        $response["md"] = $md;
        $response["wd"] = $wd;
        $response["ymd"] = $ymd;
        $response["ywd"] = $ywd;

        $response["s_md"] = $s_md;
        $response["s_wd"] = $s_wd;
        $response["s_ymd"] = $s_ymd;
        $response["s_ywd"] = $s_ywd;
    } else {
        $response["error_code"] = 500;
        $response["error_msg"] = "fail";
        $response["message"] = $conn->error;
    }

    $conn->close();
    echo json_encode($response);
?>