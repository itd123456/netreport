<?php

	require('database.php');

	$database = new Database();

	$sql = "SELECT *
			FROM status";

	$database->fetchAll($sql, 'status');
?>