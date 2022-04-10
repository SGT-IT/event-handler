<?php
    include_once('config.php');

    $event = $_POST["event"];

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, "utf8");
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM oth_event WHERE oth_event_shortname='" . $event . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $event_name = $row["oth_event_name"];
            $event_caption = $row["oth_event_caption"];
            $event_youtube = $row["oth_event_youtube"];
            $event_isCountNew = $row["oth_is_count_new"];
            $event_init = $row["oth_event_init"];
            $event_start = $row["oth_event_start"];
            $event_end = $row["oth_event_end"];
        }

        $response["error_code"] = 200;
        $response["error_msg"] = "success";
        $response["event_name"] = $event_name;
        $response["event_caption"] = $event_caption;
        $response["event_youtube"] = $event_youtube;
        $response["event_isNew"] = $event_isCountNew;
        $response["event_init"] = $event_init;
        $response["event_start"] = $event_start;
        $response["event_end"] = $event_end;
    } else {
        $response["error_code"] = 500;
        $response["error_msg"] = "fail";
        $response["message"] = $conn->error;
    }

    $conn->close();
    echo json_encode($response);
?>