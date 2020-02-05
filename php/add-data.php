<?php

	require('database.php');

	$database = new Database();

	$ticket = $_POST['ticket'];
	$branch = $_POST['branch'];
	$provider = $_POST['provider'];
	$started = $_POST['started'];
	$status = $_POST['status'];
	$remarks = $_POST['remarks'];

	$sql = "INSERT INTO downtime_record(ticket, branch, provider, started, status, remarks)
			VALUES('$ticket', '$branch', '$provider', '$started', '$status', '$remarks')";

	$add_data = $database->execQuery($sql);

?>