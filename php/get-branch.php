<?php

	require('database.php');

	$database = new Database();

	$sql = "SELECT *
			FROM branch";

	$database->getBranch($sql);
?>