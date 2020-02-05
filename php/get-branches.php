<?php

	require('database.php');

	$database = new Database();

	$sql = "SELECT *
			FROM branch";	

	$branches = $database->fetchAll($sql, 'nottime');

?>