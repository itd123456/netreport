<?php

	require('database.php');

	$database = new Database();

	$status = $_POST['status'];
	$branch = $_POST['branch'];
	$provider = $_POST['provider'];
	$ticket = $_POST['ticket'];
	$remarks = $_POST['remarks'];
	$started = $_POST['date'].' '.$_POST['time'];
	$id = $_POST['id'];

	$sql = "UPDATE downtime_record
			SET status = '$status', branch = $branch, provider = '$provider', ticket = '$ticket', remarks = '$remarks', started = '$started'
			WHERE id = $id";
	//print_r($sql);
	$database->execQuery($sql);

?>