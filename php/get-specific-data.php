<?php

	require('database.php');

	$database = new Database();

	$id = $_POST['id'];

	$sql = "SELECT status, branch, provider, ticket, remarks, DATE_FORMAT(started, '%H:%i') 		 AS ti_me, DATE_FORMAT(started, '%Y-%m-%d') AS da_te
			FROM downtime_record
			WHERE id = $id";

	$data = $database->fetchAll($sql, 'specific');

?>