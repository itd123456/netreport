<?php

	require('database.php');

	$database = new Database();

	$sql = "SELECT *
			FROM provider";

	$database->fetchAll($sql, 'providers');

?>